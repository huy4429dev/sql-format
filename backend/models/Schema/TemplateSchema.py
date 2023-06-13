from marshmallow import Schema, fields, validate

class TemplateSchema(Schema):
    template_id = fields.UUID()
    name = fields.Str(validate=validate.Length(max=50),default='')
    sql_template = fields.String(default='')
    definition = fields.Dict(default={})
    warehouse_type = fields.String(default='')
    version = fields.String(default='')
    enabled = fields.Boolean(default=False)
    source_type = fields.String(default='')
    report_type = fields.String(default='')
    source_platform_type = fields.String(default='')
    user_id = fields.String(default='')

    class Meta:
        ordered = True