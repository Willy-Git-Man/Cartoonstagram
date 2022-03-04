from flask import Flask
from flask_migrate import Migrate
from app.routes.simple import form_route
from app.config import Configuration
from app.models import db

app = Flask(__name__)
app.config.from_object(Configuration)
app.register_blueprint(home_route)
db.init_app(app)
Migrate(app,db)
