from django.core.exceptions import PermissionDenied
from django.http import Http404
from django.http import HttpResponseForbidden
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from django.utils.translation import ugettext_lazy as _

from main.settings import SPECIALIST_CREATE_PERMISSION_DENIED, COMPANY_CREATE_PERMISSION_DENIED
from webapp.models import Company, Specialist, Rating, Employees
from django.db.models import Q


def user_profile_permission(function):
    def decorator(request, *args, **kwargs):
        user = request.user
        username = kwargs['slug']
        if user.username == username:
            return function(request, *args, **kwargs)
        else:
            return HttpResponseForbidden()

    return decorator


def specialist_owner(function):
    def decotator(request, *args, **kwargs):
        try:
            if Specialist.all_objects.get(slug=kwargs['master_slug'], user=request.user):
                return function(request, *args, **kwargs)
            else:
                raise PermissionDenied('Permission denied')
        except Specialist.DoesNotExist:
            raise Http404("Master not found")

    return decotator


def specialist_owner_company(function):
    def decotator(request, *args, **kwargs):
        try:
            if Specialist.all_objects.get(slug=kwargs['master_slug'], company__user__owner=True,
                                          company__user__user=request.user):
                return function(request, *args, **kwargs)
            else:
                raise PermissionDenied('Permission denied')
        except Specialist.DoesNotExist:
            raise Http404("Master not found")

    return decotator


def company_owner(function):
    def decorator(request, *args, **kwargs):
        try:
            owner = Company.all_objects.get(slug=kwargs['company_slug'], user__owner=True, user__user=request.user)
            if owner:
                return function(request, *args, **kwargs)
            else:
                raise PermissionDenied('Permission denied')
        except Company.DoesNotExist:
            raise Http404("Company not found")

    return decorator


def company_owners(function):
    def decorator(request, *args, **kwargs):
        try:
            if request.user.is_authenticated:
                owner_admin = Company.all_objects.get(
                    Q(slug=kwargs['company_slug'], user__administrator=True, user__user=request.user) |
                    Q(slug=kwargs['company_slug'], user__owner=True, user__user=request.user))
                if owner_admin:
                    return function(request, *args, **kwargs)
                else:
                    raise PermissionDenied('Permission denied')
            else:
                raise PermissionDenied('Permission denied')
        except Company.DoesNotExist:
            raise Http404("Company not found")

    return decorator


def user_review_count_check(function):
    def decorator(request, *args, **kwargs):
        try:

            if request.user.is_authenticated:

                if kwargs.get('master_slug'):

                    ratings = Rating.objects.filter(user=request.user,
                                                    specialist__slug=kwargs.get('master_slug')).count()
                    if ratings >= 1:
                        raise PermissionDenied('Permission Denied')
                    else:
                        return function(request, *args, **kwargs)

                elif kwargs.get('company_slug'):

                    ratings = Rating.objects.filter(user=request.user,
                                                    company__slug=kwargs.get('company_slug')).count()
                    if ratings >= 1:
                        raise PermissionDenied('Permission Denied')
                    else:
                        return function(request, *args, **kwargs)

            else:
                raise PermissionDenied('User is not authenticated')

        except Rating.DoesNotExist:
            raise Http404("You are not rated")

    return decorator


def user_specialist_create_check(function):
    def decorator(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/accounts/login/')
        specialist = Specialist.all_objects.filter(user=request.user).count()
        if specialist >= 1:
            raise PermissionDenied(SPECIALIST_CREATE_PERMISSION_DENIED)
        else:
            return function(request, *args, **kwargs)

    return decorator


def user_company_create_check(function):
    def decorator(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/accounts/login/')
        company = Company.objects.filter(user__user=request.user, user__owner=True).count()
        if company >= 1:
            raise PermissionDenied(COMPANY_CREATE_PERMISSION_DENIED)
        else:
            return function(request, *args, **kwargs)

    return decorator


def login_check(function):
    def decorator(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({
                "status": "error",
                "message": _("Чтобы забронировать, вам необходимо авторизоваться!")
            })
        else:
            return function(request, *args, **kwargs)

    return decorator


def login_check_favorite(function):
    def decorator(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({
                "status": "error",
                "message": _("Для того чтоб добавить в избраное, Вам необходимо авторизоваться!")
            })
        else:
            return function(request, *args, **kwargs)

    return decorator


def specialist_status_reservation(function):
    def decotator(request, *args, **kwargs):
        try:
            specialist = Specialist.all_objects.get(slug=kwargs['specialist__slug'])
            company = Company.objects.filter(company_specialists=specialist).last()
            try:
                owner = company.user.filter(owner=True).values_list('user', flat=True)
            except:
                pass
            try:
                administrator = company.user.filter(administrator=True).values_list('user', flat=True)
            except:
                pass
            if specialist.user == request.user or request.user.id in owner or request.user.id in administrator:
                return function(request, *args, **kwargs)
            else:
                raise PermissionDenied('Permission denied')
        except Specialist.DoesNotExist:
            raise Http404("Master not found")

    return decotator


def administrator(function):
    def decorator(request, *args, **kwargs):
        try:
            company = Company.all_objects.get(slug=kwargs['company_slug'])
            owner = company.user.filter(owner=True).last().user
            admin = company.user.filter(administrator=True).last().user
            if owner == request.user or admin == request.user:
                return function(request, *args, **kwargs)
            else:
                raise PermissionDenied('Permission denied')
        except Company.DoesNotExist:
            raise Http404("Company not found")

    return decorator


def rating_check_specialist(function):
    def decorator(request, *args, **kwargs):
        specialist = Specialist.objects.get(slug=kwargs['specialist__slug'])
        check_rating = specialist.rating_specialist.filter(user=request.user).exists()
        if check_rating:
            return JsonResponse({
                "status": "forbidden",
                "message": _("Вы уже добавляли отзыв")
            })
        else:
            return function(request, *args, **kwargs)

    return decorator


def rating_check_company(function):
    def decorator(request, *args, **kwargs):
        company = Company.objects.get(slug=kwargs['company__slug'])
        check_rating = company.rating_company.filter(user=request.user).exists()
        if check_rating:
            return JsonResponse({
                "status": "forbidden",
                "message": _("Вы уже добавляли отзыв")
            })
        else:
            return function(request, *args, **kwargs)

    return decorator
