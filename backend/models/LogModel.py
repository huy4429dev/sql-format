from database.db import get_connection
from .entities.Log import Log
import uuid
from datetime import date

class LogModel():
    @classmethod
    def add_log(self, log):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO log (log_id, table_name, record_id, action, created_at, created_by, updated_at, updated_by) 
                                VALUES (%s, %s, %s, %s, %s, %s)""", (log.log_id, log.table_name, log.record_id, log.action, log.created_at, log.created_by, log.updated_at, log.updated_by))
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)