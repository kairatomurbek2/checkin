from django.contrib import admin
from mptt.admin import DraggableMPTTAdmin
from webapp.models import Category, Company, Certificate, CompanyContact, Specialist, SpecialistContact
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
    readonly_fields = ('created_at', 'edited_at', 'edited_by')
    form = CompanyAdminForm
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
    readonly_fields = ('created_at', 'edited_at', 'edited_by')
    inlines = [SpecialistContactInline]


class CertificateAdmin(admin.ModelAdmin):
    list_display = ['name', 'company']


admin.site.register(Category, CategoryAdmin)
admin.site.register(Company, CompanyAdmin)
admin.site.register(Certificate, CertificateAdmin)
admin.site.register(Specialist, SpecialistAdmin)
