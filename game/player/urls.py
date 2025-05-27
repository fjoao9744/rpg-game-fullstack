from django.urls import path
from game.player.views import PlayerView,Floor, NextFloor, PastFloor

urlpatterns = [
    path("<str:player_name>", PlayerView.as_view()),
    path("floor/<str:player_name>", Floor.as_view()),
    path("floor/next/<str:player_name>", NextFloor.as_view()),
    path("floor/past/<str:player_name>", PastFloor.as_view()),


]