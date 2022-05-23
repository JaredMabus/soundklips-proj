import configparser, os

try:
    conf = configparser.ConfigParser()

    try:
        conf.read(os.path.join(os.path.dirname(__file__), 'flask_config.ini')) # local dev config

    except:
        conf.read("/etc/app/flask_config.ini") # ser config

    class Config(object):
        SECRET_KEY = f"{conf['flask_prod']['SECRET_KEY']}"
        DEBUG = False
        TESTING = False
        # smtp mail config
        MAIL_SERVER = 'smtp.gmail.com'
        MAIL_PORT = 465
        MAIL_USE_TLS = False
        MAIL_USE_SSL = True
        MAIL_USERNAME = f"{conf['smtp_mail']['MAIL_USERNAME']}"
        MAIL_PASSWORD = f"{conf['smtp_mail']['MAIL_PASSWORD']}"
        # MAIL_DEBUG = app.debug
        # MAIL_DEFAULT_SENDER = None
        # MAIL_MAX_EMAILS =  None
        # MAIL_SUPPRESS_SEND = app.testing
        # MAIL_ASCII_ATTACHMENTS = False


    class ProdConfig(Config):
        SECRET_KEY = f"{conf['flask_prod']['SECRET_KEY']}"


    class DevConfig(Config):
        SECRET_KEY = f"{conf['flask_dev']['SECRET_KEY']}"
        DEBUG = True
        TESTING = True

except Exception as err:
    raise err

