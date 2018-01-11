import datetime
import threading
from smtplib import SMTPException
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import EmailMessage
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.template.loader import render_to_string
from django.urls import reverse
from django.views.generic import CreateView
from django.views.generic import ListView
from django.views.generic import TemplateView
from django.views.generic import UpdateView
from main.parameters import Messages
from webapp import forms
from webapp.forms import ContactFormSet, CertSpecialistFormSet
from webapp.models import Specialist, Invite, Rating, Reservation, FavoriteSpecialist, Company
from webapp.views.filters import SpecialistFilter, ReservationFilter


class MastersList(ListView):
    template_name = 'specialist/specialist_list.html'
    filterset_class = SpecialistFilter
    model = Specialist
    context_object_name = 'specialist_list'
    paginate_by = 24

    def get_queryset(self):
        if self.request.is_ajax():
            self.template_name = 'specialist/object.html'
        return Specialist.objects.all()

    def get_context_data(self, **kwargs):
        context = super(MastersList, self).get_context_data(**kwargs)
        specialist_list = self.filterset_class(self.request.GET, queryset=self.get_queryset())
        context['filter'] = specialist_list.form
        pagination = Paginator(specialist_list.qs, self.paginate_by)
        page = self.request.GET.get('page')
        try:
            specialist_list = pagination.page(page)
        except PageNotAnInteger:
            specialist_list = pagination.page(1)
        except EmptyPage:
            raise Http404("That page contains no results")
        if self.request.user.is_authenticated:
            context['fav_spec'] = FavoriteSpecialist.objects.filter(user=self.request.user).values_list('specialist',
                                                                                                        flat=True)
        context['specialist_list'] = specialist_list.object_list
        context['is_paginated'] = specialist_list.has_next()
        return context


class MasterCreateView(CreateView):
    success_message = Messages.AddMaster.adding_success
    error_message = Messages.AddMaster.adding_error
    template_name = 'specialist/new_specialist.html'
    model = Specialist
    form_class = forms.MasterCreateForm

    def get_context_data(self, **kwargs):
        context = super(MasterCreateView, self).get_context_data(**kwargs)
        context['form'] = self.form_class(initial={'full_name': self.request.user.get_full_name()})
        if self.request.POST:
            context['formset'] = ContactFormSet(self.request.POST)
        else:
            context['formset'] = ContactFormSet()

        return context

    def get_success_url(self):
        messages.add_message(self.request, messages.SUCCESS, self.success_message)
        return reverse('master_detail', args=(self.object.slug,))

    def form_valid(self, form):
        context = self.get_context_data()
        formset = context['formset']
        specialist = form.save(commit=False)
        specialist.user = self.request.user
        specialist.edited_at = datetime.datetime.now()
        specialist.edited_by = self.request.user
        specialist.save()
        if formset.is_valid():
            formset.instance = specialist
            formset.save()
        form.save_m2m()
        thread = threading.Thread(target=MasterCreateView.send_email_notification, args=(specialist,))
        thread.start()
        return super(MasterCreateView, self).form_valid(form)

    @staticmethod
    def send_email_notification(specialist):

        if specialist.specialist_contacts.first():
            phone = specialist.specialist_contacts.first().phone
        else:
            phone = ''

        context = {
            "name": specialist.full_name,
            "link": settings.DOMAIN_URL + '/admin/webapp/specialist/' + str(specialist.id) + '/change/',
            "created_at": specialist.created_at,
            "phone": phone,
            "email": specialist.user.email
        }

        def get_html_message():
            return render_to_string("email/success_specialist.html", context)

        message = get_html_message()
        mail = EmailMessage('Зарегистрирована новый специалист', message, to=[settings.EMAIL_HOST_USER])
        mail.content_subtype = 'html'
        mail.send()

    def form_invalid(self, form):
        messages.error(self.request, self.error_message)
        return super(MasterCreateView, self).form_invalid(form)


