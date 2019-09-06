from app import db, marshmallow
from flask import jsonify
from datetime import datetime

# Subredit model
class Sub(db.Model):
    __table_args__  = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.String(300), nullable=False)
    # posts = db.relationship('Post', backref='sub', lazy=True)

    def __init__(self, name, description):
        self.name = name
        self.description = description
    
    @classmethod
    def create_sub(cls, name, description):
        new_sub = Sub(name, description)
        try:
            db.session.add(new_sub)
            db.session.commit()
        except:
            db.session.rollback()
            raise
        return sub_schema.jsonify(new_sub)
    
    @classmethod
    def get_subs(cls):
        subs = Sub.query.all()
        return subs_schema.jsonify(subs)

    @classmethod
    def get_sub(cls, sub_id):
        sub = Sub.query.get(sub_id)
        return sub_schema.jsonify(sub)

class SubSchema(marshmallow.Schema):
    class Meta:
        fields = ('id', 'name', 'description')

sub_schema = SubSchema()
subs_schema = SubSchema(many=True)


# Post Model Start
# id timestamp title text
class Post(db.Model):
    __table_args__  = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    title = db.Column(db.String(100), nullable=False)
    text = db.Column(db.String(300), nullable=False)
    sub = db.Column(db.Integer, db.ForeignKey('sub.id'), nullable=False)

    def __init__(self, title, text, sub):
        self.title = title
        self.text = text
        self.sub = sub

    @classmethod
    def create_post(cls, title, text, sub):
        new_post = Post(title, text, sub)
        try:
            db.session.add(new_post)
            db.session.commit()
        except:
            db.session.rollback()
            raise
        return post_schema.jsonify(new_post)
    
    @classmethod
    def get_posts(cls):
        posts = Post.query.all()
        return posts_schema.jsonify(posts)

    @classmethod
    def get_post(cls, post_id):
        sub = Sub.query.get(post_id)
        return post_schema.jsonify(post)


class PostSchema(marshmallow.Schema):
    class Meta:
        fields = ('id', 'timestamp', 'title', 'text', 'sub')

post_schema = PostSchema()
posts_schema = PostSchema(many=True)

## Create DB
if __name__ == 'models':
    db.create_all()