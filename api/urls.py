# rotas da api
from django.urls import path
from api import views

urlpatterns = [
    path("", views.Players.as_view()),
]