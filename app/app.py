from flask import Flask
import app.config as config
from flask_restful import Api
from flask_mail import Mail
from sqlalchemy.orm import scoped_session
from app.model.database import SessionLocal


app = Flask(__name__, static_folder="../soundklips_react/build/static", template_folder="../soundklips_react/build")

# -- CONFIG -- #
if app.config["ENV"] == "production":
    app.config.from_object(config.ProdConfig)
else:
    app.config.from_object(config.DevConfig)

api = Api(app)
db = scoped_session(SessionLocal)
mail = Mail(app)
mail.init_app(app)


# IMPORT PAGE/API ROUTES from Flask Blueprint sub-modules
# Page Routes
from app.routes.page_routes import page_routes_bp
# API Routes
from app.api.account import account_bp
from app.api.audio_data import audio_data_bp


# REGISTER BLUEPRINT TO FLASK APP
app.register_blueprint(page_routes_bp)
# APIs
app.register_blueprint(account_bp)
app.register_blueprint(audio_data_bp)
