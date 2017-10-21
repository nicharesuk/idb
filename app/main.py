import os
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from models import db

BUILD_DIR = 'build'
app = Flask(__name__, static_folder=BUILD_DIR)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///weeb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Suppress warning

db.init_app(app)

# Serve React App, handle all unhandled paths
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path == "":
        return send_from_directory(BUILD_DIR, 'index.html')
    else:
        if os.path.exists(BUILD_DIR + '/' + path):
            return send_from_directory(BUILD_DIR, path)
        else:
            return send_from_directory(BUILD_DIR, 'index.html')


# @app.route('/api/anime/<int:id>')
# def get_anime(id):
#     return models.anime(id)

if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)
