from django.urls import path
from game.player.views import *

urlpatterns = [
    # andares
    path("floor/next/<str:player_name>/", NextFloor.as_view()),
    path("floor/past/<str:player_name>/", PastFloor.as_view()),
    path("floor/<str:player_name>/", Floor.as_view()),
    
    # attacks
    path("attack/<str:player_name>/<int:attack_num>/", PlayerAttackView.as_view()),
    path("attack/gen/<str:player_name>/", PlayerAttackRandomView.as_view()),
    path("attack/<str:player_name>/", PlayerAttackView.as_view()),

    # player
    path("<str:player_name>/", PlayerView.as_view())
]

