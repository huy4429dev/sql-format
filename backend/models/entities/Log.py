from utils.DateFormat import DateFormat


class Log():

    def __init__(self, log_id=None, table_name=None, record_id=None, action=None, created_at=None, created_by=None, updated_at=None, updated_by=None) -> None:
        self.log_id = log_id
        self.table_name = table_name
        self.record_id = record_id
        self.action = action
        self.created_at = created_at
        self.created_by = created_by
        self.updated_at = updated_at
        self.updated_by = updated_by

    def to_JSON(self):
        return {
            'log_id': self.log_id,
            'table_name': self.table_name,
            'record_id': self.record_id,
            'action': self.action,
            'created_at': self.created_at,
            'created_by': self.created_by,
            'updated_at': self.updated_at,
            'updated_by': self.updated_by,
        }
