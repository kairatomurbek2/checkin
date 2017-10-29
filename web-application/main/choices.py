from __future__ import unicode_literals
from django.utils.translation import ugettext_lazy as _

MODERATION = 'MD'
ACTIVE = 'AC'
DECLINE = 'DC'
INACTIVE = 'IN'
STATUS_CHOICES = (
    (MODERATION, _('На модерации')),
    (ACTIVE, _('Активный')),
    (DECLINE, _('Отклоненный')),
    (INACTIVE, _('Неактивный'))
)

MALE = 'MALE'
FEMALE = 'FEMALE'
DEFAULT = ''
SEX_CHOICES = (
    (DEFAULT, '------'),
    (_('Мужской'), _('Мужской')),
    (_('Женский'), _('Женский'))
)
RATING_CHOICES = (
    (1, '1'),
    (2, '2'),
    (3, '3'),
    (4, '4'),
    (5, '5'),
)
