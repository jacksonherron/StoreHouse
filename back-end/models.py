from app import db, marshmallow, login_manager, InvalidUsage
from flask import jsonify
from sqlalchemy.orm import validates
from datetime import datetime
from flask_login import UserMixin, current_user, login_user
from werkzeug.security import generate_password_hash, check_password_hash


##################### USER MODEL #####################

class User(db.Model, UserMixin):
    __table_args__  = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name  = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password_hash = db.Column(db.String(100), nullable=False)
    properties = db.relationship('Property', backref='user', lazy=True, cascade="all, delete")

    @validates('email')
    def validate_email(self, key, address):
        assert '@' in address
        return address

    @validates('first_name', 'last_name', 'password_hash')
    def validate_name(self, key, value):
        assert value != ''
        return value

    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.set_password(password)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @classmethod
    def login(cls, email, password):
        user = User.query.filter_by(email=email).first()
        if user is None or not user.check_password(password):
            return None
        login_user(user)
        return user_schema.jsonify(user)

    @classmethod
    def create_user(cls, first_name, last_name, email, password):
        new_user = User(first_name, last_name, email, password)
        try:
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user)
        except:
            db.session.rollback()
            raise
        return user_schema.jsonify(new_user)
    
    @classmethod
    def get_users(cls):
        users = User.query.all()
        return users_schema.jsonify(users)

    @classmethod
    def get_user(cls, user_id):
        user = User.query.get(user_id)
        return user_schema.jsonify(user)

    @classmethod
    def delete_user(cls, user_id):
        user = User.query.get(user_id)
        try:
            db.session.delete(user)
            db.session.commit()
        except:
            db.session.rollback()
            raise
        return {"status": 200, "message": "Account succesfully deleted"}

class UserSchema(marshmallow.Schema):
    class Meta:
        fields = ('id', 'first_name', 'last_name', 'email', 'password_hash')

user_schema = UserSchema()
users_schema = UserSchema(many=True)


##################### POSTS MODEL #####################

