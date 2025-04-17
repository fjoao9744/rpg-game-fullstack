from rest_framework.views import APIView
from main.models import Player
from api.serializers import PlayerSerializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import renderer_classes

@renderer_classes([JSONRenderer])
class Players(APIView):
    def get(self, request):
        name = request.query_params.get("name")
        
        if name:
            players = Player.objects.filter(name=name) # Python
            
        serializers = PlayerSerializers(players, many=True) # Json

        return Response(serializers.data)
    
    def post(self, request):
        serializer = PlayerSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)