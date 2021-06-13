from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import database_agent as db_agent
from  http_responses import HttpResponseOK,HttpResponseInternalError,HttpResponseNotFound,HttpResponseForbidden
import json
import hashlib
