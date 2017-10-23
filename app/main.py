import os
import flask
import flask_sqlalchemy
import flask_restless

from sqlalchemy.schema import ForeignKey
from flask_restless import APIManager
# from flask_cors import CORS
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from models import db, Character, Anime, Actor, Manga

BUILD_DIR = '../build'
app = Flask(__name__, static_folder=BUILD_DIR)

# CORS(app, headers=['Content-Type'])
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///weeb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Suppress warning

db.init_app(app)


manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Character, collection_name='characters', allow_functions=True, methods=['GET'], page_size=6)

manager.create_api(Anime, collection_name='animes', allow_functions=True, methods=['GET'], page_size=6)

manager.create_api(Actor, collection_name='actors', allow_functions=True, methods=['GET'], page_size=6)

manager.create_api(Manga, collection_name='mangas', allow_functions=True, methods=['GET'], page_size=6)

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
    return "Hello world"


if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)
