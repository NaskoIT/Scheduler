from django.shortcuts import render
from django.http import HttpRequest,HttpResponse

def test(request):
      return HttpResponse('Jell')
