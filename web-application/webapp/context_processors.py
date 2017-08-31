from webapp.models import Category


def categories(request):
    context = {"categories": Category.objects.filter(parent=None),
               "all_categories": Category.objects.all()
               }
    return context
