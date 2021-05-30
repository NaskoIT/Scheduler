from django.db import models

# Create your models here.
# setting fields to be able to be NULL frontend won`t allow them to submit 

class Client(models.Model):
   
   username = models.CharField(max_length = 64)
   password = models.CharField(max_length = 64)
   salt = models.CharField(max_length = 20)
   firstName = models.CharField(null = True,max_length = 50)
   lastName = models.CharField(null = True,max_length = 50)
   email = models.EmailField(null = True)
   phone = models.CharField(null = True,max_length = 10)

   def __str__(self):
      return self.username

class Hairdresser(Client):
   location =  models.CharField(null = True, max_length = 90)
   startHour =  models.TimeField(null = True)
   endHour = models.TimeField(null = True)
   description = models.TextField(null = True)
   
   def __str__(self):
     return self.username
