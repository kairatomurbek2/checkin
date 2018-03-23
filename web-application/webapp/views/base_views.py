from django.contrib import messages
from django.views.generic import FormView

from main.parameters import Messages
from django.shortcuts import render

from main.settings import SPECIALIST_CREATE_PERMISSION_DENIED, COMPANY_CREATE_PERMISSION_DENIED


class BaseFormView(FormView):
    success_message = None
    error_message = Messages.form_error

    def form_valid(self, form):
        if self.success_message:
            messages.success(self.request, self.success_message)
        return super(BaseFormView, self).form_valid(form)

    def form_invalid(self, form):
        if self.error_message:
            messages.error(self.request, self.error_message)
        return super(BaseFormView, self).form_invalid(form)


def handle_404(request, exception):
    return render(request, '404.html', {}, status=404)


def handle_500(request):
    return render(request, '500.html', {}, status=500)


def handle_403(request, exception):
    reason = 'other'

    if str(exception) == SPECIALIST_CREATE_PERMISSION_DENIED:
        reason = SPECIALIST_CREATE_PERMISSION_DENIED
    elif str(exception) == COMPANY_CREATE_PERMISSION_DENIED:
        reason = COMPANY_CREATE_PERMISSION_DENIED

    return render(request, '403.html', {
        'reason': reason,
        'specialist_create_pd': SPECIALIST_CREATE_PERMISSION_DENIED,
        'company_create_pd': COMPANY_CREATE_PERMISSION_DENIED,
    }, status=403)