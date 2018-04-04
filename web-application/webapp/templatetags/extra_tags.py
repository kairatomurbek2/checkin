from django import template
from django.db.models import Q
from django.http import Http404
from django.template import TemplateDoesNotExist
from django.utils import timezone

from webapp.models import Company, Specialist, ScheduleSetting

register = template.Library()

DAYS = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
]


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


@register.simple_tag()
def user_administrator(current_user):
    return Company.objects.filter(user__user=current_user, user__administrator=True)


@register.assignment_tag()
def check_rating_user_specialist(master, current_user):
    return master.rating_specialist.filter(user=current_user).exists()


@register.assignment_tag()
def admin_reservation(company_slug, slug, current_user):
    try:
        return Specialist.objects.get(company__slug=company_slug, slug=slug, company__user__administrator=True,
                                      company__user__user=current_user)
    except Specialist.DoesNotExist:
        raise Http404("Master not found")


@register.assignment_tag()
def check_rating_user_company(company, current_user):
    return company.rating_company.filter(user=current_user).exists()


@register.filter
def get_form_errors(errors_dict):
    output = []
    for field, errors in errors_dict.items():
        output.append('\n'.join('  * %s' % e for e in errors))
    return output


@register.assignment_tag
def get_admin_company(user):
    return user_administrator(user).first()


def reservation_time_belongs_to_company_wt(reservation, company_slug):
    reservation_dt = timezone.localtime(reservation.date_time_reservation)
    weekday = DAYS[reservation_dt.weekday()]
    schedule = ScheduleSetting.objects.filter(company__slug=company_slug, specialist=reservation.specialist).first()
    reservation_hour = reservation_dt.hour

    if schedule:
        weekday_obj = getattr(schedule, weekday)
        time = weekday_obj.time

        if time:
            parts = time.split('-')

            if len(parts) > 0:
                from_hour = int(parts[0].split(':')[0])
                to_hour = int(parts[1].split(':')[0])

                return from_hour <= reservation_hour <= to_hour

    return False


@register.filter
def filter_reservations_by_company_wt(reservations, company_slug):
    return filter(lambda i: reservation_time_belongs_to_company_wt(i, company_slug), reservations)


@register.filter
def user_can_edit_master_schedule(master, current_user):
    return master.status == 'AC' and (master.user == current_user or master.company.filter(Q(user__owner=True) | Q(user__administrator=True),
                                                                                           user__user=current_user))