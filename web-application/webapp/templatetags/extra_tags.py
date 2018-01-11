from django import template
from django.template import TemplateDoesNotExist

from webapp.models import Employees, Company

register = template.Library()


@register.assignment_tag
def get_form_field(request, obj):
    try:
        return 'filters/%s.html' % obj.field.widget.attrs['template']
    except (TemplateDoesNotExist, KeyError):
        return ''


@register.simple_tag
def bootstrap_alert_class(tags):
    if tags == 'error':
        tags = 'danger'

    return tags


@register.inclusion_tag('partial/google_map.html')
def load_google_map_js():
    return {}


@register.simple_tag()
def multiply(count):
    return count * 20


@register.simple_tag()
def percent_converter(rating):
    return rating * 20


@register.simple_tag()
def user_company(current_user):
    return Company.objects.filter(user__user=current_user, user__owner=True)


@register.assignment_tag()
def check_rating_user_specialist(master, current_user):
    return master.rating_specialist.filter(user=current_user).exists()


@register.assignment_tag()
def check_rating_user_company(company, current_user):
    return company.rating_company.filter(user=current_user).exists()
