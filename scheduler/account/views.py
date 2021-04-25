# main view file for django 
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import account.database_agent as db_agent
from .http_responses import HttpResponseOK,HttpResponseInternalError,HttpResponseNotFound,HttpResponseForbidden
import random
import string
import hashlib
from .models import Client
#creating databaseAgent object for database communucation 
#@csrf_exempt
def password_salt():
   letters = string.ascii_letters
   salt = ''
   for i in range(10):
       salt = salt + random.choice(letters)
   return salt

#NOTE: Add seperate registering function for Hair dressers and normal users
@csrf_exempt
def register(request):
    if request.method == 'POST':
       
        username = request.POST.get('username',default=None)
        password = request.POST.get('password',default=None)
 
        hash_salt = password_salt()
        hashed_password  = hash_salt + password
        #hashed_password = hashlib.md5(hashed_password.encode("utf-8")).hexdigest() 
        hashed_password = hashlib.sha256(hashed_password.encode("utf-8")).hexdigest()
        if(db_agent.does_client_exist(username)):
          return HttpResponseForbidden()
        if(not db_agent.add_new_client(username,hashed_password,hash_salt)):
          return HttpResponseInternalError()
        return HttpResponseOK()
    else:
    	return HttpResponseForbidden()
           
@csrf_exempt
def login(request):
    if request.method == 'POST':
       username = request.POST.get('username',default=None)
       password = request.POST.get('password',default=None)
       
       if(not db_agent.does_client_exist(username) or not db_agent.is_authenticated(username,password)):
          return HttpResponseForbidden()

       #implement jwt response to return on login 
       jwt_response = db_agent.jwt_user_encoding(username)
       if (not jwt_response):
           print("Error at jwt_login")
           return HttpResponseInternalError()
       return JsonResponse(jwt_response)
    else:
    	return HttpResponseForbidden()
      
