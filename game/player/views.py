from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from game.serializers import PlayerSerializers
import game.player.utils as utils
from main.models import Player

class PlayerView(APIView):
    def get(self, request, player_name):
        try:
            user = User.objects.get(username=player_name)
            player = Player.objects.get(user=user)

            serializers = PlayerSerializers(player)

            return Response(serializers.data)
        
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
        except Player.DoesNotExist:
            return Response({"error": "Player not found"}, status=404)
        
class Floor(APIView):
    def get(self, request, player_name):
        try:
            user = User.objects.get(username=player_name)
            player = Player.objects.get(user=user)

            floor = utils.get_status_floor(player.floor)

            return Response(floor)
        
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
        except Player.DoesNotExist:
            return Response({"error": "Player not found"}, status=404)

class NextFloor(APIView):
    def get(self, request, player_name):
        try:
            user = User.objects.get(username=player_name)
            player = Player.objects.get(user=user)
            
            if player.floor == player.max_floor:
                player.max_floor += 1

            if player.max_floor < player.floor:
                player.floor += 1
                player.save()

            floor = utils.get_status_floor(player.floor)

            return Response(floor)
        
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
        except Player.DoesNotExist:
            return Response({"error": "Player not found"}, status=404)
            
class PastFloor(APIView):
    def get(self, request, player_name):
        try:
            user = User.objects.get(username=player_name)
            player = Player.objects.get(user=user)
            
            if player.floor > 1:
                player.floor -= 1
                player.save()

            floor = utils.get_status_floor(player.floor)

            return Response(floor)
        
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
        except Player.DoesNotExist:
            return Response({"error": "Player not found"}, status=404)

class PlayerAttackView(APIView):
    def get(self, request, player_name):
        try:
            user = User.objects.get(username=player_name)
            player = Player.objects.get(user=user)

            serializers = PlayerSerializers(player)

            return Response(serializers.data["skills"])
        
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
        except Player.DoesNotExist:
            return Response({"error": "Player not found"}, status=404)
            
    def post(self, request, player_name, attack_num):
        ...
