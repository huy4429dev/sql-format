from marshmallow import Schema, fields, validate

class BridgeSchema(Schema):
    recipe_id = fields.UUID()
    template_id = fields.UUID()

    class Meta:
        ordered = True