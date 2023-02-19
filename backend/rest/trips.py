from util.crypto import *
from flask import Blueprint, request, jsonify, make_response
from sqlalchemy import insert, select, update
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from codalab.common import *
from model.tables import *
from util.db import *
from util.rest import *
import json

trips = Blueprint('trips', __name__)
engine = get_engine()
session = get_session(engine)

@trips.route('/trip', methods =['POST'])
@token_required
def add_trip(current_user):
    """
    Expected payload:
    headers
    x-access-token: customer token

    body
    {
        'email_id': 'adfadfadsf
        'company_domain': '@noreply.uber.com',
        'emissions': 35.8,
        'date': '25 feb 2023 5:09 PM',
        'trip_type': 'uberx'
    }
    :return:
    """
    data = load_data(request)
    session_id = get_session_id(request)
    email = session.query(User).filter_by(session_id=session_id).first().email

    company_domain = data['company_domain']
    company_name = session.query(Company).filter_by(domain=company_domain).first().name

    try:
        stmt = insert(Trip).values(
            trip_id=data['email_id'],
            email=email,
            company_name=company_name,
            emissions=data['emissions'],
            date=datetime.datetime.strptime(data['date'], "%d %b %Y %H:%M:%S"),
            trip_type=data['trip_type']
        )
        with engine.connect() as conn:
            result = conn.execute(stmt)
            conn.commit()
        return make_response(
            'Trip added', 201
        )
    except Exception as e:
        return make_response(
            'No trip needed', 200
        )


@trips.route('/trip', methods =['GET'])
@token_required
def trips_for_user(current_user):
    session_id = get_session_id(request)
    email = session.query(User).filter_by(session_id=session_id).first().email

    result_rows = session.query(Trip).filter_by(email=email).all()
    print(result_rows)
    trips = [row.__dict__ for row in result_rows]
    for trip in trips:
        if '_sa_instance_state' in trip:
            del trip['_sa_instance_state']
    print(trips)

    return make_response(
        jsonify(trips), 200
    )

@trips.route('/trip/redeem', methods =['POST'])
@token_required
def redeem(current_user):
    """
    Expected payload:
    headers
    x-access-token: customer token

    body
    {
        'trip_ids': [...list of ids...]
    }
    :return:
    """
    session_id = get_session_id(request)
    email = session.query(User).filter_by(session_id=session_id).first().email

    trip_ids = load_data(request)['trip_ids']
    redeemed_trip_ids = list()
    for trip_id in trip_ids:
        stmt = (
            update(Trip).
            where(Trip.c.trip_id == trip_id and Trip.c.email == email).
                values(redeemed=True)
        )
        try:
            with engine.connect() as conn:
                result = conn.execute(stmt)
                conn.commit()
            redeemed_trip_ids.append(trip_id)
        except Exception as e:
            print(e)

    return make_response(
        f'Trips {redeemed_trip_ids} redeemed', 200
    )

