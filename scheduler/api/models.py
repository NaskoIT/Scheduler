from django.db import models

class Appointment(models.Model):
    WAITING = 'WAIT'
    ACCEPT = 'ACCP'
    DECLINED =  'DECL'
    APPOINTMENT_STATUS_CHOICES = [(WAITING,'Waiting'), (ACCEPT,'Accepted'), (DECLINED, 'Declined')]

    client_id = models.IntegerField()
    hairdr_id = models.IntegerField()
    startHour = models.TimeField()
    endHour = models.TimeField()
    status = models.CharField(max_length = 10,choices = APPOINTMENT_STATUS_CHOICES,default = WAITING)
    
    def __str__(self):
       return "( " + str(self.client_id) + " " + str(self.hairdr_id) + "  " +  self.status +  ")"
