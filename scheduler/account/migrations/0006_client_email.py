# Generated by Django 3.1.7 on 2021-05-28 18:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_auto_20210528_1810'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='email',
            field=models.EmailField(max_length=254, null=True),
        ),
    ]