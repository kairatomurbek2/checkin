# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-11-27 14:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0030_auto_20171127_1809'),
    ]

    operations = [
        migrations.AlterField(
            model_name='specialist',
            name='company',
            field=models.ManyToManyField(related_name='company_specialists', to='webapp.Company', verbose_name='Учреждение'),
        ),
    ]
