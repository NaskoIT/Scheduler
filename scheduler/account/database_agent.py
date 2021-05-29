# module that is responsible mainly with database communications
import json
import hashlib
import jwt
from .models import Client
#settings files for database communication 

file = "psql_settings.json"

#NOTE: don`t forget  when refering to variables in python class 
#NOTE: add more complex returns to HttpResponse 

def add_new_client(_username,_hashed_password,_salt):
  new_client = Client(username=_username,password=_hashed_password,salt=_salt)
  try:
     new_client.save()
     return True
  except:
     print("add_new_client error")
     return False

def does_client_exist(_username):
  client_querry_set = Client.objects.filter(username = _username)
  if (client_querry_set.exists()):
     return True
  return False

def is_authenticated(_username,_password):

  client = Client.objects.get(username=_username)
  hashed_password = client.salt + _password
  hashed_password = hashlib.sha256(hashed_password.encode("utf-8")).hexdigest()

  if (client.password == hashed_password):
     return True
  print("Error at is_authenticated")
  return False

def jwt_user_encoding(_username):
  try:
     client = Client.objects.get(username=_username)
  except:
     return False

  # ADD DIFFERENT SECRET IN FUTURE  // SUGGEST RSA KEY
  jwt_token = jwt.encode({"username":client.username,"password":client.password},"secret",algorithm="HS256").decode("utf-8")
  return {"id":client.id,"jwt_token":jwt_token}
