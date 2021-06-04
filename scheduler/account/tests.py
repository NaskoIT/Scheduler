from django.test import TestCase
from django.test import Client as djClient
import json
# Create your tests here.


client_json = { 
                "username": "fas",
                "email": "test",   
                "password": "pass",
                "firstName": "FN",
                "lastName": "LN",
                "phone": "12415664"
          }
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

# there is a naming convention change because it does not understand if it is a test or not 
class requestingHairdressers(TestCase):
      def test_get_hairdressers(self):
          login_body_json = {'username':'fas',
                             'password':'pass'
          }
          #create client

          new_client = djClient()
          new_client.post('/api/account/client/register',json.dumps(client_json),content_type='application/json')
          # create hairdresser 
          
          new_client.post('/api/account/hairdresser/register',json.dumps(hairdr_json),content_type='application/json')
          #get jwt authorization token
          response = new_client.post('/api/account/login',json.dumps(login_body_json),content_type='application/json')
          response = response.content.decode('utf-8')
          response_jwt = json.loads(response)['jwt_token']

          auth_headers = {
                 'HTTP_AUTHORIZATION': 'Bearer ' + response_jwt
          }   
          all_hairdr_response = new_client.get('/api/account/hairdressers',**auth_headers)
          self.assertEqual(all_hairdr_response.status_code,200)



class registerAndLoginTestCases(TestCase):
      def test_login(self):
          
          new_djclient = djClient()
          new_djclient.post('/api/account/hairdresser/register',json.dumps(hairdr_json),content_type='application/json')

          login_body_json = {'username':'uabnn',
                             'password':'pass'
          }
          response = new_djclient.post('/api/account/login',json.dumps(login_body_json),content_type='application/json')

          self.assertEqual(response.status_code,200)

      def test_register_client(self):
          

          new_client = djClient()
          response = new_client.post('/api/account/client/register',json.dumps(client_json),content_type='application/json')
          self.assertEqual(response.status_code,200)
          #second register forbidden
          sec_response = new_client.post('/api/account/client/register',json.dumps(client_json),content_type='application/json')
          self.assertEqual(sec_response.status_code,403)
          
      def test_register_hairdresser(self):
      
          new_client = djClient()
          response = new_client.post('/api/account/hairdresser/register',json.dumps(hairdr_json),content_type='application/json')
          self.assertEqual(response.status_code,200)
          #second register forbidden
          sec_response = new_client.post('/api/account/hairdresser/register',json.dumps(hairdr_json),content_type='application/json')
          self.assertEqual(sec_response.status_code,403)



