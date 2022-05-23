# auth.py is the library for any auth functionality
from flask import request
import jwt, json
from werkzeug.security import generate_password_hash, check_password_hash
from app.api.error_handling import Error_Resource

def hash_password(password):
  hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
  return hashed_password


def verify_password(hash_password, password):
  return check_password_hash(hash_password, password)


def create_jwt(payload_data):
  try: 
    from app.app import app
    secret_key = app.config["SECRET_KEY"]
    
    token = jwt.encode(
      payload= payload_data,
      key= secret_key
    )
    
    return token

  except Exception as err:
    return str(err)


# def decode_token(f):
#   def wrapper(*args, **kwargs):
#     try:
#       return f(*args, **kwargs)

#     except Exception as err:
#       print(err)

#   return wrapper


def check_token(f):
  from app.app import app
  def wrapper(*args, **kwargs):
    try:
      try:
        data = request.get_json()
        token = data['token']
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"]) 
        
        return f(payload = payload)

      except KeyError as err:
        return Error_Resource(err).as_json(), 403

    except TypeError as err:
      try:
        data = json.loads(request.form.get('data'))
        token = data['token']
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"]) 
        
        return f(payload = payload)

      except KeyError as err:
        raise err
        return Error_Resource(err,err).as_json(), 403
    
    except Exception as err:
      # raise err
      return Error_Resource(err).as_json(), 403
      
  wrapper.__name__ = f.__name__
  return wrapper
