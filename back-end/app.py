import os
import json

from flask import Flask, flash, request, redirect, jsonify
from flask_login import LoginManager, current_user, login_user, logout_user
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask import jsonify


app = Flask(__name__)
CORS(app, supports_credentials=True)

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

# Exception class
class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, errors: list=[], status_code=None, payload=None):
        Exception.__init__(self)
        self.errors = errors
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        res = dict(self.payload or ())
        res['errors'] = self.errors
        return res

 ### ------------------ ROUTES ------------------ ###

@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

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
        try:
            new_user = User.create_user(first_name, last_name, email, password)
        except:
            raise InvalidUsage(["Account could not be created. Please try again."])
        return new_user


@app.route('/login', methods=['GET', 'POST'])
def login():
    from models import User
    email = request.json['email']
    password = request.json['password']
    authenticated_user = User.login(email, password)

    if authenticated_user is None:
        raise InvalidUsage(["The email and password do not match a record. Please try again."])
    return authenticated_user


@app.route('/logout', methods=['GET'])
def logout():
    logout_user()
    return {"status": 200, "message": "Successfully logged out"}


@app.route('/user', methods=['GET'])
@app.route('/user/<user_id>', methods=['GET', 'DELETE'])
def get_or_delete_user(user_id=None):
    from models import User
    if user_id == None and request.method == 'GET':
        return User.get_users()
    elif request.method == 'GET':
        return User.get_user(user_id)
    logout_user()
    try:
        confirmation = User.delete_user(user_id)
    except:
        raise InvalidUsage('Something went wrong please try again.')
    return confirmation

@app.route('/specify', methods=['POST'])
def create_property():
    from models import Property
    property_name = request.json['property_name']
    address_line_1 = request.json['address_line_1']
    address_line_2 = request.json['address_line_2']
    city = request.json['city']
    zipcode = request.json['zipcode']
    utility = request.json['utility']
    tariff = request.json['tariff']
    month_1_usage = request.json['month_1_usage']
    month_2_usage = request.json['month_2_usage']
    month_3_usage = request.json['month_3_usage']
    solar_system_kw = request.json['solar_system_kw']
    solar_system_dir = request.json['solar_system_dir']
    solar_system_tilt = request.json['solar_system_tilt']
    battery_system = request.json['battery_system']
    monthly_savings = request.json['monthly_savings']
    payback_period = request.json['payback_period']
    user_id = request.json['user_id']
    return Property.create_property(property_name, address_line_1, address_line_2, city, zipcode, utility, tariff, month_1_usage, month_2_usage, month_3_usage, solar_system_kw, solar_system_dir, solar_system_tilt, battery_system, monthly_savings, payback_period, user_id)

@app.route('/property', methods=['GET'])
@app.route('/property/<property_id>', methods=['GET'])
def get_property(property_id=None):
    from models import Property
    if property_id == None:
        user_id = request.args.get('user_id')
        if user_id == None:
            return Property.get_properties()
        return Property.get_user_properties(user_id)
    return Property.get_property(property_id)


if __name__ == '__main__':
    app.run(debug=True, port=8000)