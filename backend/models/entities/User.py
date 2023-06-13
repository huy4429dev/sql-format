from utils.DateFormat import DateFormat


class User():

    def __init__(self, user_id, email=None, password=None, role=None, status=None, status_admin=None, create_at=None, update_at=None) -> None:
        self.user_id = user_id
        self.email = email
        self.password = password
        self.role = role
        self.status = status
        self.status_admin = status_admin
        self.create_at = create_at
        self.update_at = update_at

    def to_JSON(self):
        return {
            'user_id': self.user_id,
            'email': self.email,
            'password': self.password,
            'role' : self.role,
            'status' : self.status,
            'status_admin': self.status_admin,
            'create_at' : self.create_at,
            'update_at': self.update_at,
        }
