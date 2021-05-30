# module that is responsible mainly with database communications
import json
import hashlib
import jwt
from account.models import Client,Hairdresser
from api.models import Appointment
#settings files for database communication 

file = "psql_settings.json"

#NOTE: don`t forget  when refering to variables in python class 
#NOTE: add more complex returns to HttpResponse 

def add_new_client(request_body,_salt):
  new_client = Client(username = request_body['username'],salt = _salt,password = request_body['password'],firstName = request_body['firstName'],
    lastName = request_body['lastName'],phone = request_body['phone'],email = request_body['email'])
  try:
     new_client.save()
     return True
  except:
     print("add_new_client error")
     return False

def add_new_hairdresser(request_body,_salt):
  new_hairdr = Hairdresser(username = request_body['username'],firstName= request_body['firstName'],salt = _salt ,email = request_body['email'],password = request_body['password'],
    lastName = request_body['lastName'],location = request_body['location'],phone = request_body['phone'],description = request_body['description'],
    startHour = request_body['workHours']['start'],endHour = request_body['workHours']['end'])
  try:
    new_hairdr.save()
    return True
  except:
    print("add_new_hairdresser error ")
    return False

def does_client_exist(_username):
  client_querry_set = Client.objects.filter(username = _username)
  if (client_querry_set.exists()):
     return True
  return False

def getAllHairDr():
  try:
    hairdr = Hairdresser.objects.all()
    print(hairdr)
    return hairdr
  except:
    return {}

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
  jwt_token = jwt.encode({"client_username":client.username,"client_id":client.id},"secret",algorithm="HS256")
  return {"id":client.id,"jwt_token":jwt_token}
