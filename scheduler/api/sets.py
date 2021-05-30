from .serializers import TokenSerializer
from .models import Token

class TokenViewSet(viewsets.ModelViewSet):
    queryset = Token.objects.all().order_by('token')
    serializer_class = TokenSerializer
