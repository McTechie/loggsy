from django.db import models

class Log(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField()
    severity = models.IntegerField()
    source = models.CharField(max_length=50)
    message = models.CharField(max_length=200)

    def __str__(self):
        return self.id
