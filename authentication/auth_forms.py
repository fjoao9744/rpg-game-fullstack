from django import forms
from django.contrib.auth.models import User

class RegisterUser(forms.Form):
    username = forms.CharField(label="Nome", max_length=50, 
        widget=forms.TextInput(attrs={"id" : "username__input", "placeholder" : "digite um nome"}))
    email = forms.EmailField(label="Email", 
        widget=forms.EmailInput(attrs={"id" : "email__input", "placeholder" : "digite seu melhor email"}), 
        error_messages={"invalid" : "Por favor, insira um e-mail valido"})
    password = forms.CharField(label="Senha", 
        widget=forms.PasswordInput(attrs={"id" : "password__input", "placeholder" : "digite uma senha"}))
    confirm_password = forms.CharField(label="Confirmar senha", 
        widget=forms.PasswordInput(attrs={"id" : "password_confirm__input", "placeholder" : "digite sua senha novamente"}))

    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get("username")
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")
        
        if password != confirm_password:
            self.add_error('confirm_password', "As senhas não conferem.")
            
        if User.objects.filter(username=username).exists():
            self.add_error("username", "Usuario ja existe, tente outro nome")
        
        return cleaned_data

class LoginUser(forms.Form):
    username = forms.CharField(label="Nome", max_length=100, 
        widget=forms.TextInput(attrs={"id" : "username__input", "placeholder" : "digite o seu nome de usuario"}))
    password = forms.CharField(label="Senha", 
        widget=forms.PasswordInput(attrs={"id" : "password__input", "placeholder" : "digite sua senha"}))

    def clean(self):
        cleaned_data = super().clean()
        
        return cleaned_data

class ForgotPassword(forms.Form):
    email = forms.EmailField(label="Email",
        widget=forms.EmailInput(attrs={"id" : "email__input", "placeholder" : "digite seu email de recuperação"}))
    
    def clean(self):
        cleaned_data = super().clean()
        
        return cleaned_data
    
class ResetPassword(forms.Form):
    new_password = forms.CharField(label="Nova senha",
        widget=forms.PasswordInput(attrs={"id" : "password__input", "placeholder" : "digite sua nova senha"}))
    confirm_new_password = forms.CharField(label="digite novamente",
        widget=forms.PasswordInput(attrs={"id" : "password__input", "placeholder" : "Digite sua nova senha novamente"}))
    
    def clean(self):
        cleaned_data = super().clean()
        new_password = cleaned_data.get("new_password")
        confirm_new_password = cleaned_data.get("confirm_new_password")
        
        if new_password != confirm_new_password:
            self.add_error("confirm_new_password", "As duas senhas devem coincidir")
        
        return cleaned_data