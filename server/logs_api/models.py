from django.db import models

class Log(models.Model):
    """
    Model to define the structure of the log object.
    
    Fields:
        - id: unique id for the log
        - timestamp: timestamp of the log
        - severity: severity of the log
        - source: source of the log
        - message: message of the log
    """

    id = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField()
    severity = models.IntegerField()
    source = models.CharField(max_length=50)
    message = models.CharField(max_length=200)

    def __str__(self):
        return self.id
