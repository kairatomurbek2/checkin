from rest_framework import permissions
from django.db.models import Q
from webapp.models import Specialist, Reservation


class MasterOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owner of an Producer to edit it.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            if 'specialist__slug' not in view.kwargs:
                return False

            specialist = Specialist.all_objects.filter(Q(slug=view.kwargs['specialist__slug'], user=request.user) |
                                                       Q(Q(company__user__administrator=True) | Q(company__user__owner=True), slug=view.kwargs['specialist__slug'],
                                                         company__user__user=request.user)).first()

            return specialist is not None


class ReservationOwnerOrSpecialistCompanyAdmin(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        user = request.user

        try:
            reservation = Reservation.objects.get(pk=view.kwargs['pk'])
            specialist = reservation.specialist

            return reservation.user == user or specialist.company.filter(user__administrator=True, user__user=user).exists()

        except Reservation.DoesNotExist:
            return False