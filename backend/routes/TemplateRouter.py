from flask import Blueprint, jsonify, request, session
import uuid
import json
from routes.decorators import admin_required
from models.Schema.TemplateSchema import TemplateSchema
# Entities
from models.entities.Template import Template
# Models
from models.TemplateModel import TemplateModel
from flask import current_app
main = Blueprint('template_blueprint', __name__)

@main.route('/')
# @admin_required
def get_templates():
    try:
        page = int(request.args.get('page', 1))
        page_size = int(request.args.get('page_size', 10))
        name = request.args.get('name', '')
        warehouse_type = request.args.get('warehouse_type', '')
        version = request.args.get('version', '')
        template_id = request.args.get('template_id', '')
        skip = (page - 1) * page_size
        
        sort_param = request.args.get('sort')
        sort = json.loads(sort_param) if sort_param else None

        results, total_items, total_pages = TemplateModel.get_templates(skip, page_size, name, warehouse_type, version, template_id, sort)
        
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


@main.route('/<template_id>')
def get_template(template_id):
    try:
        template = TemplateModel.get_template(template_id)
        if template != None:
            return jsonify(template)
        else:
            return jsonify({}), 404
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/add', methods=['POST'])
def add_template():
    try:
        data = json.loads(request.data)
        definition = json.loads(data['definition'])
        data['definition'] = definition
        data = TemplateSchema().load(data)
        template_id = uuid.uuid4()
        created_by = str(data['user_id'])
        template = Template(str(template_id), data['name'], data['sql_template'], {}, data['warehouse_type'],data['version'],'','',data['source_type'],data['report_type'],data['source_platform_type'])
        affected_rows = TemplateModel.add_template(template, created_by, definition)

        if affected_rows == 1:
            return jsonify(template.template_id)
        else:
            return jsonify({'message': "Error on insert"}), 500

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/update/<template_id>', methods=['PUT'])
def update_template(template_id):
    try:
        data = json.loads(request.data)
        definition = json.loads(data['definition'])
        data['definition'] = definition
        data = TemplateSchema().load(data)
        updated_by = str(data['user_id'])
        template = Template(str(template_id), data['name'], data['sql_template'], {}, data['warehouse_type'],data['version'],'','',data['source_type'],data['report_type'],data['source_platform_type'])
        affected_rows = TemplateModel.update_template(template, updated_by, definition)

        if affected_rows == 1:
            return jsonify(template.template_id)
        else:
            return jsonify({'message': "No template updated"}), 404

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/delete/<template_id>', methods=['DELETE'])
def delete_template(template_id):
    try:
        template = Template(template_id)

        affected_rows = TemplateModel.delete_template(template)

        if affected_rows == 1:
            return jsonify(template.template_id)
        else:
            return jsonify({'message': "No template deleted"}), 404

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/history/<template_id>')
def get_history_template(template_id):
    try:
        page = int(request.args.get('page', 1))
        page_size = int(request.args.get('page_size', 10))
        skip = (page - 1) * page_size
        results = TemplateModel.get_history_template(skip, page_size, str(template_id))
        return jsonify({
            'data': results
        })
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/warehousetype')
def get_Data_Warehouse_Type():
    try:
        result = TemplateModel.get_Data_Warehouse_Type()
        return jsonify({
            'data': result,
        })
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/sourceplatformtype')
def get_Data_SourcePlatform_Type():
    try:
        result = TemplateModel.get_Data_SourcePlatform_Type()
        return jsonify({
            'data': result,
        })
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/connector')
def get_connectors():
    try:
        results = TemplateModel.get_connectors()
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
        affected_rows = TemplateModel.delete_multiple_template(ids)
        
        response = {
            'message': f'Successfully deleted {affected_rows} rows.'
        }
        
        return response, 200
    except Exception as ex:
        response = {
            'error': str(ex)
        }
        
        return response, 500