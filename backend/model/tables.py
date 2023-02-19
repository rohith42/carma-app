from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    password = Column(String)
    fullname = Column(String)
    email = Column(String, primary_key=True)
    session_id = Column(String, nullable=True)
    def __repr__(self):
        return str(self.user_id)

class Company(Base):
    __tablename__ = "companies"
    company_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, primary_key=True)
    domain = Column(String)
    def __repr__(self):
        return "<Company(name='%s)>" % (
            self.name
        )

class Authorized(Base):
    __tablename__ = "authorized"
    user_id = Column(Integer, ForeignKey(User.user_id), primary_key=True)
    company_id = Column(Integer, ForeignKey(Company.company_id), primary_key=True)
    user = relationship('User')
    company = relationship('Company')

class Trip(Base):
    __tablename__ = "trips"
    trip_id = Column(String, primary_key=True)  # make this just the email ID
    email = Column(String, ForeignKey(User.email))
    company_name = Column(Integer, ForeignKey(Company.name))
    trip_type = Column(String)
    emissions = Column(Float) # If negative, it's savings.
    date = Column(DateTime)
    redeemed = Column(Boolean, default=False)

    user = relationship('User')
    company = relationship('Company')
    def __repr__(self):
        return "<Trip(trip_id='%s)>" % (
            self.trip_id
        )

