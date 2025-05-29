from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from game.serializers import PlayerSerializers
from main.models import Player
import game.battle.utils as utils

class BattleStartView(APIView):
    def get(self, request, player_name):
        try:
            user = User.objects.get(username=player_name)
            player = Player.objects.get(user=user)

            if player.monster:
                return Response(player.monster)
            
            monster = utils.choice_monster(player.floor)
            
            player.monster = monster
            player.save()
            
            return Response(monster, status=status.HTTP_201_CREATED)
                    
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
        except Player.DoesNotExist:
            return Response({"error": "Player not found"}, status=404)
