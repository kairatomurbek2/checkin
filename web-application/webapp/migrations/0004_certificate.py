# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-17 14:55
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import main.media_path
import sorl.thumbnail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0003_auto_20170817_1334'),
    ]

    operations = [
        migrations.CreateModel(
            name='Certificate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('certificate', sorl.thumbnail.fields.ImageField(upload_to=main.media_path.certificate_path, verbose_name='Сертификат')),
                ('name', models.CharField(blank=True, max_length=80, verbose_name='Название')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='certifications', to='webapp.Company', verbose_name='Учреждение')),
            ],
            options={
                'verbose_name': 'Сертификат',
                'verbose_name_plural': 'Сертификаты',
            },
        ),
    ]
