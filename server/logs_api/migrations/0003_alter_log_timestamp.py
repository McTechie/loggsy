# Generated by Django 4.2.3 on 2023-07-23 15:22

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("logs_api", "0002_alter_log_timestamp"),
    ]

    operations = [
        migrations.AlterField(
            model_name="log",
            name="timestamp",
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
