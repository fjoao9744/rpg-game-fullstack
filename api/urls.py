# rotas da api
from django.urls import path
from api import views
from main import views as v # test

urlpatterns = [
    path("", views.Players.as_view()),
]

