# Generated by Django 4.2.3 on 2023-07-23 15:21

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("logs_api", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="log",
            name="timestamp",
            field=models.DateTimeField(auto_created=True),
        ),
    ]
