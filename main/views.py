from django.shortcuts import render

def main(request):
    return render(request, "main.html", {"username": request.user.username})
