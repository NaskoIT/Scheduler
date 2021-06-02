# module that is responsible for database communications
from account.models import Client,Hairdresser
from api.models import Appointment
import hashlib
import string
import random
import json
import jwt


file = "psql_settings.json"
# creating 10 character salt for password hashing 
def password_salt():
  
   letters = string.ascii_letters
   salt = ''
   for i in range(10):
       salt = salt + random.choice(letters)
   return salt
#NOTE: don`t forget  when refering to variables in python class 
#NOTE: add more complex returns to HttpResponse 

def addNewClient(request_body,_salt):
  new_client = Client(username = request_body['username'],salt = _salt,password = request_body['password'],firstName = request_body['firstName'],
    lastName = request_body['lastName'],phone = request_body['phone'],email = request_body['email'])
  try:
     new_client.save()
     return True
  except:
     print("addNewClient error")
     return False

def addHairdresser(request_body,_salt):
  new_hairdr = Hairdresser(username = request_body['username'],firstName= request_body['firstName'],salt = _salt ,email = request_body['email'],password = request_body['password'],
    lastName = request_body['lastName'],location = request_body['location'],phone = request_body['phone'],description = request_body['description'],
    startHour = request_body['workHours']['start'],endHour = request_body['workHours']['end'])
  try:
    new_hairdr.save()
    return True
  except:
    print("add_new_hairdresser error ")
    return False

def doesHairdresserExistById(_id):
    try:
        hairdr_querry =  Hairdresser.objects.filter(id = _id)
        if hairdr_querry.exists():
           return True
        return False
    except:
    	return False

def doesClientExist(_username):
  try:
    client_querry_set = Client.objects.filter(username = _username)
    if (client_querry_set.exists()):
       return True
    return False
  except:
    return False

def doesClientExistById(_client_id):
  try:
    client_querry_set = Client.objects.filter(id = _client_id)
    if (client_querry_set.exists()):
       return True
    return False
  except:
    return False

def getAllHairDr():
  try:
    hairdr = Hairdresser.objects.all()
    print(hairdr)
    return hairdr
  except:
    return {}

def doesAppointmentExist(_client_id,request_body):
    try:
      appointment = Appointment.objects.filter(hairdr_id = request_body['hairdr_id'],client_id = _client_id)

      if appointment.exists():
         return True
      return False
    except:
      print("error doesAppointmentExist")
      return False

def addAppointment(_client_id, request_body):
    try:
    	new_appointment = Appointment(client_id = _client_id,hairdr_id = request_body['hairdr_id'],
        startHour = request_body['start'],endHour = request_body['end'],date = request_body['date']) 
    except: 
        new_appointment = Appointment(client_id = _client_id,hairdr_id = request_body['hairdr_id'],
        startHour = request_body['start'],endHour = request_body['end']) 
      
      	
    try:  
      new_appointment.save()
      return True
    except:
      print(request_body['date'])
      return False

def changeDBAppointmentStatus(appo_id,appo_status):
	try:
	   appointment = Appointment.objects.get(id = appo_id)
	   appointment.status = appo_status
	   appointment.save()
	   return True
	except:
	   return False

def getAscAppointmentsById(_status,_hairdr_id):
    appointments_for_id = Appointment.objects.filter(hairdr_id = _hairdr_id).order_by('date')
    json_response_list = []

    for appointment in appointments_for_id:
      if appointment.status == _status:

        client_by_id = Client.objects.get(id = appointment.client_id)

       	json_response_list.append( {'id':appointment.id,'date':appointment.date,
       	'start':appointment.startHour,'end':appointment.endHour,
       	'user':{'username':client_by_id.username,'firstName':client_by_id.firstName,'lastName':client_by_id.lastName,
       	'phone':client_by_id.phone}})

    return json_response_list

def getAppointmentsByDate(_hairdr_id,_date):
  try:
    appointments = Appointment.objects.filter(hairdr_id = _hairdr_id,date=_date,status='ACCEPT').order_by('date')
    return appointments


def isAuthenticated(_username,_password):
  try:
    client = Client.objects.get(username=_username)
    hashed_password = client.salt + _password
    hashed_password = hashlib.sha256(hashed_password.encode("utf-8")).hexdigest()
  
    if (client.password == hashed_password):
       return True
    return False
  except:
    print("Error at isAuthenticated")
    return False

def jwtUserEncoding(_username):
  try:
     client = Client.objects.get(username=_username)
  except:
     return False

  # ADD DIFFERENT SECRET IN FUTURE  // SUGGEST RSA KEY
  jwt_token = jwt.encode({"client_username":client.username,"client_id":client.id},"secret",algorithm="HS256")
  return {"id":client.id,"jwt_token":jwt_token}