from django.conf import settings
import json
import os

def get_status_floor(floor_num):
    file_path = os.path.join(settings.BASE_DIR, 'static', 'data', 'floors.json')
    
    with open(file_path, "r") as floor_json:
        floors = json.load(floor_json)
    
    key = f"andar {floor_num}"
    floor = floors.get(key)
    
    return floor

def random_attack(player):
    ...