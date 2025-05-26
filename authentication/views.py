from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str 
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings
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

def forgot_password_view(request):
    if request.method == "GET":
        form = auth_forms.ForgotPassword()
        return render(request, "auth/forgot_password_page.html", {"form" : form})
    
    if request.method == "POST":
        form = auth_forms.ForgotPassword(request.POST)
        if form.is_valid():
            try:
                email = form.cleaned_data["email"]
                
                user = User.objects.get(email=email)
                
                token = default_token_generator.make_token(user) # gera um token aleatorio
                uid = urlsafe_base64_encode(force_bytes(user.pk)) # codifica em bytes 
                reset_link = request.build_absolute_uri(
                    reverse('reset_password', kwargs={'uidb64': uid, 'token': token})
)                
                send_mail(
                    "Redefinição de senha",
                    f"Clique no link para redefinir sua senha: {reset_link}",
                    settings.DEFAULT_FROM_EMAIL,
                    [user.email],
                    fail_silently=False,
                )
                
                messages.success(request, "Enviamos um link de redefinição para seu e-mail.")
                print("smogon")
                return redirect('forgot_password')
            
            except User.DoesNotExist:
                print("smogon")
                return render_message(request, "auth/forgot_password_page.html", "E-mail não encontrado.", form=form)
            
def reset_password_view(request, uidb64, token):
    if request.method == "GET":
        form = auth_forms.ResetPassword()
        context = {
            'form': form,
            'uidb64': uidb64,
            'token': token,
        }
        
        return render(request, "auth/reset_password_page.html", context)
    
    if request.method == "POST":
        form = auth_forms.ResetPassword(request.POST)
        context = {
            'form': form,
            'uidb64': uidb64,
            'token': token,
        }
        
        try:
            uid = urlsafe_base64_decode(force_str(uidb64))
            user = User.objects.get(pk=uid)
            
        except (User.DoesNotExist, ValueError, TypeError):
            user = None
        
        if user is None or not default_token_generator.check_token(user, token):
            return render_message(request, "auth/forgot_password_page.html", "Link inválido ou expirado.", form=form)

        if form.is_valid():
            password = form.cleaned_data["new_password"]
            user.set_password(password)
            user.save()
            
            messages.success(request, "Senha redefinida com sucesso. Agora faça login.")
            return redirect("login")
        return render(request, "auth/reset_password_page.html", context)
    
def render_message(request, html, message, message_type="error", form={}):
    messages.add_message(request, getattr(messages, message_type.upper()), message)
    return render(request, html, {"form":form})