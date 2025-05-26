from django.urls import path
from authentication import views

urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("register/", views.register_view, name="register"),
    path("logout/", views.logout_view, name="logout"),
    
    path("forgot_password/", views.forgot_password_view, name="forgot_password"),
    path("reset_password/<uidb64>/<token>/", views.reset_password_view, name="reset_password"),
    
    
]
