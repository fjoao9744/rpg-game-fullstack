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

class PlayerAttackRandomView(APIView):
    def get(self, request, player_name):
        try:
            user = User.objects.get(username=player_name)
            player = Player.objects.get(user=user)

            attack = utils.random_attack(player)
            
            return Response(attack)
        
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
        except Player.DoesNotExist:
            return Response({"error": "Player not found"}, status=404)
        
class PlayerAttackView(APIView):
    def get(self, request, player_name):
        try:
            user = User.objects.get(username=player_name)
            player = Player.objects.get(user=user)

            skills = {
            "skills": [
                player.skill1,
                player.skill2,
                player.skill3,
                player.skill4,
                ]
            }

            return Response(skills)
        
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
        except Player.DoesNotExist:
            return Response({"error": "Player not found"}, status=404)
            
    def put(self, request, player_name, attack_num=None):
        if not attack_num:
            return Response({"error": "attack_num não informado"}, status=400)
    
        skill = request.data.get("skill")
        print(skill)
        
        if not skill:
            return Response({"error": "Skill não enviada no corpo da requisição"}, status=400)
        
        try:
            user = User.objects.get(username=player_name)
            player = Player.objects.get(user=user)
            
            toggle_skill = f"skill{attack_num}"
            
            setattr(player, toggle_skill, skill)
            player.save()

            return Response(skill)
        
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
        except Player.DoesNotExist:
            return Response({"error": "Player not found"}, status=404)
