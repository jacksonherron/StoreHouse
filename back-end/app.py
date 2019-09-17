import os
import json
from functools import wraps
from flask import Flask, flash, request, redirect, jsonify
from flask_login import LoginManager, current_user, login_user, logout_user
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

# Init Flask
app = Flask(__name__)
CORS(app, supports_credentials=True)

# Configure Database
basedir = os.path.abspath(os.path.dirname(__file__))
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


# Custom exception class
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

# Login required
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if current_user.is_authenticated:
            return f(*args, **kwargs)
        else:
            raise InvalidUsage(["You must be logged in to access this route."])
    return wrap

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
@login_required
def logout():
    logout_user()
    return {"status": 200, "message": "Successfully logged out"}


@app.route('/user', methods=['GET'])
@app.route('/user/<user_id>', methods=['GET', 'DELETE'])
@login_required
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

@app.route('/specify/<step>', methods=['POST', 'GET'])
@login_required
def create_property(step=None):
    # Import DB
    from models import Property
    # Import Genability Interface
    from services.genability import GenabilityApiInterface, auth
    GenabilityInterface = GenabilityApiInterface(auth["app_id"], auth["app_key"])

    if step is not None:
        if step == "1":
            property_name = request.json['property_name']
            address_line_1 = request.json['address_line_1']
            address_line_2 = request.json['address_line_2']
            city = request.json['city']
            zipcode = request.json['zipcode']
            customer_class = request.json['customer_class']
            user_id = request.json['user_id']
            ### Create a genability account
            new_account = GenabilityInterface.create_account(
                account_name = property_name,
                address1 = address_line_1,
                address2 = address_line_2,
                city = city,
                zipcode = zipcode,
                country="US",
                customer_class=customer_class,
            )
            # new_account = GenabilityInterface.get_account(providerAccountId='49546fc5-7101-42d6-8ab4-539f855b4918')
            account = json.loads(new_account)
            provider_account_id = account["results"][0]["providerAccountId"]
            ### Store account information in the local database
            Property.create_property(property_name, address_line_1, address_line_2, city, zipcode, provider_account_id, user_id, customer_class)
            ### Retrieve and return utilities associated with the account
            utilities = GenabilityInterface.get_utilities('94103')
            return ({"provider_account_id": provider_account_id, "utilities": utilities})

        if step == "2":
            provider_account_id = request.json['provider_account_id']
            lseId = request.json['lseId']
            ### UpdateGenability and the local db
            GenabilityInterface.set_utility(providerAccountId=provider_account_id, lseId=lseId)
            Property.set_utility(provider_account_id=provider_account_id, value=lseId)
            ### Retrieve and return tariffs associated with the account
            tariffs = GenabilityInterface.get_tariffs(providerAccountId=provider_account_id)
            return tariffs

        if step == "3":
            provider_account_id = request.json['provider_account_id']
            master_tariff_id = request.json['master_tariff_id']
            ### Update Genability and the local db
            response = GenabilityInterface.set_tariff(providerAccountId=provider_account_id, masterTariffId=master_tariff_id)
            Property.set_tariff(provider_account_id=provider_account_id, value=master_tariff_id)
            return response

        if step == "4":
            provider_account_id = request.json['provider_account_id']
            month_1_usage = request.json['month_1_usage']
            month_2_usage = request.json['month_2_usage']
            month_3_usage = request.json['month_3_usage']
            ### Update Genability and the local db
            response = GenabilityInterface.create_electricity_profile(providerAccountId=provider_account_id, bill_1=month_1_usage, bill_2=month_2_usage, bill_3=month_3_usage)
            data = json.loads(response)
            electricity_profile_id = data["results"][0]["providerProfileId"]
            Property.set_electricity_profile(provider_account_id, month_1_usage, month_2_usage, month_3_usage, electricity_profile_id)
            return response

        if step == "5":
            provider_account_id = request.json['provider_account_id']
            solar_system_kw = request.json['solar_system_kw']
            solar_system_dir = request.json['solar_system_dir']
            solar_system_tilt = request.json['solar_system_tilt']
            # Update Genability and the local db
            response = GenabilityInterface.create_solar_profile(provider_account_id, solar_system_dir, solar_system_kw, solar_system_tilt)
            data = json.loads(response)
            solar_profile_id = data["results"][0]["providerProfileId"]
            Property.set_solar_profile(provider_account_id, solar_system_dir, solar_system_kw, solar_system_tilt, solar_profile_id)
            return response

        if step == "6":
            # Select the battery system specifications [power (kw), capacity (kWh)
            storage_specifications = {
                '0': ['No storage', 'No storage'],
                '1': ['5', '10'],
                '2': ['5', '13.5'],
                '3': ['10', '20'],
                '4': ['10', '27'],
                '5': ['20', '50'],
                '6': ['40', '120'],
                '7': ['60', '240']
            }
            provider_account_id = request.json['provider_account_id']
            storage_system = request.json["storage_system"]
            storage_power_kw = storage_specifications[storage_system][0]
            storage_capacity_kwh = storage_specifications[storage_system][1]
            storage_profile_id = f'{provider_account_id}-storage'
            edited_property = Property.set_storage_profile(provider_account_id, storage_power_kw, storage_capacity_kwh, storage_profile_id)
            # Retrieve the electricity 8760 data and create a template for storage data
            e_response = GenabilityInterface.get_electricity_profile(edited_property.electricity_profile_id)
            e_data = json.loads(e_response)
            electricity_profile = []
            storage_profile = []
            for hour in e_data["results"][0]["intervals"]["list"]:
                electricity_profile.append(hour["kWh"]["quantityAmount"])
                storage_profile.append({ "fromDateTime" : hour["fromDateTime"],
                    "quantityUnit" : "kWh",
                    "quantityValue" : '',
                    "toDateTime" : hour["toDateTime"]
                })
            # Retrieve the solar 8760 data
            s_response = GenabilityInterface.get_solar_profile(edited_property.solar_profile_id)
            s_data = json.loads(s_response)
            solar_profile = []
            for hour in s_data["results"][0]["baselineMeasures"]:
                solar_profile.append(hour["v"])
            # Call the OSESMO to return the 8760 data for storage
            from services.osesmo import main
            if storage_system != '0':
                # Solar plus storage
                [storage_profile_data, storage_installed_cost, solar_installed_cost] = main(electricity_profile, solar_profile, edited_property.customer_class, float(edited_property.solar_system_kw), float(edited_property.storage_power_kw), float(edited_property.storage_capacity_kwh))
                # Send the storage profile to Genability
                for i in range(len(storage_profile)):
                    storage_profile[i]["quantityValue"] = str(-1*storage_profile_data[i])
                GenabilityInterface.set_storage_profile(storage_profile, provider_account_id, storage_profile_id)
                # Analyze the solar plus torage savings using Genability analysis endpoint
                response = GenabilityInterface.analyze_solar_plus_storage(provider_account_id, edited_property.tariff, edited_property.customer_class, edited_property.electricity_profile_id, edited_property.solar_profile_id, edited_property.storage_profile_id )
            else:
                # Solar only
                customer_class_dict = {
                    "residential": "Residential",
                    "commercial": "Commercial and Industrial"
                }
                customer_class = customer_class_dict[edited_property.customer_class]
                from services.OSESMO.Solar_Installed_Cost_per_kW_Calculator import Solar_Installed_Cost_per_kW_Calculator
                storage_installed_cost = 0.0
                solar_installed_cost = Solar_Installed_Cost_per_kW_Calculator(customer_class, float(edited_property.solar_system_kw))
                # Analyze the solar savings using Genability analysis endpoint
                response = GenabilityInterface.analyze_solar(provider_account_id, edited_property.tariff, edited_property.customer_class, edited_property.electricity_profile_id, edited_property.solar_profile_id)
            data = json.loads(response)
            yearly_savings = float(data["results"][0]["summary"]["netAvoidedCost"])
            monthly_savings = yearly_savings / 12
            payback_period = (storage_installed_cost + solar_installed_cost) / yearly_savings
            # Save the reuslts to the local db
            finished_property = Property.set_savings_profile(provider_account_id, solar_installed_cost, storage_installed_cost, monthly_savings, payback_period)
            return finished_property

@app.route('/property', methods=['GET'])
@app.route('/property/<property_id>', methods=['GET'])
@login_required
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