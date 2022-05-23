from app.app import app, mail, db
from flask import url_for
from flask_mail import Message
import jwt, time
# AUTH
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from app.utils.auth import hash_password, verify_password, create_jwt
# MODELS
from app.model.model import NewAccount, Account, Base, AudioData, VW_AudioData

# hash token
s = URLSafeTimedSerializer(app.config['SECRET_KEY']) 


def login(request_email, request_password):
  try:
    account = db().query(Account).filter_by(email = request_email).first()
    correct_password = verify_password(account.__dict__['password'],request_password) 
    
    if correct_password == True and account.confirm_email == True:
      data = {"login_success":True, 'account_id': account.account_id, 'email':request_email}
      token = jwt.encode(data, app.config['SECRET_KEY'])
      data["token"] = token
      
      return data

    elif correct_password == True and account.confirm_email == False:
      return {"login_success":False, "errorMessage": "confirm_email"}

    else: 
      return {"login_success":False}
    
  except Exception as err:
    # raise err
    return {"login_success":False}

  finally: 
    db.remove()

  
def create_account(ad):
  try:
    db()
    db.add(ad)
    db.commit()

    try: 
      send_email_token_link(ad)
    
    except Exception as email_err:
      raise email_err

  except Exception as err:
    db.rollback()
    raise err
    
  finally: 
    db.remove()


def send_email_token_link(ad):
  try:
    if isinstance(ad, (Base)): 
      token = s.dumps(ad.email)
      msg = Message('Sound Klips Confirm Email', 
          sender='soundklips@gmail.com', 
          recipients= [ad.email])

    elif isinstance(ad, (dict)): 
      token = s.dumps(ad['email'])
      msg = Message('Sound Klips Confirm Email', 
          sender='soundklips@gmail.com', 
          recipients= [ad.email])

    elif isinstance(ad, (str)):
      token = s.dumps(ad)
      msg = Message('Confirm Account', 
          sender='soundklips@gmail.com', 
          recipients= [ad])
    
    link = url_for('account_bp.confirm_email', token=token)
    msg.html = f"""
    <html>
      <body>
        <table style ='width: 75%';>
          <tr>
            <td>
              <h3>Start making music with Sound Klips!</h3>
            </td>
          </tr>
          <tr>
            <td>
              <h4>Click here to <a href='https://soundklips.com{link}'>Confirm Account</a></h4>
            </td>
          </tr>
        </table>
      </body>
    </html>
    """

    mail.send(msg)
    return True

  except Exception as err:
    raise err
  

def confirm_email_token(email_decoded):
  try:
    db().query(Account).filter_by(email = email_decoded).update({"confirm_email": True})
    db.commit()

    return True

  except Exception as err:
    raise err
  
  finally:
    db.remove()
