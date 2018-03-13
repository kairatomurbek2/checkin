from rest_framework.permissions import BasePermission

from webapp.models import Reservation, Specialist


class IsReservationBelongsToSpecialist(BasePermission):
    def has_permission(self, request, view):
        if 'pk' not in view.kwargs:
            return False

        try:
            reservation = Reservation.objects.get(pk=view.kwargs['pk'])
            return reservation.specialist.user == request.user
        except Reservation.DoesNotExist:
            return False


class IsSpecialist(BasePermission):
    def has_permission(self, request, view):
        return Specialist.objects.filter(user=request.user).exists() if request.user.is_authenticated else False
