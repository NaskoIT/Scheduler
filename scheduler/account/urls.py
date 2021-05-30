from django.urls import include, path
from .views import login,getHairDressers
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('account/client/',include('client.urls')) ,
    path('account/hairdresser/',include('hairdresser.urls')),
    path('account/hairdressers',getHairDressers),
    path('account/login',login),  
]




