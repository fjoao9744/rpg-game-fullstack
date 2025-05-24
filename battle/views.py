from django.http import JsonResponse
from django.conf import settings
import json
import os
import random

def choice_monster(request, floor_num):
    
    file_path = os.path.join(settings.BASE_DIR, 'static', 'data', 'floors.json')
    
    # ler o json dos andares
    with open(file_path, "r") as floor_json:
        floors = json.load(floor_json)
                
    # pegar os monstros do andar que o user passou
    floor_list = floors.items()
    floor = tuple(filter(lambda floor: int(floor[0].split()[-1]) == floor_num, floor_list))[0]    
    
    monsters = floor[1].get("monsters")    
    
    # sortear os monstros
    weights = [list(monster.values())[0] / 100 for monster in monsters]    
    
    monster = random.choices(monsters, weights=weights, k=1)[0]
    
    return get_status_monster(request, monster)
    
def get_status_monster(request, monster):
    file_path = os.path.join(settings.BASE_DIR, 'static', 'data', 'monsters.json')
        
    with open(file_path, "r") as monsters_json:
        monsters = json.load(monsters_json)
        
    monster_key = list(monster.keys())[0]
    
    monster = monsters.get(monster_key)
        
    return JsonResponse(monster, safe=False)

