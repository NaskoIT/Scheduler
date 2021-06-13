import datetime
from default_request_imports import * 
from jwt_misc import isAuthorized,extractJwt
from default_params import DEFAULT_CHANGE_APPOINTMENT_REQ_SIZE,DEFAULT_STATUS_VALUES,DEFAULT_HAIRCUT_DURATION

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

def generateTimeSlots(startHour, endHour):
    while startHour <= endHour:
        yield startHour.strftime('%H:%M')
        startHour = (datetime.datetime.combine(datetime.date.today(), startHour) +
             datetime.timedelta(minutes=DEFAULT_HAIRCUT_DURATION)).time()


def stringToEndTime(_string):
  date = datetime.datetime.strptime(_string, '%H:%M').time()
  return (datetime.datetime.combine(datetime.date.today(), date) +
             datetime.timedelta(minutes=DEFAULT_HAIRCUT_DURATION)).time()

@csrf_exempt
def getAppointments(request):
    if not isAuthorized(request):
      return HttpResponseForbidden()

    if request.method == 'GET':
      request_params = request.GET

    if len(request_params) != 2:
      return HttpResponseForbidden()

    hairdr_id = request_params['hairdresserId'].lower()
    hairdr = db_agent.getHairDrById(hairdr_id)
    
    startHour = hairdr.startHour
    endHour = hairdr.endHour

    #List of start hours for booked appointments - [startHourOfBookedApp]
    booked_appointments = []
    for appointment in db_agent.getAppointmentsByDate(hairdr_id,request_params['date']):
      booked_appointments.append(appointment.startHour.strftime('%H:%M'))
    
    timeSlots = list(generateTimeSlots(startHour,endHour))
    all_appointments = []

    for start_appo in timeSlots[:-1]:
      end_appo = stringToEndTime(start_appo).strftime('%H:%M')
      if start_appo not in booked_appointments:
        all_appointments.append( {'start':start_appo,'end':end_appo,'free':'true'})
      else:
        all_appointments.append( {'start':start_appo,'end':end_appo,'free':'false'})
    return JsonResponse({'all_appointments':all_appointments})