from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    user_id = fields.UUID()
    email = fields.Email()
    password = fields.String(default='')
    role = fields.String(default='')
    status = fields.Integer(default=0)
    status_admin = fields.Boolean(default=False)

    class Meta:
        ordered = True  