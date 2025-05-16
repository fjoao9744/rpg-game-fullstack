from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User

def login_view(request):
    if request.method == "GET":
        return render(request, "auth/login_page.html")
    
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        
        user = authenticate(username=username, password=password)
        
        if not user:
            messages.error(request, "Usuário ou senha incorretos.")
            return render(request, "auth/login_page.html")
        
        login(request, user)
        
        messages.success(request, "Sucesso! usuario conectado.")
        return redirect("main")
        
def register_view(request):
    if request.method == "GET":
        return render(request, "auth/register_page.html")
    
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
                
        if User.objects.filter(username=username).exists():
            return render_message(request, "auth/register_page.html", "Ja existe um usuario com esse nome!")

        if  User.objects.filter(email=email).exists():
            return render_message(request, "auth/register_page.html", "Ja existe um usuario com esse email!")
        
        messages.success(request, "Sucesso! Usuario criado com sucesso.")
        User.objects.create_user(username=username, email=email, password=password)
        
        return redirect("login")

def logout_view(request):
    logout(request)
    messages.info(request, "Usuario desconectado.")
    return redirect("main")
    
def render_message(request, html, message, message_type="error"):
    messages.add_message(request, getattr(messages, message_type.upper()), message)
    return render(request, html)