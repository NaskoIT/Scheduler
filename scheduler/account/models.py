from django.db import models

# Create your models here.
class Client(models.Model):
   username = models.CharField(max_length = 60)
   password = models.CharField(max_length = 60)
   salt = models.CharField(max_length = 20)


   def __str__(self):
      return self.username
