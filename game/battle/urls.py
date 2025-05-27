from django.urls import path
from game.battle.views import BattleStartView

urlpatterns = [
    path("start/<player_name>", BattleStartView.as_view())

]