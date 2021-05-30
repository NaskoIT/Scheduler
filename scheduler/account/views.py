# main view file for django 
from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import database_agent as db_agent
from http_responses import HttpResponseOK,HttpResponseInternalError,HttpResponseNotFound,HttpResponseForbidden
import random
import string
import json
import hashlib
#creating databaseAgent object for database communucation 
@csrf_exempt
def getHairDressers(request):
  if request.method == 'GET':
     hairdrs = db_agent.getAllHairDr()
     if not hairdrs:
        return HttpResponseInternalError()

     response = []
     for hairdr in hairdrs:
         response.append( {'username':hairdr.username,'email':hairdr.email,'firstName':hairdr.firstName,'lastName':hairdr.lastName,'location':hairdr.location,'phone':hairdr.phone,
         'workHours':{'start':hairdr.startHour,'end':hairdr.endHour},'description':hairdr.description})    
     
     return JsonResponse({'hairdressers':response})

  return HttpResponseForbidden()

@csrf_exempt
def login(request):
    if request.method == 'POST':
       body_unicode=request.body.decode("utf-8")
       request_body=json.loads(body_unicode)

       password = request_body['password']
       username = request_body['username']

       if(not db_agent.does_client_exist(username)):
            return HttpResponseForbidden()
       
       if(not db_agent.is_authenticated(username,password)):
            return HttpResponseForbidden()

       #implement jwt response to return on login 
       jwt_response = db_agent.jwt_user_encoding(username)
       print(jwt_response)
       if (not jwt_response):
           print("Error at jwt_login")
           return HttpResponseInternalError()
       return JsonResponse(jwt_response)
    else:
    	return HttpResponseForbidden()
      
