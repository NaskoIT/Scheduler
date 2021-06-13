
from django.urls import include, path
from .views import register,getAppointments

urlpatterns = [ 
    path('register',register),
    path('appointments',getAppointments)

]




