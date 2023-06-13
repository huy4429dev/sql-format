from utils.DateFormat import DateFormat


class Bridge():

    def __init__(self, recipe_id=None, template_id=None) -> None:
        self.recipe_id = recipe_id
        self.template_id = template_id

    def to_JSON(self):
        return {
            'recipe_id': self.recipe_id,
            'template_id': self.template_id,
            # 'released': DateFormat.convert_date(self.released)
        }
