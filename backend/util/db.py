from common import *
from model.tables import *
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

def init_db(engine):
    Base.metadata.create_all(engine)

def get_engine():
    return create_engine(DATABASE_ENGINE_STRING, echo=True)

def get_session(engine):
    Session = sessionmaker(bind=engine)
    return Session()