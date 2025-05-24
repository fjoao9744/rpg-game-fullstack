from django.urls import path
from battle import views

urlpatterns = [
    path("monster/<int:floor_num>", views.choice_monster),
]
