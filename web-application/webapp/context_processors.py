from webapp.models import Category


def categories(request):
    context = {"categories": Category.objects.filter(parent=None)}
    return context
