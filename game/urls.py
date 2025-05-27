from django.urls import path, include

urlpatterns = [
    path("player/", include("game.player.urls")),
    path("battle/", include("game.battle.urls"))
]
