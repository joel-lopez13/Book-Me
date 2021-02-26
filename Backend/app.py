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
    session_id = db.Column(db.Integer, default=12345)
    userType = db.Column(db.String(30))
    appointments = db.relationship('Transactions', backref='CnsmPK', lazy=True)

# make class method that jsonifies everything

class Provider(db.Model):
    pk = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String(30))
    email = db.Column(db.String(50))
    address = db.Column(db.String(100))
    password = db.Column(db.String(30))
    session_id = db.Column(db.Integer, default=12345)
    userType = db.Column(db.String(30))
    appointments = db.relationship('Transactions', backref='ProvPK', lazy=True)

class Transactions(db.Model):
    pk = db.Column(db.Integer, primary_key=True)
    cpk = db.Column(db.Integer, db.ForeignKey('consumer.pk'))
    ppk = db.Column(db.Integer, db.ForeignKey('provider.pk')) 
    appointment_date = db.Column(db.String(100))


@app.route('/create', methods=["POST"])
def create_user():
    data = request.get_json()
    userType = data.get("userType")
    if userType == "consumer":
        consumer = Consumer(name=data.get("username"), 
                            email=data.get("email"), 
                            password=data.get("password"),
                            userType=userType)
        db.session.add(consumer)
        db.session.commit()

        return  jsonify({"session_id": consumer.session_id ,
                        "username": consumer.name,
                        "userType": userType})

    provider = Provider(name=data.get("username"), 
                        email=data.get("email"), 
                        password=data.get("password"),
                        userType=userType)
    db.session.add(provider)
    db.session.commit()

    return  jsonify({"session_id": provider.session_id ,
                    "username": provider.name,
                    "userType": userType})


@app.route('/login', methods=["POST"])
def login_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    consm = Consumer.query.filter_by(name=username, password=password).first()
    prov = Provider.query.filter_by(name=username, password=password).first() 
    if consm:
        return jsonify({"session_id": consm.session_id,
                        "username": username,
                        "userType": consm.userType})
    elif prov:
        return jsonify({"session_id": prov.session_id,
                        "username": username,
                        "userType": prov.userType})
    return jsonify({"session_id": None,
                        "username": ""})


@app.route('/getProviders', methods=["GET"])
def get_providers():
    provs = Provider.query.all()
    provider_list = []
    for prov in provs:
        provider_list.append(prov.name)

    print(provider_list)

    return jsonify({"providers": provider_list})


@app.route('/createAppt', methods=["POST"])
def create_appt():
    data = request.get_json()
    cons = data.get("username")
    prov = data.get("provider")
    
    consumer = Consumer.query.filter_by(name=cons).first()
    provider = Provider.query.filter_by(name=prov).first()

    transaction = Transactions(cpk=consumer.pk,
                                ppk=provider.pk,
                                appointment_date=data.get("apptDate"))
    
    db.session.add(transaction)
    db.session.commit()
    
    return jsonify({}) 