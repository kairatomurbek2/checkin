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
