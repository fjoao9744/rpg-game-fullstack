from rest_framework.views import APIView
from main.models import Player
from api.serializers import PlayerSerializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import renderer_classes
from django.contrib.auth.models import User

@renderer_classes([JSONRenderer])
class Players(APIView):
    def head(self, request):
        username = request.query_params.get("name")
        
        try:
            user = User.objects.get(username=username)
            existe = Player.objects.filter(user=user).exists()
                
            if existe:
                return Response(status=status.HTTP_200_OK)
            
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
            
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def get(self, request):
        username = request.query_params.get("name")
        
        if not username:
            return Response({"erro": "Parâmetro 'name' não fornecido."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(username=username)
            player = Player.objects.get(user=user)
            
        except User.DoesNotExist:
            return Response({"erro": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
        except Player.DoesNotExist:
            return Response({"erro": "Jogador não encontrado."}, status=status.HTTP_404_NOT_FOUND)
            
        serializers = PlayerSerializers(player) # Json
        
        return Response(serializers.data)
    
    def post(self, request):
        username = request.data.get("name")
        user = User.objects.get(username=username)
        
        if Player.objects.filter(user=user).exists():
            return Response({"detail": "Player with this name already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = PlayerSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        player_id = request.data.get("id")
        
        try:
            player = Player.objects.get(id=player_id)
            
        except Player.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = PlayerSerializers(player, data=request.data, partial=False)
        
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # olhar mais tarde
    def patch(self, request):
        player_id = request.data.get("id")
        try:
            player = Player.objects.get(id=player_id)
            
        except Player.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = PlayerSerializers(player, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request):
        name = request.query_params.get("name")
        try:
            player = Player.objects.get(name=name)
            player.delete()
            
            return Response(status=status.HTTP_204_NO_CONTENT)  # Retorna sucesso
        
        except Player.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)