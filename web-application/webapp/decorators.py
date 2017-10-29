from django.core.exceptions import PermissionDenied
from django.http import Http404
from django.http import HttpResponseForbidden

from webapp.models import Company, Specialist, Rating


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
