"""
Starts the main server to host the static production build files
as well as set up the Flask-Restless API routes for the database models.
"""

import os
import flask
import flask_sqlalchemy
import flask_restless

from sqlalchemy.schema import ForeignKey
from flask_restless import APIManager
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from app.models import db, Character, Anime, Actor, Manga

BUILD_DIR = 'build'
app = Flask(__name__, static_folder=BUILD_DIR)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app/weeb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Suppress warning
CORS(app, headers=['Content-Type']) # Enable Cross-Origin Resource Sharing

db.init_app(app)


manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Character, collection_name='characters', allow_functions=True, methods=['GET'], page_size=60)

manager.create_api(Anime, collection_name='animes', allow_functions=True, methods=['GET'], page_size=60)

manager.create_api(Actor, collection_name='actors', allow_functions=True, methods=['GET'], page_size=60)

manager.create_api(Manga, collection_name='mangas', allow_functions=True, methods=['GET'], page_size=60)

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

# Testing purposes only
@app.route('/hello')
def hello():
    return "Hello World\n"


if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)
