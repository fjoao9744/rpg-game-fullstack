from django.urls import path
from game.battle.views import BattleStartView, BattlePlayerTurnView, BattleMonsterTurnView

urlpatterns = [
    path("turn/player/<player_name>/<attack_num>", BattlePlayerTurnView.as_view()),
    path("turn/monster/<player_name>", BattleMonsterTurnView.as_view()),
    path("start/<player_name>", BattleStartView.as_view()),

]