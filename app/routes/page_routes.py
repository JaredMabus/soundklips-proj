# Flask Page Routes
from flask import Blueprint, render_template

page_routes_bp = Blueprint('page_routes_pg', __name__)


# Redirects trafic to react build index.html "..\soundklips_react\build" 
@page_routes_bp.route('/', defaults={'path': ''})
@page_routes_bp.route('/<path:path>')
def catch_all(path):
    return render_template("index.html", header="soundklips")
