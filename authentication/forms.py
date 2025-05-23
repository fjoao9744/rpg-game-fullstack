from django import forms
from django.contrib.auth.models import User

class RegisterUser(forms.Form):
    username = forms.CharField(label="Nome", max_length=100, widget=forms.TextInput(attrs={"id" : "username__input"}))
    email = forms.EmailField(label="Email", widget=forms.EmailInput(attrs={"id" : "email__input"}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={"id" : "password__input"}), label="Senha")
    confirm_password = forms.CharField(widget=forms.PasswordInput(attrs={"id" : "password_confirm__input"}), label="Confirmar senha")

    # mudar
    def clean(self):
        cleaned_data = super().clean()
        p1 = cleaned_data.get('password')
        p2 = cleaned_data.get('confirm_password')

        if p1 and p2 and p1 != p2:
            raise self.add_error("confirm_password",'As senhas não coincidem.')

        return cleaned_data

class LoginUser(forms.Form):
    username = forms.CharField(label="Nome", max_length=100, widget=forms.TextInput(attrs={"id" : "username__input"}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={"id" : "password__input"}), label="Senha")

    # mudar
    def clean(self):
        cleaned_data = super().clean()
        
        return cleaned_data