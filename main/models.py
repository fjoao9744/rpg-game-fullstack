from django.db import models

class Player(models.Model):
    name = models.CharField(max_length=100, unique=True)
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
        return self.name