class MasterEditView(LoginRequiredMixin, UpdateView):
    success_message = Messages.AddMaster.update_success
    error_message = Messages.AddMaster.adding_error
    template_name = 'specialist/edit_specialist.html'
    form_class = forms.MasterCreateForm
    model = Specialist

    def get_object(self, queryset=None):
        return Specialist.all_objects.get(slug=self.kwargs['master_slug'])

    def get_context_data(self, **kwargs):
        context = super(MasterEditView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['formset'] = ContactFormSet(self.request.POST, instance=self.object)
            context['certificates'] = CertSpecialistFormSet(self.request.POST, self.request.FILES, instance=self.object)

        else:
            context['formset'] = ContactFormSet(instance=self.object)
            context['certificates'] = CertSpecialistFormSet(instance=self.object)

        return context

    def get_success_url(self):
        messages.add_message(self.request, messages.SUCCESS, self.success_message)
        return reverse('master_detail', args=(self.object.slug,))

    def form_valid(self, form):
        context = self.get_context_data()
        formset = context['formset']
        certificates = context['certificates']
        specialist = form.save(commit=False)
        specialist.edited_at = datetime.datetime.now()
        specialist.edited_by = self.request.user
        specialist.save()

        if formset.is_valid() and certificates.is_valid():
            formset.save()
            certificates.save()

        form.save_m2m()
        return super(MasterEditView, self).form_valid(form)

    def form_invalid(self, form):
        messages.error(self.request, self.error_message)
        return super(MasterEditView, self).form_invalid(form)


class MasterDetailView(TemplateView):
    template_name = 'specialist/master_detail.html'
    model = Specialist

    def get_context_data(self, **kwargs):
        context = super(MasterDetailView, self).get_context_data(**kwargs)
        master = get_object_or_404(self.model, slug=self.kwargs.get('master_slug'))
        company = Company.objects.filter(company_specialists=master).last()
        context['master'] = master
        context['form'] = forms.RatingForm
        try:
            context['owners'] = company.user.filter(owner=True).values_list('user', flat=True)
        except:
            pass
        try:
            context['administrator'] = company.user.filter(administrator=True).values_list('user', flat=True)
        except:
            pass
        return context


class SpecialistInviteAcceptView(LoginRequiredMixin, TemplateView):
    invite_specialist_have_accepted = Messages.AddMaster.invite_specialist_have_accepted
    invite_expired = Messages.AddMaster.invite_expired
    invite_successfully = Messages.AddMaster.invite_successfully
    template_name = 'specialist/specialist_invite_accept.html'

    def get(self, request, *args, **kwargs):
        try:
            invite = Invite.objects.get(code=request.GET.get('code'))
        except ObjectDoesNotExist:
            raise Http404
        if invite.invite_to != request.user:
            raise Http404
        if invite.accepted:
            invite_message = self.invite_specialist_have_accepted
        elif (datetime.datetime.now().date() - invite.invite_date).days > 10:
            invite_message = self.invite_expired
        else:
            specialist = Specialist.objects.filter(user=invite.invite_to).first()
            company = Company.objects.get(name=invite.invite_company)
            specialist.company.add(company)
            invite.accepted = True
            invite.save()
            invite_message = self.invite_successfully
        self.__send_email_to_admin(invite)
        context = self.get_context_data(**kwargs)
        context['invite_accept_text'] = invite_message
        return self.render_to_response(context)

    def __send_email_to_admin(self, invite):
        context = {
            'invite': invite
        }
        html_template = 'email/company_invite_accept_notification.html'
        plain_template = 'email/company_invite_accept_notification.txt'
        subject = 'Приглашение принято'
        html_content = render_to_string(html_template, context)
        plain_content = render_to_string(plain_template, context)
        try:
            invite.invite_from.email_user(
                subject=subject,
                message=plain_content,
                from_email=settings.EMAIL_HOST_USER,
                html_message=html_content
            )
        except SMTPException:
            pass


class CreateReviewForSpecialistView(LoginRequiredMixin, CreateView):
    success_message = Messages.AddReview.adding_success_specialist
    model = Rating
    form_class = forms.RatingForm
    template_name = 'specialist/specialist_review_form.html'

    def get_success_url(self):
        messages.add_message(self.request, messages.SUCCESS, self.success_message)
        return reverse('master_detail', args=(self.kwargs.get('master_slug'),))

    def form_valid(self, form):
        specialist = Specialist.objects.get(slug=self.kwargs.get('master_slug'))
        rating = form.save(commit=False)
        rating.user = self.request.user
        rating.specialist = specialist
        rating.save()
        return super(CreateReviewForSpecialistView, self).form_valid(form)


class ReviewSpecialistListView(ListView):
    template_name = 'specialist/all_review.html'
    model = Rating

    def get_context_data(self, **kwargs):
        context = super(ReviewSpecialistListView, self).get_context_data(**kwargs)
        context['master'] = get_object_or_404(Specialist, slug=self.kwargs.get('master_slug'))
        return context

    def get_queryset(self):
        queryset = Rating.objects.filter(specialist__slug=self.kwargs.get('master_slug'))
        return queryset


class ReservationTableListView(LoginRequiredMixin, ListView):
    model = Reservation
    template_name = 'specialist/reservation_list.html'
    filterset_class = ReservationFilter

    def get_context_data(self, **kwargs):
        context = super(ReservationTableListView, self).get_context_data(**kwargs)
        reservation_filter = self.filterset_class(self.request.GET, queryset=self._get_reservation_list())
        context['reservation_filter'] = reservation_filter
        return context

    def _get_reservation_list(self):
        return Reservation.objects.filter(specialist__slug=self.kwargs['master_slug']).order_by('-created_at')


class ReservationListView(LoginRequiredMixin, TemplateView):
    template_name = 'specialist/master_detail_reservition.html'
    model = Specialist

    def get_context_data(self, **kwargs):
        context = super(ReservationListView, self).get_context_data(**kwargs)
        master = get_object_or_404(self.model, slug=self.kwargs.get('master_slug'))
        company = Company.objects.filter(company_specialists=master).last()
        context['master'] = master
        try:
            context['owners'] = company.user.filter(owner=True).values_list('user', flat=True)
        except:
            pass
        try:
            context['administrator'] = company.user.filter(administrator=True).values_list('user', flat=True)
        except:
            pass
        return context
