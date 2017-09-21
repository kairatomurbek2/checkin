from __future__ import unicode_literals
from django.utils.translation import ugettext_lazy as _


class Messages:
    form_error = _('Ошибка при отправке формы')

    class Registration:
        adding_success = _('Регистрация прошла успешно! Теперь же можете авторизоваться')

    class AddMaster:
        adding_success = _('Регистрация специалиста успешно создана!')
        adding_error = _('Произошла ошибка!')
        update_success = _('Ваши данные успешно обновлены!')

    class AddCompany:
        adding_success = _('Регистрация компании успешно создана!')
        update_success = _('Ваши данные успешно обновлены!')
        adding_error = _('Произошла ошибка!')

    class UserInvite:
        user_not_found = _('Пользователь с такими личными данными не найден')
        user_already_in_pws = _('Выбранный пользователь - сотрудник выбранного Компании уже')
        user_invite_error = _('Ошибка при отправке формы')
        user_invite_success = _(
            'Приглашение было отправлено выбранному пользователю на Эл. адрес. Он должен принять в течение 10 дней')
        user_invite_failed = _('Не удалось отправить приглашение. Пожалуйста, повторите попытку позже.')
