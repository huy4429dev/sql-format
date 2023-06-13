from flask import Blueprint, jsonify, request, session
import uuid
import json
from models.Schema.UserSchema import UserSchema
# Entities
from models.entities.User import User
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from google.auth.transport import requests
# Models

from models.UserModel import UserModel
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import timedelta
import datetime as dt
from flask import current_app as app

main = Blueprint('user_blueprint', __name__)


@main.route('/')
def get_users():
    try:
        page = int(request.args.get('page', 1))
        page_size = int(request.args.get('page_size', 10))
        email = request.args.get('email', '')
        user_id = request.args.get('user_id', '')
        role = request.args.get('role', '')
        if 'username' in session:
            username = session['username']
            print(username)
        skip = (page - 1) * page_size
        
        results, total_items, total_pages = UserModel.get_users(skip, page_size, email, user_id, role)
        
        return jsonify({
            'data': results,
            'pagination': {
                'page': page,
                'page_size': page_size,
                'total_records': total_items,
                'total_pages': total_pages
            }
        })
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/<id>')
def get_user(id):
    try:
        user = UserModel.get_user(id)
        if user != None:
            return jsonify(user)
        else:
            return jsonify({}), 404
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/add', methods=['POST'])
def add_user():
    try:
        data = json.loads(request.data)
        data = UserSchema().load(data)
        if(UserModel.check_verify_email(data['email']) == False):
            return jsonify({'message': "has been value email"}), 300
        
        user_id = uuid.uuid4()
        user = User(str(user_id), data['email'], generate_password_hash(data['password']), data['role'], data['status'], bool(data['status_admin']))
        affected_rows = UserModel.add_user(user)

        if affected_rows == 1:
            return jsonify(user.user_id)
        else:
            return jsonify({'message': "Error on insert"}), 500

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/update/<user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = json.loads(request.data)
        data = UserSchema().load(data)
        password = ''
        if data['password'] != '':
            password = generate_password_hash(data['password'])
        else:
            existing_user = UserModel.get_user(user_id)
            password = str(existing_user['password'])
        
        user = User(user_id, data['email'], password, data['role'], data['status'], bool(data['status_admin']))

        affected_rows = UserModel.update_user(user)

        if affected_rows == 1:
            return jsonify(user.user_id)
        else:
            return jsonify({'message': "No user updated"}), 404

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/delete/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = User(user_id)
        affected_rows = UserModel.delete_user(user)
        if affected_rows == 1:
            return jsonify(user.user_id)
        else:
            return jsonify({'message': "No user deleted"}), 404

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/login', methods=['POST'])
def login():
    try:
        data = json.loads(request.data)
        email = data['email']
        password = data['password']

        user = UserModel.get_user_by_email(email,password)
        key = 'mysecretkey'
        if user is None:
            return jsonify({'message': 'Invalid email or password.'}), 401

        if check_password_hash(user.password, password):
            payload = {
                'sub': user.user_id,
                'exp': dt.datetime.utcnow() + timedelta(minutes=30)
            }
            token = jwt.encode(payload, key, algorithm='HS256')
            session['status_admin']=user.status_admin
            return jsonify({'token': token,'id':user.user_id, 'status_admin':user.status_admin, 'status':user.status})
        return jsonify({'message': 'Invalid email or password.'}), 401

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/register', methods=['POST'])
def register_user():
    try:
        data = json.loads(request.data)
        if(UserModel.check_verify_email(data['email']) == False):
            return jsonify({'message': "has been value email"}), 300
        data = UserSchema().load(data)
        data['status'] = 2
        data['status_admin'] = False
        
        user_id = uuid.uuid4()
        user = User(str(user_id), data['email'], generate_password_hash(data['password']),data['role'],data['status'],data['status_admin'])
        affected_rows = UserModel.add_user(user)

        if affected_rows == 1:
            return jsonify(user.user_id)
        else:
            return jsonify({'message': "Error on insert"}), 500

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/logout', methods=['GET'])
def logout():
    try:
        session.pop('user_id', None)
        session.pop('role', None)
        return jsonify({'message': "Logged out successfully!"})

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
@main.route('/getRoleName')
def get_Role_Name():
    try:
        result = UserModel.get_Role_Name()
        return jsonify({
            'data': result,
        })
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/verify_google_token', methods=['POST'])
def verify_google_token():
    token = json.loads(request.data)
    try:
        token_info = id_token.verify_token(token['token'], requests.Request())
        key = 'mysecretkey'
        user_id = token_info['sub']
        email = token_info['email']
        affected_rows = []
        if(UserModel.check_verify_email(email) == True):
            user_id = uuid.uuid4()
            user = User(str(user_id), email, '','', 2, False)
            affected_rows = UserModel.register_user(user)
        else:
            affected_rows = UserModel.get_user_email(email)
            
        payload = {
            'sub': affected_rows['user_id'],
            'exp': dt.datetime.utcnow() + timedelta(minutes=30)
        }
        token = jwt.encode(payload, key, algorithm='HS256')
        session['username'] = affected_rows['user_id']
        print(session)
        return jsonify({'status': 'success', 'user_id': affected_rows['user_id'], 'email': affected_rows['email'], 'token': token, 'status': affected_rows['status'], 'status_admin': affected_rows['status_admin']})
    except ValueError:
        # Invalid token
        return jsonify({'status': 'error', 'message': 'Invalid token'}), 40

@main.route('/delete_multiple', methods=['DELETE'])
def delete_multiple():
    try:
        data = request.get_json()
        ids = data.get('ids', [])
        affected_rows = UserModel.delete_multiple_user(ids)
        
        response = {
            'message': f'Successfully deleted {affected_rows} rows.'
        }
        
        return response, 200
    except Exception as ex:
        response = {
            'error': str(ex)
        }
        
        return response, 500