from flask import Blueprint, jsonify, request
import uuid
import json
from database.db import get_connection

from marshmallow import ValidationError
from models.Schema.BridgeSchema import BridgeSchema
# Entities
from models.entities.Bridge import Bridge
# Models
from models.BridgeModel import BridgeModel

main = Blueprint('bridge_blueprint', __name__)


@main.route('/')
def get_bridges():
    try:
        page = int(request.args.get('page', 1))
        page_size = int(request.args.get('page_size', 10))
        recipe_name = request.args.get('recipe_name', '')
        template_name = request.args.get('template_name', '')
        sql_template = request.args.get('sql_template', '')
        skip = (page - 1) * page_size
        results, total_items, total_pages = BridgeModel.get_recipes(skip, page_size, recipe_name, template_name, sql_template)
        return jsonify({
            'data': results,
            'pagination': {
                'page': page,
                'page_size': page_size,
                'total_records': total_items,
                'total_pages': total_pages
            }
        })
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/<id>')
def get_bridge(id):
    try:
        bridge = BridgeModel.get_bridge(id)
        if bridge != None:
            return jsonify(bridge)
        else:
            return jsonify({}), 404
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/add', methods=['POST'])
def add_bridge():
    data = json.loads(request.data)
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            for bridge_data in data['data']:
                recipe_id = bridge_data['recipe_id']
                template_ids = bridge_data['template_ids']
                cursor.execute("DELETE FROM recipe_template WHERE recipe_id = %s", (recipe_id,))
                for template_id in template_ids:
                    bridge_instance = Bridge(recipe_id=recipe_id, template_id=template_id)
                    cursor.execute("""INSERT INTO recipe_template (recipe_id, template_id) 
                                    VALUES (%s, %s)""", (bridge_instance.recipe_id, bridge_instance.template_id))
                    affected_rows = cursor.rowcount

                    if affected_rows != 1:
                        raise Exception("Error on insert")

        connection.commit()
        connection.close()

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
            
    return jsonify({'message': "Bridges added successfully"}), 200

@main.route('/update/<id>', methods=['PUT'])
def update_bridge(id):
    try:
        data = json.loads(request.data)
        data = BridgeSchema().load(data)
        bridge = Bridge(id, data['name'], data['enabled'])

        affected_rows = BridgeModel.update_bridge(bridge)

        if affected_rows == 1:
            return jsonify(bridge.id)
        else:
            return jsonify({'message': "No bridge updated"}), 404

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/delete/<recipe_id>/<template_id>', methods=['DELETE'])
def delete_bridge(recipe_id,template_id):
    try:

        affected_rows = BridgeModel.delete_bridge(recipe_id,template_id)

        if affected_rows == 1:
            return jsonify(recipe_id)
        else:
            return jsonify({'message': "No bridge deleted"}), 404

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/getRecipe')
def getRecipe():
    try:
        recipe = BridgeModel.getRecipe()
        return jsonify({
            'data': recipe,
        })
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/getTemplate')
def getTemplate():
    try:
        name = request.args.get('name', '')
        template = BridgeModel.getTemplate(name)
        return jsonify({
            'data': template,
        })
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/delete_multiple', methods=['DELETE'])
def delete_multiple():
    try:
        data = request.get_json()
        ids = data.get('ids', [])
        affected_rows = BridgeModel.delete_multiple_bridge(ids)
        
        response = {
            'message': f'Successfully deleted {affected_rows} rows.'
        }

        return response, 200
    except Exception as ex:
        response = {
            'error': str(ex)
        }
        
        return response, 500