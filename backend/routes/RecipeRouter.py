from flask import Blueprint, jsonify, request, session
import uuid
import json
from models.Schema.RecipeSchema import RecipeSchema
# Entities
from models.entities.Recipe import Recipe
from models.entities.Log import Log
# Models
from models.RecipeModel import RecipeModel
from models.LogModel import LogModel

main = Blueprint('recipe_blueprint', __name__)


@main.route('/')
def get_recipes():
    try:
        page = int(request.args.get('page', 1))
        page_size = int(request.args.get('page_size', 10))
        name = request.args.get('name', '')
        description = request.args.get('description', {})
        image = request.args.get('image', '')
        version = request.args.get('version', '')
        enabled = request.args.get('enabled', '')
        recipe_id = request.args.get('recipe_id', '')
        sort_param = request.args.get('sort')
        sort = json.loads(sort_param) if sort_param else None
        skip = (page - 1) * page_size
        results, total_items, total_pages = RecipeModel.get_recipes(skip, page_size, name, description, image, version, enabled, recipe_id, sort)
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
def get_recipe(id):
    try:
        recipe = RecipeModel.get_recipe(id)
        if recipe != None:
            return jsonify(recipe)
        else:
            return jsonify({}), 404
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/add', methods=['POST'])
def add_recipe():
    try:
        data = json.loads(request.data)
        data = RecipeSchema().load(data)
        recipe_id = uuid.uuid4()
        created_by = str(data['user_id'])
        recipe = Recipe(str(recipe_id), data['name'], data['description'],data['image'], data['version'], bool(data['enabled']))
        affected_rows = RecipeModel.add_recipe(recipe, created_by)

        if affected_rows == 1:
            return jsonify(recipe.recipe_id)
        else:
            return jsonify({'message': "Error on insert"}), 500

    except Exception as ex:
        return jsonify({'messages': str(ex)}), 500


@main.route('/update/<recipe_id>', methods=['PUT'])
def update_recipe(recipe_id):
    try:
        data = json.loads(request.data)
        data = RecipeSchema().load(data)
        updated_by = str(data['user_id'])
        recipe = Recipe(recipe_id, data['name'], data['description'],data['image'], data['version'], bool(data['enabled']))
        affected_rows = RecipeModel.update_recipe(recipe, updated_by)
        if affected_rows == 1:
            return jsonify({'message': 'Item updated successfully'}), 200
        else:
            return jsonify({'message': "No recipe updated"}), 404

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/delete/<recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    try:
        recipe = Recipe(recipe_id)
        affected_rows = RecipeModel.delete_recipe(recipe)

        if affected_rows == 1:
            return jsonify(recipe.recipe_id)
        else:
            return jsonify({'message': "No recipe deleted"}), 404

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/history/<recipe_id>')
def get_history_recipe(recipe_id):
    try:
        page = int(request.args.get('page', 1))
        page_size = int(request.args.get('page_size', 10))
        skip = (page - 1) * page_size
        results = RecipeModel.get_history_recipe(skip, page_size, str(recipe_id))
        return jsonify({
            'data': results
        })
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/delete_multiple', methods=['DELETE'])
def delete_multiple():
    try:
        data = request.get_json()
        ids = data.get('ids', [])
        affected_rows = RecipeModel.delete_multiple_recipe(ids)
        
        response = {
            'message': f'Successfully deleted {affected_rows} rows.'
        }
        
        return response, 200
    except Exception as ex:
        response = {
            'error': str(ex)
        }
        
        return response, 500