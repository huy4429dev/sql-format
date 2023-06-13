from marshmallow import Schema, fields, validate

class LogSchema(Schema):
    log_id = fields.UUID()
    table_name = fields.String(default='')
    record_id = fields.UUID()
    action = fields.String(default='')
    created_by = fields.String(default='')
    updated_by = fields.String(default='')

    class Meta:
        ordered = True