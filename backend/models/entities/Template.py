from utils.DateFormat import DateFormat


class Template():

    def __init__(self, template_id, name=None, sql_template=None, definition=None, warehouse_type=None, version=None, created_at=None, updated_at=None, source_type=None, report_type=None, source_platform_type=None) -> None:
        self.template_id = template_id
        self.name = name
        self.sql_template = sql_template
        self.definition = definition
        self.warehouse_type = warehouse_type
        self.version = version
        self.created_at = created_at
        self.updated_at = updated_at
        self.source_type = source_type
        self.report_type = report_type
        self.source_platform_type = source_platform_type

    def to_JSON(self):
        return {
            'template_id': self.template_id,
            'name': self.name,
            'sql_template' : self.sql_template,
            'definition': self.definition,
            'warehouse_type': self.warehouse_type,
            'version' : self.version,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at,
            'source_type' : self.source_type,
            'report_type' : self.report_type,
            'source_platform_type' : self.source_platform_type
        }
