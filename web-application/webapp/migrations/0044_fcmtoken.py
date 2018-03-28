# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-03-28 11:30
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('webapp', '0043_auto_20180326_1233'),
    ]

    operations = [
        migrations.CreateModel(
            name='FCMToken',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('device_id', models.CharField(max_length=1000, verbose_name='ID устройства')),
                ('firebase_id', models.CharField(max_length=1000, verbose_name='Токен Firebase устройства')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'FCM токен',
                'verbose_name_plural': 'FCM токены',
            },
        ),
    ]
