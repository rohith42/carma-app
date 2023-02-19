# flask imports
from flask import Flask, request, jsonify, make_response
import jwt
import json

from functools import wraps
from util.db import *
from model.tables import *

engine = get_engine()
session = get_session(engine)

# decorator for verifying the JWT
def token_required(f):
	@wraps(f)
	def decorated(*args, **kwargs):
		token = None
		# jwt is passed in the request header
		if 'x-access-token' in request.headers:
			token = request.headers['x-access-token']
		# return 401 if token is not passed
		if not token:
			print("0-951-0341IJROPAIJFPOIJDFKF[1023U4I0-921340-912834not token")
			return jsonify({'message' : 'Valid JWT token is required.'}), 401

		try:
			# decoding the payload to fetch the stored details
			print(token)
			print("waazzzzzaaaaaa")
			data = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ENCODE_ALGO])
			print(data)
			current_user = session.query(User).filter_by(session_id = data['session_id']).first()
		except Exception as e:
			print("0-951-0341IJROPAIJFPOIJDFKF[1023U4I0-921340-912834EXCEPTIONNNNN")
			print(e)
			return jsonify({
				'message' : 'Invalid JWT token.'
			}), 401
		# returns the current logged in users context to the routes
		print("RETURNING!!!")
		return f(current_user, *args, **kwargs)

	return decorated

def load_data(request):
	return json.loads(request.get_data().decode())

def get_session_id(request):
	if 'x-access-token' in request.headers:
		token = request.headers['x-access-token']
		data = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ENCODE_ALGO])
		return data['session_id']

def get_column_from_request(request, column):
	session_id = get_session_id(request)
	with engine.connect() as conn:
		result = conn.execute([column]).filter_by(session_id=session_id).first()[0]
	return result