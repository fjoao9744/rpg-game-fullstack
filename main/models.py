from django.db import models
from django.contrib.auth.models import User
import random

def default_atk():
    return random.randint(3, 6)

def default_skill1():
    return {
            "name": "ataque basico",
            "type": "none",
            "damage": [2, 5],
            "description": "um simples ataque",
            "effect": None,
            "value": 0,
            "gif": "static/media/sprites/atacks/attack_basic.gif"
        }
    
def default_skill2():
    return {
        "name": "defender",
        "type": "none",
        "damage": [0, 0],
        "description": "você esta preparado para defender um golpe",
        "effect": "defense",
        "value": 10,
        "gif": "static/media/sprites/atacks/attack_basic.gif"
    }

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='player', null=False, blank=True)
    levelup = models.BooleanField(default=True)
    kill = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    max_floor = models.IntegerField(default=1)
    floor = models.IntegerField(default=1)
    exp = models.IntegerField(default=0)
    max_exp = models.IntegerField(default=60)
    gold = models.IntegerField(default=0)
    hp = models.IntegerField(default=50)
    max_hp = models.IntegerField(default=20)
    atk = models.IntegerField(default=default_atk)
    skill1 = models.JSONField(default=default_skill1)
    skill2 = models.JSONField(default=default_skill2)
    skill3 = models.JSONField(default=dict)
    skill4 = models.JSONField(default=dict)
    inventory = models.JSONField(default=dict)
    achievements = models.JSONField(default=dict)
    monster = models.JSONField(default=dict)
    defe = models.IntegerField(default=0)
    speed = models.IntegerField(default=1)

    def __str__(self):
        return self.user.username
    
    class Meta:
        managed = True
        db_table = 'main_player'
        