class Property(db.Model):
    __table_args__  = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    property_name = db.Column(db.String(300), nullable=False)
    address_line_1 = db.Column(db.String(300), nullable=False)
    address_line_2 = db.Column(db.String(300), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    zipcode = db.Column(db.String(100), nullable=False)
    provider_account_id = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    customer_class = db.Column(db.String(100), nullable=False)
    utility = db.Column(db.String(300), nullable=True)
    tariff = db.Column(db.String(100), nullable=True)
    month_1_usage = db.Column(db.String(100), nullable=True)
    month_2_usage = db.Column(db.String(100), nullable=True)
    month_3_usage = db.Column(db.String(100), nullable=True)
    electricity_profile_id = db.Column(db.String(100), nullable=True)
    solar_system_kw = db.Column(db.String(100), nullable=True)
    solar_system_dir = db.Column(db.String(100), nullable=True)
    solar_system_tilt = db.Column(db.String(100), nullable=True)
    solar_profile_id = db.Column(db.String(100), nullable=True)
    storage_power_kw = db.Column(db.String(100), nullable=True)
    storage_capacity_kwh = db.Column(db.String(100), nullable=True)
    storage_profile_id = db.Column(db.String(100), nullable=True)
    solar_system_cost = db.Column(db.Float, nullable=True)
    storage_system_cost = db.Column(db.Float, nullable=True)
    monthly_savings = db.Column(db.Float, nullable=True)
    payback_period = db.Column(db.Float, nullable=True)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self, property_name, address_line_1, address_line_2, city, zipcode, provider_account_id, user_id, customer_class):
        self.property_name = property_name
        self.address_line_1 = address_line_1
        self.address_line_2 = address_line_2
        self.city = city
        self.zipcode = zipcode
        self.provider_account_id = provider_account_id
        self.user_id = user_id
        self.customer_class = customer_class

    @classmethod
    def create_property(cls, property_name, address_line_1, address_line_2, city, zipcode, provider_account_id, user_id, customer_class):
        new_property = Property(property_name, address_line_1, address_line_2, city, zipcode, provider_account_id, user_id, customer_class)
        try:
            db.session.add(new_property)
            db.session.commit()
        except:
            db.session.rollback()
            raise
        return property_schema.jsonify(new_property)
    
    @classmethod
    def set_utility(cls, provider_account_id, value):
        found_property = Property.query.filter_by(provider_account_id=provider_account_id).first()
        found_property.utility = value
        try: 
            db.session.add(found_property)
            db.session.commit()
        except:
            db.session.rollback()
            raise
        return property_schema.jsonify(found_property)

    @classmethod
    def set_tariff(cls, provider_account_id, value):
        found_property = Property.query.filter_by(provider_account_id=provider_account_id).first()
        found_property.tariff = value
        try: 
            db.session.add(found_property)
            db.session.commit()
        except:
            db.session.rollback()
            raise
        return property_schema.jsonify(found_property)

    @classmethod
    def set_electricity_profile(cls, provider_account_id, month_1_usage, month_2_usage, month_3_usage, electricity_profile_id):
        found_property = Property.query.filter_by(provider_account_id=provider_account_id).first()
        found_property.month_1_usage = month_1_usage
        found_property.month_2_usage = month_2_usage
        found_property.month_3_usage = month_3_usage
        found_property.electricity_profile_id = electricity_profile_id
        try: 
            db.session.add(found_property)
            db.session.commit()
        except:
            db.session.rollback()
            raise
        return property_schema.jsonify(found_property)

    @classmethod
    def set_solar_profile(cls, provider_account_id, solar_system_dir, solar_system_kw, solar_system_tilt, solar_profile_id):
        found_property = Property.query.filter_by(provider_account_id=provider_account_id).first()
        found_property.solar_system_kw = solar_system_kw
        found_property.solar_system_dir = solar_system_dir
        found_property.solar_system_tilt = solar_system_tilt
        found_property.solar_profile_id = solar_profile_id
        try:
            db.session.add(found_property)
            db.session.commit()
        except:
            db.session.rollback()
            raise
        return property_schema.jsonify(found_property)

    @classmethod
    def set_storage_profile(cls, provider_account_id, storage_power_kw, storage_capacity_kwh, storage_profile_id):
        found_property = Property.query.filter_by(provider_account_id=provider_account_id).first()
        found_property.storage_power_kw = storage_power_kw
        found_property.storage_capacity_kwh = storage_capacity_kwh
        found_property.storage_profile_id = storage_profile_id
        try:
            db.session.add(found_property)
            db.session.commit()
        except:
            db.session.rollback()
            raise
        return found_property

    @classmethod
    def set_savings_profile(cls, provider_account_id, solar_system_cost, storage_system_cost, monthly_savings, payback_period):
        found_property = Property.query.filter_by(provider_account_id=provider_account_id).first()
        found_property.solar_system_cost = solar_system_cost
        found_property.storage_system_cost = storage_system_cost
        found_property.monthly_savings = monthly_savings
        found_property.payback_period = payback_period
        try:
            db.session.add(found_property)
            db.session.commit()
        except:
            db.session.rollback()
            raise
        return property_schema.jsonify(found_property)

    @classmethod
    def get_properties(cls):
        found_properties = Property.query.all()
        return properties_schema.jsonify(found_properties)

    @classmethod
    def get_user_properties(cls, user_id):
        found_properties = Property.query.filter(Property.user_id == user_id)
        return properties_schema.jsonify(found_properties)

    @classmethod
    def get_property(cls, property_id):
        found_property = Property.query.get(property_id)
        return property_schema.jsonify(found_property)

    
class PropertySchema(marshmallow.Schema):
    class Meta:
        fields = ('property_name', 'address_line_1', 'address_line_2', 'city', 'zipcode', 'provider_account_id', 'user_id', 'customer_class', 'utility', 'tariff', 'month_1_usage', 'month_2_usage', 'month_3_usage', 'electricity_profile_id', 'solar_system_kw', 'solar_system_dir', 'solar_system_tilt', 'solar_profile_id', 'storage_capacity_kwh', 'storage_power_kw', 'storage_profile_id', 'solar_system_cost', 'storage_system_cost', 'monthly_savings', 'payback_period', 'timestamp')

property_schema = PropertySchema()
properties_schema = PropertySchema(many=True)

## Create DB
if __name__ == 'models':
    db.create_all()