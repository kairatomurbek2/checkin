from django.core.exceptions import PermissionDenied
from django.http import Http404
from django.http import HttpResponseForbidden

from webapp.models import Company, Specialist


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
            specialist = Specialist.objects.get(slug=kwargs['master_slug'])
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
            company = Company.objects.get(slug=kwargs['company_slug'])
            if company.user == request.user:
                return function(request, *args, **kwargs)
            else:
                raise PermissionDenied('Permission denied')
        except Company.DoesNotExist:
            raise Http404("Company not found")

    return decotator
