from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from . import auth_forms

def login_view(request):
    if request.method == "GET":
        form = auth_forms.LoginUser()
        return render(request, "auth/login_page.html", {"form":form})
    
    if request.method == "POST":
        form = auth_forms.LoginUser(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            
            user = authenticate(username=username, password=password)
            
            if not user:
                messages.error(request, "Usuário ou senha incorretos.")
                return render(request, "auth/login_page.html", {"form":form})
            
            login(request, user)
            
            messages.success(request, "Sucesso! usuario conectado.")
            
            return redirect("main")
        return render(request, "auth/login_page.html", {"form":form})        
        
        
def register_view(request):
    if request.method == "GET":
        form = auth_forms.RegisterUser()
        return render(request, "auth/register_page.html", {"form":form})
    
    if request.method == "POST":
        form = auth_forms.RegisterUser(request.POST)
        if form.is_valid():
            print("smogon2")
            username = form.cleaned_data['username']
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            confirm_password = form.cleaned_data['confirm_password']
            
            if User.objects.filter(username=username).exists():
                return render_message(request, "auth/register_page.html", "Ja existe um usuario com esse nome!", form=form)

            if User.objects.filter(email=email).exists():
                return render_message(request, "auth/register_page.html", "Ja existe um usuario com esse email!", form=form)
            
            messages.success(request, "Sucesso! Usuario criado com sucesso.")
            User.objects.create_user(username=username, email=email, password=password)
        
            return redirect("login")
        print(form.cleaned_data)
        
        return render(request, "auth/register_page.html", {"form":form})

def logout_view(request):
    logout(request)
    messages.info(request, "Usuario desconectado.")
    return redirect("main")
    
def render_message(request, html, message, message_type="error", form={}):
    messages.add_message(request, getattr(messages, message_type.upper()), message)
    return render(request, html, {"form":form})
