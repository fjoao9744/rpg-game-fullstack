from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from main.models import Player

@receiver(post_save, sender=User)
def create_player_for_new_user(sender, instance, created, **kwargs):
    if created:
        Player.objects.create(user=instance)
