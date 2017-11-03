from django.core.exceptions import PermissionDenied
from django.http import Http404
from django.http import HttpResponseForbidden
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from django.utils.translation import ugettext_lazy as _
from webapp.models import Company, Specialist, Rating, ScheduleSetting


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
            specialist = Specialist.all_objects.get(slug=kwargs['master_slug'])
            if specialist.user == request.user:
                return function(request, *args, **kwargs)
            else:
                raise PermissionDenied('Permission denied')
        except Specialist.DoesNotExist:
            raise Http404("Master not found")

    return decotator


def company_owner(function):
    def decotator(request, *args, **kwargs):
        try:
            company = Company.all_objects.get(slug=kwargs['company_slug'])
            if company.user == request.user:
                return function(request, *args, **kwargs)
            else:
                raise PermissionDenied('Permission denied')
        except Company.DoesNotExist:
            raise Http404("Company not found")

    return decotator


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


def schedule_setting_specialist(function):
    def decotator(request, *args, **kwargs):
        try:
            specialist = Specialist.all_objects.get(slug=kwargs['master_slug'])
            if specialist.user == request.user:
                schedule_setting = ScheduleSetting.objects.filter(specialist__slug=kwargs.get('master_slug')).count()
                if schedule_setting >= 1:
                    raise Http404("Page not found")
                return function(request, *args, **kwargs)
            else:
                raise PermissionDenied('Permission denied')
        except Specialist.DoesNotExist:
            raise Http404("Master not found")

    return decotator


def user_specialist_create_check(function):
    def decorator(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/accounts/login/')
        specialist = Specialist.objects.filter(user=request.user).count()
        if specialist >= 1:
            raise Http404("Page not found")
        else:
            return function(request, *args, **kwargs)

    return decorator


def user_company_create_check(function):
    def decorator(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/accounts/login/')
        company = Company.objects.filter(user=request.user).count()
        if company >= 1:
            raise Http404("Page not found")
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
