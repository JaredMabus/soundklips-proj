from flask_restful import fields
import sys, traceback
from smtplib import SMTPException
from sqlalchemy.exc import SQLAlchemyError

class Error_Resource(object):
    error_keys = {
        "errorMessage": fields.String}

    def __init__(self, err, *args):
        self.error = True
        self.errorMessage = str(err)
        self.error_type = type(err).__name__
        # self.error_info = traceback.format_tb(sys.exc_info()[-1],1)[0].strip()
        self.error_info = traceback.format_tb(sys.exc_info()[-1])

    def as_json(self):
        return self.__dict__
        
def error_type(err):
    if isinstance(err, (SMTPException)):
        return {"account_added_db": True, "email_err_message": type(err).__name__} , 500

    elif isinstance(err, SQLAlchemyError):
        return {"db_err_message": type(err).__name__}, 500 

    elif isinstance(err, BaseException):
        raise err
        return {"base_err_message": type(err).__name__}, 500
        
    else:  
        return {"err_message": 'uncaught error'}, 500
