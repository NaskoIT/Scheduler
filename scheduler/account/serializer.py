from .models import Clients
from rest_framework import serializers

class ClientsSerializer(serializers.HyperlinkedModelSerializer):
      class Meta:
            model = Clients
            field = ('id','username','password','salt')
