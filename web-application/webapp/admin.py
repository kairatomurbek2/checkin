import datetime

from dal import autocomplete
from django.contrib import admin
from mptt.admin import DraggableMPTTAdmin
from webapp.models import Category, Company, Certificate, CompanyContact, Specialist, SpecialistContact, Rating, \
    ScheduleSetting, TimeInterval, Reservation
from django import forms
from mptt.forms import TreeNodeMultipleChoiceField


class CategoryAdmin(DraggableMPTTAdmin):
    list_filter = ['is_active']
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ['name', 'slug']


class CompanyAdminForm(forms.ModelForm):
    categories = TreeNodeMultipleChoiceField(required=False,
                                             queryset=Category.objects.all(),
                                             level_indicator=u'+--',
                                             widget=admin.widgets.FilteredSelectMultiple('Categories', False))

    class Meta:
        model = Company
        fields = '__all__'
        widgets = {
            'tags': autocomplete.TaggitSelect2('autocomplete')
        }


class CompanyContactInline(admin.TabularInline):
    model = CompanyContact
    fields = ['phone']
    extra = 1


class CompanyAdmin(admin.ModelAdmin):
    list_per_page = 50
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ['name', 'slug']
    list_filter = ['status']
    list_display = ['name', 'slug', 'phone', 'status', 'email']
    readonly_fields = ('created_at', 'edited_at', 'edited_by', 'categories', 'rating')
    # form = CompanyAdminForm
    inlines = [CompanyContactInline]

    def save_model(self, request, obj, form, change):
        obj.edited_by = request.user
        obj.save()


class SpecialistContactInline(admin.TabularInline):
    model = SpecialistContact
    fields = ['phone']
    extra = 1


class SpecialistAdmin(admin.ModelAdmin):
    list_per_page = 50
    prepopulated_fields = {"slug": ("full_name",)}
    search_fields = ['full_name', 'slug']
    list_filter = ['company']
    list_display = ['full_name', 'slug']
    readonly_fields = ('created_at', 'edited_at', 'edited_by', 'categories', 'rating')
    inlines = [SpecialistContactInline]

    def save_model(self, request, obj, form, change):
        obj.edited_by = request.user
        obj.save()

    def get_queryset(self, request):
        return super(SpecialistAdmin, self).get_queryset(request).prefetch_related('tags')

    def tag_list(self, obj):
        return u", ".join(o.name for o in obj.tags.all())


class CertificateAdmin(admin.ModelAdmin):
    list_display = ['company']


class RatingAdmin(admin.ModelAdmin):
    list_display = ['user']


class ReservationAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'specialist']
    list_filter = ['status', 'date_time_reservation']
    readonly_fields = ('created_at', )


admin.site.register(Rating, RatingAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Company, CompanyAdmin)
admin.site.register(Certificate, CertificateAdmin)
admin.site.register(Specialist, SpecialistAdmin)
admin.site.register(ScheduleSetting)
admin.site.register(TimeInterval)
admin.site.register(Reservation, ReservationAdmin)
