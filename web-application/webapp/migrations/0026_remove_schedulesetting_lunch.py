# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-11-13 13:06
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0025_auto_20171113_1851'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='schedulesetting',
            name='lunch',
        ),
    ]
