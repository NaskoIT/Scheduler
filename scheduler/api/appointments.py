from default_request_imports import * 
from jwt_misc import isAuthorized,extractJwt

@csrf_exempt
def addAppointment(request):
    
    if not isAuthorized(request):
       print("error")
       return HttpResponseForbidden()

    if request.method == 'POST':

       body_unicode = request.body.decode('utf-8')
       request_body = json.loads(body_unicode)

       client_id  = extractJwt(request)['client_id']

       if db_agent.doesAppointmentExist(client_id, request_body):
       	  return HttpResponseForbidden()

       if not db_agent.addAppointment(client_id,request_body):
       	  return HttpResponseInternalError()
       
       return HttpResponseOK()
    return HttpResponseForbidden()

@csrf_exempt
def getAppointments():
    pass
