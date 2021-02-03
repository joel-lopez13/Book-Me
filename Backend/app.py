from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

db = SQLAlchemy(app)


class Consumer(db.Model):
    pk = db.Column(db.Integer, primary_key= True)  
    name = db.Column(db.String(30))
    email = db.Column(db.String(50))
    address = db.Column(db.String(100))
    password = db.Column(db.String(30))
    date_created = db.Column(db.DateTime, default=datetime.now)
    session_id = db.Column(db.Integer, default=12345)

# make class method that jsonifies everything

class Provider(db.Model):
    pk = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String(30))
    email = db.Column(db.String(50))
    address = db.Column(db.String(100))
    password = db.Column(db.String(30))
    date_created = db.Column(db.DateTime, default=datetime.now)


@app.route('/create', methods=["POST"])
def create_user():
    data = request.get_json()
    consumer = Consumer(name=data.get("username"), 
                        email=data.get("email"), 
                        password=data.get("password"))
    db.session.add(consumer)
    db.session.commit()

    return '<h1>Added new consumer</h1>' #make it return jsonify for both routes


@app.route('/login', methods=["POST"])
def login_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    consm = Consumer.query.filter_by(name=username, password=password).first() 
    if consm:
        print(consm.session_id)
        return jsonify({"session_id": consm.session_id,
                        "username": username})
    return jsonify({"session_id": None,
                        "username": ""}) 