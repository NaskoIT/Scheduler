#file contains custom http responses for Djnago
from django.http import HttpResponse

class HttpResponseOK(HttpResponse):
      status_code = 200

class HttpResponseInternalError(HttpResponse):
     # content = "Database Error"
      status_code = 500

class HttpResponseNotFound(HttpResponse):
      status_code = 404

class HttpResponseForbidden(HttpResponse):
      status_code = 403
