from __future__ import unicode_literals
from django.utils.translation import ugettext_lazy as _


class Messages:
    class Registration:
        adding_success = _('Регистрация прошла успешно! Теперь же можете авторизоваться')

    class AddMaster:
        adding_success = _('Регистрация специалиста успешно создана!')
        adding_error = _('Произошла ошибка!')

    class AddCompany:
        adding_success = _('Регистрация компании успешно создана!')
        adding_error = _('Произошла ошибка!')
