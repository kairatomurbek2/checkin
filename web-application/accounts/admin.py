from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from accounts.models import User


class MyUserAdmin(UserAdmin):
    list_display = ['email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser']
    list_filter = ['is_active', 'groups', 'date_joined']
    readonly_fields = ['date_joined']
    search_fields = ['first_name', 'last_name', 'email']

admin.site.register(User, MyUserAdmin)
