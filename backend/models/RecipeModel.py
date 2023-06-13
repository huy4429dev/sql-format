import logging
import uuid
from database.db import get_connection_v2
from database.db import get_connection
from .entities.Recipe import Recipe
from datetime import datetime


class RecipeModel():

    @classmethod
    def get_recipes(cls, skip, page_size, name=None, description=None, image=None, version=None, enabled=None, recipe_id=None, sort=None):
        sql = "SELECT * FROM recipe WHERE 1=1"
        params = []
        if name is not None and name != 'null':
            sql += " AND (name ILIKE %s OR name IS NULL OR name = 'null')"
            params.append(f"%{name}%")
        if description is not None and description != 'null':
            sql += " AND description ILIKE %s"
            params.append(f"%{description}%")
        if image is not None and image != 'null':
            sql += " AND image ILIKE %s"
            params.append(f"%{image}%")
        if version is not None and version != 'null':
            sql += " AND version ILIKE %s"
            params.append(f"%{version}%")
        if enabled is not None and enabled.lower() in ['true', 'false']:
            sql += " AND enabled = %s"
            params.append(enabled.lower() == 'true')
        if recipe_id is not None and recipe_id != 'null':
            sql += " AND CAST(recipe_id AS text) ILIKE %s"
            params.append(f"%{recipe_id}%")
        if sort is not None and sort != 'null': 
            for attribute_name in sort:
                sql += f" ORDER BY {attribute_name} {sort[attribute_name]} OFFSET {skip} LIMIT {page_size}"
        else :
            sql += f" ORDER BY created_at OFFSET {skip} LIMIT {page_size}" 
        connection = get_connection()

        cur = connection.cursor()
        cur.execute(sql, params)

        rows = cur.fetchall()

        results = []
        for row in rows:
            results.append({
                'recipe_id': row[0],
                'name': row[1],
                'description': row[2],
                'image': row[3],
                'version': row[4],
                'created_at': row[5],
                'updated_at': row[6],
                'enabled': row[7],
            })

        cur.execute("SELECT count(*) FROM recipe WHERE 1=1", params)
        total_items = cur.fetchone()[0]

        total_pages = (total_items + page_size - 1)

        return results, total_items, total_pages

    @classmethod
    def get_recipe(self, recipe_id):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT * FROM recipe WHERE recipe_id = %s", (recipe_id,))
                row = cursor.fetchone()

                recipe = None
                if row != None:
                    recipe = Recipe(row[0], row[1], row[2],
                                    row[3], row[4], row[5], row[6], row[7])
                    recipe = recipe.to_JSON()

            connection.close()
            return recipe
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def add_recipe(self, recipe, created_by):
        try:
            connection = get_connection()
            connection_v2 = get_connection_v2()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO recipe (recipe_id, name, description, image, version, enabled, created_at) 
                                VALUES (%s, %s, %s, %s, %s, %s, %s)""", (recipe.recipe_id, recipe.name, recipe.description, recipe.image, recipe.version, recipe.enabled, datetime.now()))
                affected_rows = cursor.rowcount
                if affected_rows:
                    with connection_v2.cursor() as cursor_v2:
                        log_id = uuid.uuid4()
                        action = 'INSERT'
                        cursor_v2.execute("""INSERT INTO log (log_id, table_name, record_id, action, created_at, created_by) 
                                        VALUES (%s, %s, %s, %s, %s, %s)""", (str(log_id), 'recipe', str(recipe.recipe_id), action, datetime.now(), str(created_by)))
                connection.commit()
                connection_v2.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def update_recipe(self, recipe, updated_by):
        try:
            connection = get_connection()
            connection_v2 = get_connection_v2()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE recipe SET name = %s, description = %s, image = %s, version = %s, enabled = %s, updated_at = %s
                                WHERE recipe_id = %s""", (recipe.name, recipe.description, recipe.image, recipe.version, recipe.enabled, datetime.now(), recipe.recipe_id))
                affected_rows = cursor.rowcount
                if affected_rows:
                    with connection_v2.cursor() as cursor_v2:
                        cursor_v2.execute(
                            "SELECT * FROM log WHERE record_id = %s", (recipe.recipe_id,))
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
                                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)""", (str(log_id), 'recipe', str(recipe.recipe_id), action, created_at, created_by, datetime.now(), str(updated_by)))
                connection.commit()
                connection_v2.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            logging.critical(ex, exc_info=True)
            raise Exception(ex)

    @classmethod
    def get_history_recipe(self, skip, page_size, recipe_id):
        try:
            connection = get_connection_v2()

            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT lg.*,user_created.email as email_created_by,user_updated.email as email_updated_by FROM log lg LEFT JOIN users user_updated ON lg.updated_by = user_updated.user_id LEFT JOIN users user_created ON lg.created_by = user_created.user_id WHERE lg.record_id = %s AND lg.table_name = 'recipe' ORDER BY lg.created_at", (recipe_id,))
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
    def delete_recipe(self, recipe):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute(
                    "DELETE FROM recipe WHERE recipe_id = %s", (recipe.recipe_id,))
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @staticmethod
    def check_verify(field, data):
        try:
            connection = get_connection()
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM recipe WHERE %s=%s", (field, data))
            row = cursor.fetchone()
            if row:
                return True
            else:
                return False
        except Exception as ex:
            raise ex
        finally:
            cursor.close()
            connection.close()
    @classmethod
    def delete_multiple_recipe(cls, ids):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                recipe_ids = [str(uuid.UUID(id_)) for id_ in ids]
                placeholders = ', '.join(['%s'] * len(recipe_ids))
                sql = f"DELETE FROM recipe WHERE recipe_id IN ({placeholders})"
                sqlRecipeTemplate = f"DELETE FROM recipe_template WHERE recipe_id IN ({placeholders})"
                cursor.execute(sqlRecipeTemplate, tuple(recipe_ids))
                cursor.execute(sql, tuple(recipe_ids))
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)