from django.shortcuts import render

def main(request):

    return render(request, "main.html")

def api_test(request): # test
    return render(request, "api.html")


