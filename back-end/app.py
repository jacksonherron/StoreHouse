import os
import json

from flask import Flask, flash, request, redirect
from flask_login import LoginManager, current_user, login_user, logout_user
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))

# Setup Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.StoreHouse')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "thisismydeepestdarkestsecret"

# Init Database
db = SQLAlchemy(app)

# Init Marshmallow
marshmallow = Marshmallow(app)

# Init Flask Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Convert SQLAlchemy object to JSON (from Stack Overflow)
from sqlalchemy.ext.declarative import DeclarativeMeta


 ### ------------------ ROUTES ------------------ ###

@login_manager.user_loader
def load_user(id):
    from models import User
    return User.query.get(int(id))


@app.route('/')
def Welcome():
    return 'Welcome to StoreHouse DB'


@app.route('/register', methods=['POST'])
def register():
    from models import User
    if current_user.is_authenticated:
        return {"status": 400, "message": "Already logged in"}
    else:
        first_name = request.json['first_name']
        last_name = request.json['last_name']
        email = request.json['email']
        password = request.json['password']

        new_user = User.create_user(first_name, last_name, email, password)
        return new_user


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return {"status": 400, "message": "Already logged in"}
    else:
        from models import User
        email = request.json['email']
        password = request.json['password']
        
        user = User.login(email, password)
        return user


@app.route('/logout')
def logout():
    logout_user()
    return {"status": 200, "message": "Successfully logged out"}


@app.route('/user', methods=['GET'])
@app.route('/user/<user_id>', methods=['GET'])
def get_user(user_id=None):
    from models import User
    if user_id == None and request.method == 'GET':
        return User.get_users()
    return User.get_user(user_id)

@app.route('/property', methods=['POST','GET'])
@app.route('/property/<property_id>', methods=['GET'])
def get_or_create_property(property_id=None):
    from models import Property
    if property_id == None and request.method == 'GET':
        return Property.get_properties()
    elif property_id == None:
        property_name = request.json['property_name']
        address_line_1 = request.json['address_line_1']
        address_line_2 = request.json['address_line_2']
        address_line_3 = request.json['address_line_3']
        utility = request.json['utility']
        tariff = request.json['tariff']
        solar_system = request.json['solar_system']
        battery_system = request.json['battery_system']
        monthly_savings = request.json['monthly_savings']
        payback_period = request.json['payback_period']
        user_id = request.json['user_id']
        return Property.create_property(property_name, address_line_1, address_line_2, address_line_3, utility, tariff, solar_system, battery_system, monthly_savings, payback_period, user_id)
    else:
        return Property.get_property(property_id)


if __name__ == '__main__':
    app.run(debug=True, port=8000)