from django.conf import settings
import json
import os

def get_status_floor(floor_num):
    file_path = os.path.join(settings.BASE_DIR, 'static', 'data', 'floors.json')
    
    with open(file_path, "r") as floor_json:
        floors = json.load(floor_json)

    floor_list = floors.items()
    floor = tuple(filter(lambda floor: int(floor[0].split()[-1]) == floor_num, floor_list))[0]

    return floor