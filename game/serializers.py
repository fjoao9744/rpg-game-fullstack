from rest_framework import serializers
from main.models import Player

class PlayerSerializers(serializers.ModelSerializer): # converte SQL para JSON
    class Meta:
        model = Player
        fields = "__all__"

