from app import db, marshmallow
from flask import jsonify
from datetime import datetime
from flask_login import UserMixin


##################### USER MODEL #####################

class User(db.Model, UserMixin):
    __table_args__  = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name  = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    properties = db.relationship('Property', backref='user', lazy=True)

    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password

    @classmethod
    def create_user(cls, first_name, last_name, email, password):
        new_user = User(first_name, last_name, email, password)
        try:
            db.session.add(new_user)
            db.session.commit()
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

class UserSchema(marshmallow.Schema):
    class Meta:
        fields = ('id', 'first_name', 'last_name', 'email', 'password')

user_email_table = {u.email: u for u in users}
userid_table = {u.id: u for u in users}
user_schema = UserSchema()
users_schema = UserSchema(many=True)



##################### POSTS MODEL #####################

class Property(db.Model):
    __table_args__  = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    property_name = db.Column(db.String(300), nullable=False)
    address_line_1 = db.Column(db.String(300), nullable=False)
    address_line_2 = db.Column(db.String(300), nullable=False)
    address_line_3 = db.Column(db.String(300), nullable=False)
    utility = db.Column(db.String(300), nullable=False)
    tariff = db.Column(db.String(300), nullable=False)
    solar_system = db.Column(db.String(300), nullable=False)
    battery_system = db.Column(db.String(300), nullable=False)
    monthly_savings = db.Column(db.Float, nullable=False)
    payback_period = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self, property_name, address_line_1, address_line_2, address_line_3, utility, tariff, solar_system, battery_system, monthly_savings, payback_period, user_id):
        self.property_name = property_name
        self.address_line_1 = address_line_1
        self.address_line_2 = address_line_2
        self.address_line_3 = address_line_3
        self.utility = utility
        self.tariff = tariff
        self.solar_system = solar_system
        self.battery_system = battery_system
        self.monthly_savings = monthly_savings
        self.payback_period = payback_period
        self.user_id = user_id

    @classmethod
    def create_property(cls, property_name, address_line_1, address_line_2, address_line_3, utility, tariff, solar_system, battery_system, monthly_savings, payback_period, user_id):
        new_property = Property(property_name, address_line_1, address_line_2, address_line_3, utility, tariff, solar_system, battery_system, monthly_savings, payback_period, user_id)
        try:
            db.session.add(new_property)
            db.session.commit()
        except:
            db.session.rollback()
            raise
        return property_schema.jsonify(new_property)
    
    @classmethod
    def get_properties(cls):
        found_properties = Property.query.all()
        return properties_schema.jsonify(found_properties)

    @classmethod
    def get_property(cls, property_id):
        found_property = Property.query.get(property_id)
        return property_schema.jsonify(found_property)


class PropertySchema(marshmallow.Schema):
    class Meta:
        fields = ('property_name', 'address_line_1', 'address_line_2', 'address_line_3', 'utility', 'tariff', 'solar_system', 'battery_system', 'monthly_savings', 'payback_period', 'user_id', 'timestamp')

property_schema = PropertySchema()
properties_schema = PropertySchema(many=True)

## Create DB
if __name__ == 'models':
    db.create_all()