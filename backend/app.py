from functools import wraps
from flask import Flask, jsonify
from flask_cors import CORS
from decouple import config
import os
import pathlib
from flask_session import Session
from routes import BridgeRouter, RecipeRouter, TemplateRouter, UserRouter

app = Flask(__name__)
app.secret_key = "CodeSpecialist.com"
CORS(app, resources={"*": {"origins": "http://localhost:4200"}})
database_config = {
    'DB': f"postgresql://{config('PGSQL_USER')}:{config('PGSQL_PASSWORD')}@{config('PGSQL_HOST')}:{config('PGSQL_POST')}/{config('PGSQL_DB')}",
    'DB2': f"postgresql://{config('PGSQL_USER_DB2')}:{config('PGSQL_PASSWORD_DB2')}@{config('PGSQL_HOST_DB2')}:{config('PGSQL_POST_DB2')}/{config('PGSQL_DB_DB2')}"
}
app.config['SQLALCHEMY_BINDS'] = database_config
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_SECURE'] = True
Session(app)
def page_not_found(error):
    return "<h1>Not found page</h1>", 404
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

app.register_blueprint(BridgeRouter.main, url_prefix='/api/bridge')
app.register_blueprint(RecipeRouter.main, url_prefix='/api/recipe')
app.register_blueprint(TemplateRouter.main, url_prefix='/api/template')
app.register_blueprint(UserRouter.main, url_prefix='/api/user')
if __name__ == '__main__':
    app.register_error_handler(404, page_not_found)
    app.run()