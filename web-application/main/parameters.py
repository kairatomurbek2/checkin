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
        invite_specialist_have_accepted = _('Вы уже приняли это приглашение.')
        invite_successfully = _('Приглашение успешно принято')
        invite_expired = _(
            'Приглашение истекло. Пожалуйста, свяжитесь с администратором учреждений для получения нового приглашения.')

    class AddCompany:
        adding_success = _('Регистрация компании успешно создана!')
        add_administrator_success = _('Вы успешно создали администратора !')
        update_success = _('Ваши данные успешно обновлены!')
        adding_error = _('Произошла ошибка!')

    class UserInvite:
        user_not_found = _('Пользователь с такими личными данными не найден')
        user_already_in_pws = _('Выбранный пользователь - сотрудник выбранного Компании уже')
        user_invite_error = _('Ошибка при отправке формы')
        user_invite_success = _(
            'Приглашение было отправлено выбранному пользователю на Эл. адрес. Он должен принять в течение 10 дней')
        user_invite_failed = _('Не удалось отправить приглашение. Пожалуйста, повторите попытку позже.')

    class AddReview:
        adding_success_specialist = _('Вы успешно добавили отзыв специалисту!')
        adding_success_company = _('Вы успешно добавили отзыв компании!')

    class AddScheduleSetting:
        adding_success = _('Настройка расписание успешно созданы !')
        update_success = _('Настройка расписание успешно обновлены !')

    class Favorite:
        error = _('У вас нет доступа')
        delete_success = _('Специалист успешно удален из избранных')
        add_success = _('Специалист успешно добавлен в избранное')

    class Rating:
        forbidden = _('Вы уже добавляли отзыв')

    class Employees:
        delete_employe_success = _('Администратор успешно уволен!')
        employe_warning_message = _('Администратор не существует')
