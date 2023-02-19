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

domain_authorization = Blueprint('domain_authorization', __name__)
engine = get_engine()
session = get_session(engine)

@domain_authorization.route('/authorization', methods =['POST'])
@token_required
def post_authorization(current_user):
    """
    Expected payload:
    headers
    x-access-token: customer token

    body
    {
        'domains': ['uber.com', ...]
    }
    :return:
    """
    session_id = get_session_id(request)
    user_id = session.query(User).filter_by(session_id=session_id).first().user_id
    domains = load_data(request)['domains']

    for domain in domains:
        company_id = session.query(Company).filter_by(domain=domain).first().company_id
        if session.query(Authorized).filter_by(user_id=user_id, company_id=company_id).first() is None:
            stmt = insert(Authorized).values(
                user_id=user_id,
                company_id=company_id)
            with engine.connect() as conn:
                result = conn.execute(stmt)
                conn.commit()
    return make_response(
        'Authorizations added', 201
    )

@domain_authorization.route('/authorization', methods =['GET'])
@token_required
def get_authorization(current_user):
    session_id = get_session_id(request)
    user_id = session.query(User).filter_by(session_id=session_id).first().user_id
    company_ids_result = session.query(Authorized.company_id, Authorized.user_id).filter_by(user_id=user_id).all()
    company_ids = [row[0] for row in company_ids_result]
    domains = list()
    for company_id in company_ids:
        domain = session.query(Company.domain, Company.company_id).filter_by(company_id=company_id).first()[0]
        domains.append(domain)

    return make_response(
        jsonify({'domains': domains}, 200)
    )

