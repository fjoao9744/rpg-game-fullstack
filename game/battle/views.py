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
            
            if player.floor == 5 or player.floor == 10:
                player.monster = {}
                player.save()
                return Response({}, status=201)
                
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

            key = f"skill{int(attack_num) + 1}"
            attack = getattr(player, key)

            attack_damage = attack.get("damage")

            monster = player.monster
            
            if not monster:
                player_serializers = PlayerSerializers(player)
                return Response({"player": player_serializers.data, "monster": monster})
            
            player_damage = random.randint(attack_damage[0], attack_damage[1]) - (random.randint(monster["defe"][0], monster["defe"][1])) + player.atk
            
            if player_damage < 1:
                player_damage = 1

            monster["hp"] -= player_damage
            exp = monster['exp']
            score = monster['score']
            
            if monster["hp"] <= 0:
                player.kill += 1
                player.score += monster["score"]
                player.exp += monster["exp"]
                monster = {}
            
            levelup = False
            while player.exp >= player.max_exp:
                player.level += 1
                player.max_exp *= 2
                player.atk += random.randint(1, 3)
                player.defe += random.randint(1, 3)
                player.max_hp += random.randint(15, 25)
                player.speed += random.randint(1, 3)
                player.hp = player.max_hp
                player.levelup = True
                levelup = True
                
                
            player.monster = monster
            player.save()

            player_serializers = PlayerSerializers(player)
            
            return Response({"player": player_serializers.data, "monster": monster, "player_damage": player_damage, "exp": exp, "score": score, "levelup": levelup})
            
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
            
            monster_damage = random.randint(attack_damages[0], attack_damages[1])

            player.hp -= monster_damage
            player.save()

            player_serializers = PlayerSerializers(player)
            
            return Response({"player": player_serializers.data, "monster": monster, "monster_damage": monster_damage, "monster_attack": monster_attack})

        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
        except Player.DoesNotExist:
            return Response({"error": "Player not found"}, status=404)