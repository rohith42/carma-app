from uuid import uuid4

def generate_session_id():
    return str(uuid4().int)
