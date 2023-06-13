from utils.DateFormat import DateFormat


class Recipe():

    def __init__(self, recipe_id, name=None, description=None, image=None,version=None, enabled=None, created_at=None, updated_at=None) -> None:
        self.recipe_id = recipe_id
        self.name = name
        self.description = description
        self.image = image
        self.version = version
        self.created_at = created_at
        self.updated_at = updated_at
        self.enabled = enabled                                              

    def to_JSON(self):
        return {
            'recipe_id': self.recipe_id,
            'name': self.name,
            'description' : self.description,
            'image' : self.image,
            'version' : self.version,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at,
            'enabled' : self.enabled
        }
