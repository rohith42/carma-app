from rest.companies import *
from rest.domain_authorization import *
from rest.users import *
from rest.trips import *
from util.db import *

"""Create Flask object"""
app = Flask(__name__)
app.register_blueprint(companies)
app.register_blueprint(domain_authorization)
app.register_blueprint(users)
app.register_blueprint(trips)

"""Init DB"""
engine = get_engine()
session = get_session(engine)
init_db(engine)

if __name__ == "__main__":
	# setting debug to True enables hot reload
	# and also provides a debugger shell
	# if you hit an error while running the server
	app.run(debug = True, host='0.0.0.0', port='4444')
