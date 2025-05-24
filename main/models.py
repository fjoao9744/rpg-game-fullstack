from django.db import models
from django.contrib.auth.models import User
import random

def default_atk():
    return random.randint(2, 5)

def default_skills():
    return {
        "attack1": {
            "name": "ataque basico",
            "type": "none",
            "damage": [2, 5],
            "description": "um simples ataque",
            "effect": None,
            "value": 0,
            "gif": "static/media/sprites/atacks/attack_basic.gif"
        },
        "status1": {
            "name": "defender",
            "type": "none",
            "damage": [0, 0],
            "description": "você esta preparado para defender um golpe",
            "effect": "defense",
            "value": 10,
            "gif": "static/media/sprites/atacks/attack_basic.gif"
        }
    }

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='player', null=False, blank=True)
    kill = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    andar = models.IntegerField(default=1)
    exp = models.IntegerField(default=0)
    gold = models.IntegerField(default=0)
    hp = models.IntegerField(default=20)
    atk = models.IntegerField(default=default_atk)
    skills = models.JSONField(default=default_skills)
    inventory = models.JSONField(default=dict)
    achievements = models.JSONField(default=dict)
    monster = models.JSONField(default=dict)
    defe = models.IntegerField(default=0)
    speed = models.IntegerField(default=1)

    def __str__(self):
        return self.user.username
    