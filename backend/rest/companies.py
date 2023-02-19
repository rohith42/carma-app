from util.crypto import *
from flask import Blueprint, request, jsonify, make_response
from sqlalchemy import insert, select
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from codalab.common import *
from model.tables import *
from util.db import *
from util.rest import *
import json

companies = Blueprint('companies', __name__)
engine = get_engine()
session = get_session(engine)

@companies.route('/company/domains', methods =['GET'])
def domains():
    query = select([Company.c.domain])
    domains_result = engine.execute(query).all()
    domains = [row[0] for row in domains_result]

    return make_response(
        jsonify({'domains': domains}), 200
    )