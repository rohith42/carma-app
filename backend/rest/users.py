from util.crypto import *
from flask import Blueprint, request, jsonify, make_response
from sqlalchemy import insert
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from codalab.common import *
from model.tables import *
from util.db import *
from util.rest import *
import json

users = Blueprint('users', __name__)
engine = get_engine()
session = get_session(engine)

@users.route('/user/login', methods =['POST'])
def login():
	# creates dictionary of form data
	auth = load_data(request)

	if not auth or not auth.get('email') or not auth.get('password'):
		return make_response(
			'Email or password was not provided',
			401,
			{'WWW-Authenticate' : 'Basic realm ="Login required."'}
		)

	user = session.query(User).filter_by(email = auth.get('email')).first()

	if not user:
		# returns 401 if user does not exist
		return make_response(
			'Could not verify',
			401,
			{'WWW-Authenticate' : 'Basic realm ="User does not exist."'}
		)

	print(auth.get('email'))
	print(auth.get('password'))
	#if not check_password_hash(user.password, auth.get('password')):
	if not user.password == auth.get('password'):
		return make_response(
            'Incorrect username or password.',
            403,
            {'WWW-Authenticate': 'Basic realm ="Incorrect username or password"'}
        )

	if user.session_id:
		session_id = user.session_id
	else:
		session_id = generate_session_id()
	token = jwt.encode({
        'session_id': session_id
	}, JWT_SECRET, algorithm=JWT_ENCODE_ALGO)
	return make_response(jsonify({'token' : token}), 201)

# signup route
@users.route('/user/signup', methods =['POST'])
def signup():
	# creates a dictionary of the form data
	data = load_data(request)
	print(data)

	# gets name, email and password
	email, full_name = data.get('email'), data.get('full_name')
	password = data.get('password')
	print(email)
	print(full_name)
	print(password)
	if not email or not full_name or not password:
		return make_response(
			"Please provide in all necessary information.",
			202
		)

	# checking for existing user
	if session.query(User).filter_by(email=email).first() is not None:
		return make_response(
			"Account with that email already exists. Please log in or sign up with another email",
			202
		)

	session_id = generate_session_id()
	token = jwt.encode({
		'session_id': session_id
	}, JWT_SECRET, algorithm=JWT_ENCODE_ALGO)
	stmt = insert(User).values(
		session_id=session_id,
		email=email,
		password=password#generate_password_hash(password)
	)
	with engine.connect() as conn:
		result = conn.execute(stmt)
		conn.commit()

	return make_response(jsonify({'token': token}), 201)