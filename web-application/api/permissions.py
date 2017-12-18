from rest_framework import permissions

from webapp.models import Specialist


class MasterOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owner of an Producer to edit it.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            try:
                specialist = Specialist.all_objects.get(slug=view.kwargs['slug'])
                return specialist.user == request.user
            except Specialist.DoesNotExist:
                return False

