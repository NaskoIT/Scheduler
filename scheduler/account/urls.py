from django.urls import include, path
from rest_framework import routers
from .views import register,login
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('account/register',register), # add view command // registering normal user 

   #path('account/registerHD,registerHD') # registering hairdressers

    path('account/login',login), #router  
    path('api-auth/', include('rest_framework.urls', namespace='account_framework')),
]




