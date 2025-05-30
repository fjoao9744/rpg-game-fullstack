from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from game.serializers import PlayerSerializers
from main.models import Player
import game.battle.utils as utils
import random

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
            
            return Response(monster, status=201)
                    
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
        except Player.DoesNotExist:
            return Response({"error": "Player not found"}, status=404)


class BattlePlayerTurnView(APIView):
    def get(self, request, player_name, attack_num):
        try:
            user = User.objects.get(username=player_name)
            player = Player.objects.get(user=user)

            key = f"skill{attack_num}"
            attack = getattr(player, key)
            attack = list(attack.values())[0]

            attack_damage = attack.get("damage")

            monster = player.monster
            player_damage = random.randint(attack_damage[0], attack_damage[1]) - (random.randint(monster["defe"][0], monster["defe"][1]))
            if player_damage < 1:
                player_damage = 1

            monster["hp"] -= player_damage
            player.monster = monster
            player.save()

            player_serializers = PlayerSerializers(player)
            
            return Response({"player": player_serializers.data, "monster": monster})
            
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
        except Player.DoesNotExist:
            return Response({"error": "Player not found"}, status=404)
        
class BattleMonsterTurnView(APIView):
    def get(self, request, player_name):
        try:
            user = User.objects.get(username=player_name)
            player = Player.objects.get(user=user)

            monster = player.monster

            if not monster:
                return Response({"error": "O jogador não esta em uma batalha"})

            monster_attack = random.choice(list(player.monster.get("skills").items()))

            attack_damages = monster_attack[1]["damage"]

            player.hp -= random.randint(attack_damages[0], attack_damages[1])

            if player.hp <= 0:
                player.save()
                return Response({"game over"})
            
            player_serializers = PlayerSerializers(player)
            
            return Response({"player": player_serializers.data, "monster": monster})

        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
        except Player.DoesNotExist:
            return Response({"error": "Player not found"}, status=404)