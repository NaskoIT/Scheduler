from .serializers import TokenSerializer
from .models import Token
from rest_framework import viewsets

class TokenViewSet(viewsets.ModelViewSet):
    queryset = Token.objects.all().order_by('token')
    serializer_class = TokenSerializer
