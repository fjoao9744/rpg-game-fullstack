from django.conf import settings
import json
import random
import os

def get_status_floor(floor_num):
    file_path = os.path.join(settings.BASE_DIR, 'static', 'data', 'floors.json')
    
    with open(file_path, "r") as floor_json:
        floors = json.load(floor_json)
    
    key = f"andar {floor_num}"
    floor = floors.get(key)
    
    return floor

def is_valid_attack(attack, player):
    for c in range(1, 5):
        key = f"skill{c}"
        attr = getattr(player, key)
        if attack in attr:
            return False
    
    return True

def random_attack(player):
    file_path = os.path.join(settings.BASE_DIR, 'static', 'data', 'attacks.json')
    
    with open(file_path, "r") as attack_json:
        attacks = json.load(attack_json)
        
    possible_attacks = []
    
    for chave, attack in attacks.items():
        if attack["floor"] <= player.max_floor:
            if is_valid_attack(chave, player):
                possible_attacks.append(chave)
                
    return get_status_attack(random.choice(possible_attacks))
    
def get_status_attack(attack):
    file_path = os.path.join(settings.BASE_DIR, 'static', 'data', 'attacks.json')
    
    with open(file_path, "r") as attack_json:
        attacks = json.load(attack_json)
        
    attack = attacks.get(attack)
    
    return attack

