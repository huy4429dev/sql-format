from functools import wraps
from flask import session, jsonify

def admin_required(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        print(session)
        if session.get('status_admin') != True:
            return jsonify({'message': 'Admin authentication required.'}), 403
        return func(*args, **kwargs)
    return decorated_function