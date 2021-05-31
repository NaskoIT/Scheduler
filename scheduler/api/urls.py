from django.urls import include, path
from .appointments import getAppointments,addAppointment

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api/account/',include('account.urls')),
    path('api/appointments',getAppointments),
    path('api/appointment',addAppointment)
]

