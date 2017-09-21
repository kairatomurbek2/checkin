from django.contrib import messages
from django.views.generic import FormView

from main.parameters import Messages


class BaseFormView(FormView):
    success_message = None
    error_message = Messages.form_error

    def form_valid(self, form):
        if self.success_message:
            messages.success(self.request, self.success_message)
        return super(BaseFormView, self).form_valid(form)

    def form_invalid(self, form):
        if self.error_message:
            messages.error(self.request, self.error_message)
        return super(BaseFormView, self).form_invalid(form)
