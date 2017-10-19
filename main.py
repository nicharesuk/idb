import os
from flask import Flask, send_from_directory
import app.models

BUILD_DIR = 'build'
flask_server = Flask(__name__, static_folder=BUILD_DIR)

# Serve React App, handle all unhandled paths
@flask_server.route('/', defaults={'path': ''})
@flask_server.route('/<path:path>')
def serve(path):
    if path == "":
        return send_from_directory(BUILD_DIR, 'index.html')
    else:
        if os.path.exists(BUILD_DIR + '/' + path):
            return send_from_directory(BUILD_DIR, path)
        else:
            return send_from_directory(BUILD_DIR, 'index.html')


@flask_server.route('/api/anime/<int:id>')
def get_anime(id):
    return app.models.anime(id)

if __name__ == '__main__':
    flask_server.run(use_reloader=True, port=5000, threaded=True)
