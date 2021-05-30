from django.db import models

class Appointment(models.Model):
      client_id = models.IntegerField()
      hairdr_id = models.IntegerField()
      startHour = models.TimeField()
      endHour = models.TimeField()

      def __str__(self):
         return "(" + str(self.client_id) + " " + str(self.hairdr_id)  + ")"
