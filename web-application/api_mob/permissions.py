from rest_framework.permissions import BasePermission

from webapp.models import Reservation, Specialist, Company


class IsReservationBelongsToSpecialistOrCompany(BasePermission):
    def has_permission(self, request, view):
        if 'pk' not in view.kwargs:
            return False

        try:
            reservation = Reservation.objects.get(pk=view.kwargs['pk'])
            company = Company.objects.filter(user__user=request.user, user__administrator=True).first()

            if company:
                return company in reservation.specialist.company.all()

            return reservation.specialist.user == request.user
        except Reservation.DoesNotExist:
            return False


class IsSpecialist(BasePermission):
    def has_permission(self, request, view):
        return Specialist.objects.filter(user=request.user).exists() if request.user.is_authenticated else False


class IsAdminOfCompany(BasePermission):
    def has_permission(self, request, view):
        return Company.objects.filter(user__user=request.user, user__administrator=True).exists()


class IsSpecialistOrAdminOfCompany(BasePermission):
    def has_permission(self, request, view):
        is_spec_perm = IsSpecialist()
        is_admin = IsAdminOfCompany()

        return is_spec_perm.has_permission(request, view) or is_admin.has_permission(request, view)