from database.db import get_connection
from .entities.Bridge import Bridge
import uuid
from .entities.Recipe import Recipe
from .entities.Template import Template

class BridgeModel():
    @classmethod
    def get_recipes(cls, skip, page_size, recipe_name=None, template_name=None, sql_template=None):
        sql = """SELECT recipe.recipe_id as recipe_id, recipe.name as recipe_name,
                    template.template_id as template_id, template.name as template_name, template.sql_template as sql_template
                    FROM recipe_template
                    INNER JOIN recipe ON recipe_template.recipe_id = recipe.recipe_id
                    INNER JOIN template ON recipe_template.template_id = template.template_id WHERE 1=1"""
        params = []
        if recipe_name is not None and recipe_name != 'null':
            sql += " AND (recipe.name ILIKE %s OR recipe.name IS NULL OR recipe.name = 'null')"
            params.append(f"%{recipe_name}%")
        if template_name is not None and template_name != 'null':
            sql += " AND (template.name ILIKE %s OR template.name IS NULL OR template.name = 'null')"
            params.append(f"%{template_name}%")
        if sql_template is not None and sql_template != 'null':
            sql += " AND (template.sql_template ILIKE %s OR template.sql_template IS NULL OR template.sql_template = 'null')"
            params.append(f"%{sql_template}%")
        sql += f" ORDER BY recipe_id OFFSET {skip} LIMIT {page_size}"
        connection = get_connection()

        cur = connection.cursor()
        cur.execute(sql, params)
        
        rows = cur.fetchall()
        results = []
        for row in rows:
            results.append({
                'recipe_id': row[0],
                'recipe_name': row[1],
                'template_id': row[2],
                'template_name': row[3],
                'sql_template': row[4],
            })

        cur.execute("""SELECT count(*) FROM recipe_template
                    INNER JOIN recipe ON recipe_template.recipe_id = recipe.recipe_id
                    INNER JOIN template ON recipe_template.template_id = template.template_id WHERE 1=1""", params)
        total_items = cur.fetchone()[0]

        total_pages = (total_items + page_size - 1)
        return results, total_items, total_pages

    @classmethod
    def getRecipe(cls):
        try:
            connection = get_connection()
            bridges = []
            with connection.cursor() as cursor:
                cursor.execute("SELECT recipe_id,name FROM recipe WHERE enabled = true")
                resultset = cursor.fetchall()

                for row in resultset:
                    bridge = Recipe(row[0], row[1])
                    bridges.append(bridge.to_JSON())

            connection.close()
            return bridges
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def getTemplate(cls,name=None):
        try:
            connection = get_connection()
            bridges = []
            with connection.cursor() as cursor:
                sql = "SELECT template_id,name FROM template Where 1=1"
                params = []
                if name is not None and name != 'null':
                    sql += " AND (name ILIKE %s OR name IS NULL OR name = 'null')"
                    params.append(f"%{name}%")
                cursor.execute(sql,params)
                resultset = cursor.fetchall()

                for row in resultset:
                    bridge = Template(row[0], row[1])
                    bridges.append(bridge.to_JSON())

            connection.close()
            return bridges
        except Exception as ex:
            raise Exception(ex)
    @classmethod
    def get_bridge(cls, recipe_id, template_id):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute("""SELECT recipe.recipe_id as recipe_id, recipe.name as recipe_name,
                                template.template_id as template_id, template.name as template_name 
                                FROM bridge
                                INNER JOIN recipe ON bridge.recipe_id = recipe.recipe_id
                                INNER JOIN template ON bridge.template_id = template.template_id
                                WHERE bridge.recipe_id = %s AND bridge.template_id = %s""", (recipe_id,template_id))
                row = cursor.fetchone()

                bridge = None
                if row != None:
                    bridge = Bridge(row[0], row[1], row[2], row[3])
                    bridge = bridge.to_JSON()

            connection.close()
            return bridge
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def add_bridge(cls, bridge, connection):
        try:
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO recipe_template (recipe_id, template_id) 
                                VALUES (%s, %s)""", (bridge.recipe_id, bridge.template_id))
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows

        except Exception as ex:
            print(f"Error adding bridge to database: {str(ex)}")
            raise Exception("Could not add bridge to database.")

    @classmethod
    def update_bridge(cls, bridge):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute("""UPDATE recipe_template SET recipe_id = %s, template_id = %s
                                WHERE id = %s""", (bridge.recipe_id, bridge.template_id, bridge.id))
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def delete_bridge(cls, recipe_id,template_id):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM recipe_template WHERE recipe_id = %s AND template_id = %s", (recipe_id,template_id))
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def delete_multiple_bridge(cls, ids):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                placeholders = ', '.join(['(%s, %s)'] * len(ids))
                flattened_ids = [id_ for sublist in ids for id_ in sublist]
                sql = f"DELETE FROM recipe_template WHERE (recipe_id, template_id) IN ({placeholders})"
                cursor.execute(sql, tuple(flattened_ids))

                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)