from rest_framework.permissions import BasePermission

from webapp.models import Reservation


class IsReservationBelongsToSpecialist(BasePermission):

    def has_permission(self, request, view):
        try:
            reservation = Reservation.objects.get(pk=view.kwargs['pk'])
            return reservation.specialist.user == request.user
        except Reservation.DoesNotExist:
            return False
