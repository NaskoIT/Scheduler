import jwt
import database_agent as db_agent

# extract and decode jwt token 
def extractJwt(request):
    try: 
       jwt_token = request.headers['Authorization']
       jwt_token = jwt_token[7:] # removing Bearer

       client_json = jwt.decode(jwt_token,"secret",algorithms = ["HS256"])
       return client_json;
    except:
       return None
       
#check if jwt is valid 
def isAuthorized(request):
    try:
        client_info = extractJwt(request)
        if not doesClientExist(client_info['client_id']):
          return False

        if client_info != None:
          return True
        return False
    except:
       return False

