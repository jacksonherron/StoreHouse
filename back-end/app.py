import os

from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))

# Setup Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.reddit')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init Database
db = SQLAlchemy(app)

# Init Marshmallow
marshmallow = Marshmallow(app)

DEBUG = True
PORT = 8000

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/sub', methods=['POST', 'GET'])
@app.route('/sub/<subid>', methods=['GET'])
def get_or_create_sub(subid=None):
    from models import Sub
    if subid == None and request.method == 'GET':
        return Sub.get_subs()
    elif subid == None:
        name = request.json['name']
        description = request.json['description']
        return Sub.create_sub(name, description)
    else:
        return Sub.get_sub(subid)
    
@app.route('/post', methods=['POST','GET'])
@app.route('/post/<postid>', methods=['GET'])
def get_or_create_post(postid=None):
    from models import Post
    if postid == None and request.method == 'GET':
        return Post.get_posts()
    elif postid == None:
        title = request.json['title']
        text = request.json['text']
        sub = request.json['sub']
        return Post.create_post(title, text, sub)
    else:
        return Post.get_post(postid)


if __name__ == '__main__':
    app.run(debug=DEBUG, port=PORT)