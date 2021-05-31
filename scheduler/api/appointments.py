from default_request_imports import * 
from jwt_misc import isAuthorized,extractJwt
from default_params import DEFAULT_CHANGE_APPOINTMENT_REQ_SIZE,DEFAULT_STATUS_VALUES
@csrf_exempt
def changeAppointmentStatus(request):
    if not isAuthorized(request):
       return HttpResponseForbidden()

    if request.method == 'POST':

       if not db_agent.doesHairdresserExistById(extractJwt(request)['client_id']):
          return HttpResponseForbidden()

       body_unicode = request.body.decode('utf-8')
       request_body = json.loads(body_unicode)

       
       if len(request_body) != DEFAULT_CHANGE_APPOINTMENT_REQ_SIZE:
          return HttpResponseForbidden()

       if not request_body['id'] or not request_body['status']:
          return HttpResponseForbidden()
       
       status = request_body['status'].lower()
       print(DEFAULT_STATUS_VALUES[status])
       if not db_agent.changeDBAppointmentStatus(request_body['id'],DEFAULT_STATUS_VALUES[status]):
          return HttpResponseInternalError()

       return HttpResponseOK()

    return HttpResponseForbidden()

@csrf_exempt
def addAppointment(request):
    
    if not isAuthorized(request):
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
