
from django.urls import include, path
from .views import register

urlpatterns = [ 
    path('register',register),
    path('api-auth/', include('rest_framework.urls', namespace='hairdr_framework')),

]



 
