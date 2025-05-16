from django.contrib import admin
from django.urls import path, include
from main import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", views.main, name="main"),
    path("api/", include("api.urls")),
    path("auth/", include("authentication.urls"))
]
