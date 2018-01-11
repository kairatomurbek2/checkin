from django.core.exceptions import PermissionDenied
from django.http import Http404
from django.http import HttpResponseForbidden
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from django.utils.translation import ugettext_lazy as _
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
    def decorator(request, *args, **kwargs):
        try:
            company = Company.all_objects.get(slug=kwargs['company_slug'])
            owner = company.user.filter(owner=True).last().user
            if owner == request.user:
                return function(request, *args, **kwargs)
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
        company = Company.objects.filter(user__user=request.user, user__owner=True).count()
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
        check_rating = company.rating_specialist.filter(user=request.user).exists()
        if check_rating:
            return JsonResponse({
                "status": "forbidden",
                "message": _("Вы уже добавляли отзыв")
            })
        else:
            return function(request, *args, **kwargs)

    return decorator
