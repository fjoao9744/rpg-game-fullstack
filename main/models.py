from django.db import models
from django.contrib.auth.models import User

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='player')
    kill = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    exp = models.IntegerField(default=0)
    hp = models.IntegerField(default=0)
    atk = models.IntegerField(default=0)
    skills = models.JSONField(default=dict)
    inventory = models.JSONField(default=dict)
    defe = models.IntegerField(default=0)
    speed = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username