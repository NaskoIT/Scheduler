from default_request_imports import *
from jwt_misc import isAuthorized,extractJwt
from default_params import DEFAULT_STATUS_VALUES
def register(request):
    if request.method == 'POST':
       body_unicode = request.body.decode('utf-8')
       request_body= json.loads(body_unicode) # dict object
       if(db_agent.doesClientExist(request_body['username'])):
          return HttpResponseForbidden()
       
       hash_salt = db_agent.password_salt()
       hashed_password = hash_salt + request_body['password']
       request_body['password'] = hashlib.sha256(hashed_password.encode("utf-8")).hexdigest()

       if(not db_agent.addHairdresser(request_body,hash_salt)):
          return HttpResponseForbidden()
       return HttpResponseOK()

    return HttpResponseForbidden();

def getAppointments(request):
    if not isAuthorized(request):
       return HttpResponseForbidden()

    if request.method == 'GET':
       request_params = request.GET 
       
       if len(request_params) != 1:
       	  return HttpResponseForbidden()
       
       status = request_params['status'].lower()

       if status not in DEFAULT_STATUS_VALUES.keys():
       	  return HttpResponseForbidden()
       #get hairdresser id 
       hairdr_id = extractJwt(request)['client_id']

       #create function for finding those requests in database agent
       appointments_list = db_agent.getAscAppointmentsById(DEFAULT_STATUS_VALUES[status],hairdr_id)
       # return Json responses 
       #check if appointments is none 	
       if appointments_list == None:
       	  return HttpResponseForbidden()
       return JsonResponse({'appointments':appointments_list})
