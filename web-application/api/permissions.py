from rest_framework import permissions
from django.db.models import Q
from webapp.models import Specialist


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

            try:
                specialist = Specialist.all_objects.get(Q(slug=view.kwargs['specialist__slug'], user=request.user) or
                                                        Q(slug=view.kwargs['specialist__slug'],
                                                          company__user__user=request.user, company__user__admin=True))
                return specialist
            except Specialist.DoesNotExist:
                return False
