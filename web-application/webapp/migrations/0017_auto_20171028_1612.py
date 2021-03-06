# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-28 10:12
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0016_schedulesetting'),
    ]

    operations = [
        migrations.CreateModel(
            name='TimeInterval',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_interval', models.CharField(max_length=255, verbose_name='Время')),
            ],
            options={
                'verbose_name_plural': 'Промежутки времени',
                'verbose_name': 'Промежуток времени',
            },
        ),
        migrations.AddField(
            model_name='schedulesetting',
            name='time_interval',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='time_intervals_schedule', to='webapp.TimeInterval'),
            preserve_default=False,
        ),
    ]
