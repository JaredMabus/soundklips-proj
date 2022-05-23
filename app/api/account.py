from flask import Blueprint, request, jsonify, json, url_for, redirect
from flask_cors import CORS, cross_origin
from flask_restful import Resource, fields, marshal_with
from app.app import app, mail, api
from flask_mail import Message
from app.model.model import NewAccount, Account
from app.utils.auth import hash_password, check_token
from app.api.logic import account_logic
import uuid, os, re, inspect, time, jwt
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
# Error Handling Classes
from app.api.error_handling import error_type, Error_Resource


# instantiate api app
account_bp = Blueprint('account_bp', __name__)
cors = CORS(account_bp, resources={r"/api/*":{"origins":r"*"}})

# hash token (could be moved?)
s = URLSafeTimedSerializer(app.config['SECRET_KEY'])


class Private_Test(Resource):
    # @marshal_with(Error_Resource.error_keys)
    @check_token
    def post(self, *args, **kwargs):
        try:
            # r = request.get_json()
            data = {}
            print(args[0])
            data['private_data'] = "This is private data"
            data['email'] = args[0]['email']
            return str(args[0]), 200 

        except Exception as err:
            return Error_Resource(err), 500

api.add_resource(Private_Test, "/api/private-rest")

@account_bp.route("/api/login", methods=['POST'])
def login():
    try:
        r = request.get_json()
        ad = Account(email=r['email'], password = r['password'] )

        data = account_logic.login(ad.email, ad.password)

        if data['login_success'] == True:
            return {"token": data['token']}, 200

        elif data['login_success'] == False and 'errorMessage' in data: 
            # Account owner needs to confirm email
            if data['errorMessage'] == 'confirm_email': 
                return {'errorMessage': 'confirm_email', 'email': ad.email}, 500
            else:
                return {'errorMessage': 'server_error'}, 500
        else:
            return {'errorMessage': 'Incorrect Email or Password'}, 404
  
    except Exception as err:
        raise err
        return error_type(err)


@account_bp.route("/api/create-account", methods=['POST'])
def create_account():
    # time.sleep(5)
    try:
        r = request.get_json()
        ad = NewAccount(
            account_id = str(uuid.uuid4()),
            email = r['email'], 
            password = r['password'])

        ad.password = hash_password(ad.password)

        account_logic.create_account(ad) # Add to db and send confirm email

        return {"confirm_email_sent": True}, 200
           
    except Exception as err:
        return error_type(err)
            

@account_bp.route('/api/confirm-email/<token>', methods=['GET','POST'])
def confirm_email(token):
    try:
        try:
            email_decoded = s.loads(token, max_age=1800)

            account_logic.confirm_email_token(email_decoded) 
            return redirect("/login", code=301) 

        except SignatureExpired as err:
            raise err
            return {'message': 'Token Expired'}, 400

    except Exception as err:
        raise err
        return {'message': str(err)}, 400


@account_bp.route("/api/resend-confirm-email", methods=['POST'])
def resend_confirm_email(*args, **kwargs):
    try:
        r = request.get_json()

        account_logic.send_email_token_link(r)

        return {"confirm_email_sent": True}, 200

    except Exception as err:
        return error_type(err)
        # raise err


# @account_bp.route('/api/test-email', methods=['POST'])
# def test_email(*args, **kwargs):
#     r = request.get_json()

#     ad = NewAccount(
#         account_id = str(uuid.uuid4()),
#         email = r['email'], 
#         password = r['password'], 
#         first_name = r['first_name'], 
#         last_name = r['last_name'])

#     token = s.dumps(ad['email'])

#     msg = Message('Confirm Email', 
#         sender='welfareinfo101@gmail.com', 
#         recipients= ad.email.split())

#     link = url_for('https://soundklips.com/account_bp.confirm_email', token=token)

#     msg.body = 'Your link is: {}'.format(link)

#     mail.send(msg)

#     return {'email': ad.email ,'token': token} 


@account_bp.route('/api/login_token', methods=['POST'])
def login_token(*args, **kwargs):
    try:
        payload_data = {
            "email":"secret@test.com "
        }

        jwt_token = jwt.encode(payload_data, key= app.config["SECRET_KEY"])

        return jwt_token, 200
    
    except Exception as err:
        return str(err), 404


@account_bp.route('/api/private-url', methods=['POST'])
@check_token
def private_url(*args, **kwargs):
    try:
        kwargs['payload']['private_data'] = 'Private Data'
        return kwargs['payload'], 200
        
    except Exception as err:
        return str(err), 404


if __name__ == "__main__":
    print(app.url_map)
    