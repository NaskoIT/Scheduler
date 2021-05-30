
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import database_agent as db_agent
from  http_responses import HttpResponseOK,HttpResponseInternalError,HttpResponseNotFound,HttpResponseForbidden
import random
import string
import json
import hashlib

def password_salt():
   letters = string.ascii_letters
   salt = ''
   for i in range(10):
       salt = salt + random.choice(letters)
   return salt

@csrf_exempt
def register(request):
    if request.method == 'POST':
       body_unicode = request.body.decode('utf-8')
       request_body= json.loads(body_unicode) # dict object
       if(db_agent.does_client_exist(request_body['username'])):
          return HttpResponseForbidden()
       
       hash_salt = password_salt()
       hashed_password = hash_salt + request_body['password']
       request_body['password'] = hashlib.sha256(hashed_password.encode("utf-8")).hexdigest()

       if(not db_agent.add_new_hairdresser(request_body,hash_salt)):
          return HttpResponseForbidden()
       return HttpResponseOK()

    return HttpResponseForbidden();

