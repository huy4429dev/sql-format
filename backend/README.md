#
python app.py
pip install flask
pip install Flask-Cors
pip install Flask-Migrate
pip install pyjwt
pip install python-decouple
pip install requests
pip install google-cloud
pip install -r requirements.txt
flask db migrate
flask db upgrade
pip install flask[async]