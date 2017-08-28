from django import template
from django.template import TemplateDoesNotExist

register = template.Library()


@register.assignment_tag
def get_form_field(request, obj):
    try:
        return 'filters/%s.html' % obj.field.widget.attrs['template']
    except (TemplateDoesNotExist, KeyError):
        return ''


