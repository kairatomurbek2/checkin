# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-22 11:43
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0006_specialist'),
    ]

    operations = [
        migrations.CreateModel(
            name='SpecialistContact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', phonenumber_field.modelfields.PhoneNumberField(max_length=128, verbose_name='Номер телефона')),
                ('specialist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='specialist_contacts', to='webapp.Specialist', verbose_name='Специалист')),
            ],
            options={
                'verbose_name_plural': 'Контакты специалистов',
                'verbose_name': 'Контакт специалиста',
            },
        ),
    ]
