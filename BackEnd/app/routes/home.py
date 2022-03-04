from flask import Blueprint, redirect

from app.models import SimplePerson, db

home_route = Blueprint('form_route', __name__, url_prefix='')

@home_route.route('/')
def home():
  
