from marshmallow import Schema, fields, validate

class RecipeSchema(Schema):
    recipe_id = fields.UUID()
    name = fields.Str(validate=validate.Length(max=50),default='')
    description = fields.String()
    image = fields.String()
    user_id = fields.String()
    version = fields.String()
    enabled = fields.Boolean(default=False)

    class Meta:
        ordered = True