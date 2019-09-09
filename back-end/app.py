import os

from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))

# Setup Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.StoreHouse')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init Database
db = SQLAlchemy(app)

# Init Marshmallow
marshmallow = Marshmallow(app)

DEBUG = True
PORT = 8000

@app.route('/')
def hello_world():
    return 'Welcome to StoreHouse DB'

@app.route('/user', methods=['POST', 'GET'])
@app.route('/user/<user_id>', methods=['GET'])
def get_or_create_user(user_id=None):
    from models import User
    if user_id == None and request.method == 'GET':
        return User.get_users()
    elif user_id == None:
        first_name = request.json['first_name']
        last_name = request.json['last_name']
        email = request.json['email']
        password = request.json['password']
        return User.create_user(first_name, last_name, email, password)
    else:
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
    app.run(debug=DEBUG, port=PORT)