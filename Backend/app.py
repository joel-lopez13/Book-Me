from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

db = SQLAlchemy(app)


class Consumer(db.Model):
    id = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String(30))
    email = db.Column(db.String(50))
    address = db.Column(db.String(100))
    password = db.Column(db.String(30))
    date_created = db.Column(db.DateTime, default=datetime.now)

class Provider(db.Model):
    id = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String(30))
    email = db.Column(db.String(50))
    address = db.Column(db.String(100))
    password = db.Column(db.String(30))
    date_created = db.Column(db.DateTime, default=datetime.now)


@app.route('/<name>/<email>')
def index(name, email):
    consumer = Consumer(name = name, email = email)
    db.session.add(consumer)
    db.session.commit()

    return '<h1>Added new consumer</h1>'
