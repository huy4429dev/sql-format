import json
from database.db import get_connection_v2
from database.db import get_connection
from .entities.Template import Template
import uuid
from datetime import datetime

class TemplateModel():

    @classmethod
    def get_templates(cls, skip, page_size, name=None, warehouse_type=None, version=None,template_id=None,sort=None):
        sql = "SELECT * FROM template WHERE 1=1"
        params = []
        if name is not None and name != 'null':
            sql += " AND (name ILIKE %s OR name IS NULL OR name = 'null')"
            params.append(f"%{name}%")
        if warehouse_type is not None and warehouse_type != 'null':
            sql += " AND warehouse_type ILIKE %s"
            params.append(f"%{warehouse_type}%")
        if version is not None and version != 'null':
            sql += " AND version ILIKE %s"
            params.append(f"%{version}%")
        if template_id is not None and template_id != 'null':
            sql += " AND CAST(template_id AS text) ILIKE %s"
            params.append(f"%{template_id}%")
        if sort is not None and sort != 'null': 
            for attribute_name in sort:
                sql += f" ORDER BY {attribute_name} {sort[attribute_name]} OFFSET {skip} LIMIT {page_size}"
        else :
            sql += f" ORDER BY created_at desc OFFSET {skip} LIMIT {page_size}" 
        connection = get_connection()

        cur = connection.cursor()
        cur.execute(sql, params)
        
        rows = cur.fetchall()

        results = []
        for row in rows:
            results.append({
                'template_id': row[0],
                'name': row[1],
                'sql_template': row[2],
                'definition': row[3],
                'warehouse_type': row[4],
                'version': row[5],
                'created_at': row[6],
                'updated_at': row[7],
                'source_type': row[8],
                'report_type': row[9],
                'source_platform_type': row[10],
            })

        cur.execute("SELECT count(*) FROM template WHERE 1=1", params)
        total_items = cur.fetchone()[0]

        total_pages = (total_items + page_size - 1)

        return results, total_items, total_pages


    @classmethod
    def get_Data_Warehouse_Type(cls):
        try:
            connection = get_connection()
            cursor = connection.cursor()
            cursor.execute("SELECT warehouse_type FROM template WHERE 1=1")
            rows = cursor.fetchall()
            results = []
            for row in rows:
                warehouse_type = row[0]
                found = False
                if row[0] is not None:
                    for result in results:
                        if result['warehouse_type'] == warehouse_type:
                            found = True
                            break
                    if not found:
                        results.append({
                            'warehouse_type': warehouse_type,
                        })

            return results
        except Exception as ex:
            raise ex
        finally:
            cursor.close()
            connection.close()

    @classmethod
    def get_Data_SourcePlatform_Type(cls):
        try:
            connection = get_connection()
            cursor = connection.cursor()
            cursor.execute("SELECT source_platform_type FROM template WHERE 1=1")
            rows = cursor.fetchall()
            results = []
            for row in rows:
                source_platform_type = row[0]
                found = False
                if row[0] is not None:
                    for result in results:
                        if result['source_platform_type'] == source_platform_type:
                            found = True
                            break
                    if not found:
                        results.append({
                            'source_platform_type': source_platform_type,
                        })

            return results
        except Exception as ex:
            raise ex
        finally:
            cursor.close()
            connection.close()
    @classmethod
    def get_template(self, template_id):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM template WHERE template_id = %s", (template_id,))
                row = cursor.fetchone()

                template = None
                if row != None:
                    template = Template(*row)
                    template = template.to_JSON()

            connection.close()
            return template
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def add_template(self, template, created_by, definition):
        try:
            connection = get_connection()
            connection_v2 = get_connection_v2()
            with connection.cursor() as cursor:
                    
                    cursor.execute("""INSERT INTO template (template_id, name, sql_template, definition, warehouse_type, version, created_at,source_type,report_type,source_platform_type) 
                                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""", (template.template_id, template.name, template.sql_template, json.dumps(definition), template.warehouse_type, template.version, datetime.now(),str(template.source_type),template.report_type,template.source_platform_type))
                    affected_rows = cursor.rowcount
                    if affected_rows:
                        with connection_v2.cursor() as cursor_v2:
                            log_id = uuid.uuid4()
                            action = 'INSERT'
                            cursor_v2.execute("""INSERT INTO log (log_id, table_name, record_id, action, created_at, created_by) 
                                            VALUES (%s, %s, %s, %s, %s, %s)""", (str(log_id), 'template', str(template.template_id), action, datetime.now(), str(created_by)))
                    connection.commit()
                    connection_v2.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def update_template(self, template, updated_by, definition):
        try:
            connection = get_connection()
            connection_v2 = get_connection_v2()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE template SET name = %s, sql_template = %s, definition = %s, warehouse_type = %s, version = %s, updated_at = %s, source_type = %s, report_type = %s, source_platform_type = %s
                                WHERE template_id = %s""", (template.name, template.sql_template, json.dumps(definition), template.warehouse_type, template.version, datetime.now(), str(template.source_type), template.report_type, template.source_platform_type, template.template_id))
                affected_rows = cursor.rowcount
                if affected_rows:
                    with connection_v2.cursor() as cursor_v2:
                        cursor_v2.execute(
                            "SELECT * FROM log WHERE record_id = %s", (template.template_id,))
                        row = cursor_v2.fetchone()
                        log_id = uuid.uuid4()
                        action = 'UPDATE'
                        if row:
                            created_at = row[4] if not row[4] else datetime.now()
                            created_by = row[5] if not row[5] else None
                        else:
                            created_at = None
                            created_by = None

                        cursor_v2.execute("""INSERT INTO log (log_id, table_name, record_id, action, created_at, created_by, updated_at ,updated_by) 
                                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)""", (str(log_id), 'template', str(template.template_id), action, created_at, created_by, datetime.now(), str(updated_by)))
                connection.commit()
                connection_v2.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def delete_template(self, template):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM template WHERE template_id = %s", (template.template_id,))
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_history_template(self, skip, page_size, template_id):
        try:
            connection = get_connection_v2()

            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT lg.*,user_created.email as email_created_by,user_updated.email as email_updated_by FROM log lg LEFT JOIN users user_updated ON lg.updated_by = user_updated.user_id LEFT JOIN users user_created ON lg.created_by = user_created.user_id WHERE lg.record_id = %s AND lg.table_name = 'template' ORDER BY lg.created_at asc", (template_id,))
                rows = cursor.fetchall()
                results = []
                for row in rows:
                    results.append({
                        'log_id': row[0],
                        'table_name': row[1],
                        'record_id': row[2],
                        'action': row[3],
                        'created_at': row[4],
                        'created_by': row[5],
                        'updated_at': row[6],
                        'updated_by': row[7],
                        'email_created_by': row[8],
                        'email_updated_by': row[9],
                    })
            return results
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_connectors(self):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute('select distinct on ("CONNECTOR") "CONNECTOR_ID", "CONNECTOR", "NAME", "REPORTS"  from connectors  order by "CONNECTOR", "UPDATED_AT" desc;')
                rows = cursor.fetchall()
                
                results = []
                for row in rows:
                    results.append({
                    'id': row[0],
                    'name': row[1],
                    'connector': row[2],
                    'reports': row[3]
                    })
            return results
        except Exception as ex:
            raise Exception(ex)
    @classmethod
    def delete_multiple_template(cls, ids):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                template_ids = [str(uuid.UUID(id_)) for id_ in ids]
                placeholders = ', '.join(['%s'] * len(template_ids))
                sql = f"DELETE FROM template WHERE template_id IN ({placeholders})"
                sqlRecipeTemplate = f"DELETE FROM recipe_template WHERE recipe_id IN ({placeholders})"
                cursor.execute(sqlRecipeTemplate, tuple(template_ids))
                cursor.execute(sql, tuple(template_ids))
                affected_rows = cursor.rowcount

                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)