from django.test import TestCase
from django.test import Client as djClient
import json
# Create your tests here.


 
# there is a naming convention change because it does not understand if it is a test or not 
class registerAndLoginTestCases(TestCase):
      def test_login(self):
          hairdr_json = {
                 "username": "uabnn",
                 "email": "test",
                 "password": "pass",
                 "firstName": "FN",
                 "lastName": "LN",
                 "location":  "some address",
                 "phone": "0871234567",
                 "workHours": {
                       "start": "9:00",
                       "end": "18:00"
                     },
                "description": "some decription about the haridresser"
          }

          new_djclient = djClient()
          new_djclient.post('/api/account/hairdresser/register',json.dumps(hairdr_json),content_type='application/json')

          login_body_json = {'username':'uabnn',
                             'password':'pass'
          }
          response = new_djclient.post('/api/account/login',json.dumps(login_body_json),content_type='application/json')

          self.assertEqual(response.status_code,200)

      def test_register_client(self):
          client_json = { 
                "username": "fas",
                "email": "test",   
                "password": "pass",
                "firstName": "FN",
                "lastName": "LN",
                "phone": "12415664"
          }

          new_client = djClient()
          response = new_client.post('/api/account/client/register',json.dumps(client_json),content_type='application/json')
          self.assertEqual(response.status_code,200)
          #second register forbidden
          sec_response = new_client.post('/api/account/client/register',json.dumps(client_json),content_type='application/json')
          self.assertEqual(sec_response.status_code,403)
          
      def test_register_hairdresser(self):
          hairdr_json = {
                 "username": "uabnn",
                 "email": "test",
                 "password": "pass",
                 "firstName": "FN",
                 "lastName": "LN",
                 "location":  "some address",
                 "phone": "0871234567",
                 "workHours": {
                       "start": "9:00",
                       "end": "18:00"
                     },
                "description": "some decription about the haridresser"
          }
          new_client = djClient()
          response = new_client.post('/api/account/hairdresser/register',json.dumps(hairdr_json),content_type='application/json')
          self.assertEqual(response.status_code,200)
          #second register forbidden
          sec_response = new_client.post('/api/account/hairdresser/register',json.dumps(hairdr_json),content_type='application/json')
          self.assertEqual(sec_response.status_code,403)



