from django import forms
from django.contrib.auth.models import User

class RegisterUser(forms.Form):
    username = forms.CharField(label="Nome", max_length=50, widget=forms.TextInput(attrs={"id" : "username__input"}))
    email = forms.EmailField(label="Email", widget=forms.EmailInput(attrs={"id" : "email__input"}), 
        error_messages={"invalid" : "Por favor, insira um e-mail valido"})
    password = forms.CharField(label="Senha", widget=forms.PasswordInput(attrs={"id" : "password__input"}))
    confirm_password = forms.CharField(label="Confirmar senha", widget=forms.PasswordInput(attrs={"id" : "password_confirm__input"}))

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
    username = forms.CharField(label="Nome", max_length=100, widget=forms.TextInput(attrs={"id" : "username__input"}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={"id" : "password__input"}), label="Senha")

    def clean(self):
        cleaned_data = super().clean()
        
        return cleaned_data