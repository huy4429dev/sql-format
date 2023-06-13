from database.db import get_connection_v2
from .entities.User import User
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


class UserModel():

    @classmethod
    def get_users(cls, skip, page_size, email, user_id, role):
        sql = "SELECT users.*,log.created_at as lastLogin FROM users left join log on users.user_id=log.record_id WHERE 1=1"
        params = []
        if email is not None and email != 'null':
            sql += " AND (email ILIKE %s OR email IS NULL OR email = 'null')"
            params.append(f"%{email}%")
        if user_id is not None and user_id != 'null':
            sql += " AND CAST(user_id AS text) ILIKE %s"
            params.append(f"%{user_id}%")
        if role is not None and role != 'null':
            sql += " AND role ILIKE %s"
            params.append(f"%{role}%")
        sql += f" ORDER BY user_id OFFSET {skip} LIMIT {page_size}"
        connection = get_connection_v2()
        cur = connection.cursor()
        cur.execute(sql, params)

        rows = cur.fetchall()

        results = []
        for row in rows:
            results.append({
                'user_id': row[0],
                'email': row[1],
                'role': row[3],
                'status': row[4],
                'status_admin': row[5],
                'created_at': row[6],
                'updated_at': row[7],
                'lastLogin': row[8],
            })

        cur.execute("SELECT count(*) FROM users WHERE 1=1", params)
        total_items = cur.fetchone()[0]

        total_pages = (total_items + page_size - 1)

        return results, total_items, total_pages


    @classmethod
    def get_user(self, user_id):
        try:
            connection = get_connection_v2()

            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM users WHERE user_id = %s", (user_id,))
                row = cursor.fetchone()

                print(row)
                user = None
                if row != None:
                    user = User(*row)
                    user = user.to_JSON()

            connection.close()
            return user
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def add_user(self, user):
        try:
            connection = get_connection_v2()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO users(user_id, email, password, role, status, status_admin, created_at) 
                                VALUES (%s, %s, %s, %s, %s, %s, %s)""", (user.user_id, user.email, user.password, user.role, user.status, user.status_admin, datetime.now()))
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def update_user(self, user):
        try:
            connection = get_connection_v2()

            with connection.cursor() as cursor:
                cursor.execute("""UPDATE users SET email = %s, password = %s, role = %s, status = %s, status_admin = %s, updated_at = %s
                                WHERE user_id = %s""", (user.email, user.password, user.role, user.status, user.status_admin, datetime.now(), user.user_id))
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def delete_user(self, user):
        try:
            connection = get_connection_v2()

            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM users WHERE user_id = %s", (user.user_id,))
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @staticmethod
    def get_user_by_email(email, password):
        try:
            connection = get_connection_v2()
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM users WHERE email=%s AND status !=1", (email,))
            row = cursor.fetchone()
            if row:
                user = User(*row)
                if check_password_hash(user.password, password):
                    log_id = uuid.uuid4()
                    action='LOGIN'
                    created_at = datetime.now()
                    cursor.execute("DELETE FROM log WHERE record_id = %s", (user.user_id,))
                    
                    cursor.execute("""INSERT INTO log (log_id, table_name, record_id, action, created_at) 
                                    VALUES (%s, %s, %s, %s, %s)""", (str(log_id), 'users', str(user.user_id), action, created_at))
                    connection.commit()
                    return user

            return None
        except Exception as ex:
            raise ex
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def check_verify_email(data):
        try:
            connection = get_connection_v2()
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM users WHERE email=%s", (data,))
            row = cursor.fetchone()
            if row:
                return False
            else:
                return True
        except Exception as ex:
            raise ex
        finally:
            cursor.close()
            connection.close()

    @classmethod
    def get_Role_Name(cls):
        try:
            
            connection = get_connection_v2()
            cursor = connection.cursor()
            cursor.execute("SELECT role FROM users WHERE 1=1")
            rows = cursor.fetchall()
            results = []
            for row in rows:
                role = row[0]
                found = False
                if row[0] is not None:
                    for result in results:
                        if result['role'] == role:
                            found = True
                            break
                    if not found:
                        results.append({
                            'role': role,
                        })

            return results
        except Exception as ex:
            raise ex
        finally:
            cursor.close()
            connection.close()

    @classmethod
    def register_user(self, user):
        try:
            connection = get_connection_v2()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO users(user_id, email, password, role, status, status_admin, created_at) 
                                VALUES (%s, %s, %s, %s, %s, %s, %s)""", (user.user_id, user.email, user.password, user.role, user.status, user.status_admin, datetime.now()))
                connection.commit()
                cursor.execute("""SELECT * FROM users
                                                WHERE user_id = %s""", (user.user_id,))
                row = cursor.fetchone()

                user = None
                if row != None:
                    user = User(*row)
                    log_id = uuid.uuid4()
                    action='LOGIN'
                    cursor.execute("DELETE FROM log WHERE record_id = %s", (user.user_id,))
                    cursor.execute("""INSERT INTO log (log_id, table_name, record_id, action, created_at) 
                                    VALUES (%s, %s, %s, %s, %s)""", (str(log_id), 'users', str(user.user_id), action, datetime.now()))
                    connection.commit()
                    
                    user = user.to_JSON()
            connection.close()
            return user
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_user_email(self, email):
        try:
            connection = get_connection_v2()

            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
                row = cursor.fetchone()

                user = None
                if row != None:
                    user = User(*row)
                    log_id = uuid.uuid4()
                    action = 'LOGIN'
                    
                    cursor.execute("DELETE FROM log WHERE record_id = %s", (user.user_id,))
                    cursor.execute("""INSERT INTO log (log_id, table_name, record_id, action, created_at) 
                                    VALUES (%s, %s, %s, %s, %s)""", (str(log_id), 'users', str(user.user_id), action, datetime.now()))
                    connection.commit()
                    
                    user = user.to_JSON()
            connection.close()
            return user
        except Exception as ex:
            raise Exception(ex)
    @classmethod
    def delete_multiple_user(cls, ids):
        try:
            connection = get_connection_v2()

            with connection.cursor() as cursor:
                user_ids = [str(uuid.UUID(id_)) for id_ in ids]
                placeholders = ', '.join(['%s'] * len(user_ids))
                sql = f"DELETE FROM users WHERE user_id IN ({placeholders})"
                cursor.execute(sql, tuple(user_ids))
                affected_rows = cursor.rowcount

                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)