from __future__ import unicode_literals
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email, username and password.
        """
        if not email:
            raise ValueError('User must have an email address')
        user = self.model(email=self.normalize_email(email))

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(email, password=password)
        user.username = email
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(_('username'), max_length=60, unique=True)
    first_name = models.CharField(verbose_name=_('Имя'), max_length=30, blank=True)
    last_name = models.CharField(verbose_name=_('Фамилия'), max_length=30, blank=True)
    email = models.EmailField(verbose_name=_('Эл. адрес'), unique=True)
    is_staff = models.BooleanField(_('staff status'), default=False,
                                   help_text=_('Указывает, может ли пользователь войти в этот админ-сайт'))
    is_active = models.BooleanField(verbose_name=_('Активен'), default=True)
    date_joined = models.DateTimeField(verbose_name=_('Дата регистрации'), default=timezone.now)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def get_full_name(self):
        if self.first_name and self.last_name:
            return self.first_name + ' ' + self.last_name
        if self.first_name and not self.last_name:
            return self.first_name
        if self.last_name and not self.first_name:
            return self.last_name
        return self.email

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = _('Пользователь')
        verbose_name_plural = _('Пользователи')
        db_table = 'auth_user'
