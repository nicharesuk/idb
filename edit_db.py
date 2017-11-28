"""
This is the script file used to create and edit the database using Flask-SQL-Alchemy.
"""

import os
import json
import sys
import requests
import json
import os
import errno
import filecmp
import re

import html

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import CheckConstraint
from sqlalchemy.sql import func
from app.models import db, Character, Anime, Actor, Manga

data_folder = 'data_retrieval/'
app_folder = 'app/'
jikan_anime = 'jikan_anime/'
jikan_character = 'jikan_character/'
jikan_manga = 'jikan_manga/'
jikan_person = 'jikan_person/'

# try:
#     os.remove(data_folder + 'weeb.db')
# except OSError:
#     pass

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + app_folder + 'weeb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Suppress warning

def create_db():
    with app.app_context():
        db.init_app(app)

        db.create_all()

        created_anime = []
        created_characters = []
        created_actors = []
        created_manga = []

        existing_character = {}
        existing_actor = {}
        existing_manga = {}

        for anime_file_num in os.listdir(data_folder + jikan_anime):
            with open(data_folder + jikan_anime + anime_file_num) as anime_datafile:
                print("anime: " + anime_file_num)
                anime_json_data = json.load(anime_datafile)

                anime_title = anime_json_data['title']
                anime_aired = anime_json_data['aired']
                anime_score = anime_json_data['score'][0]
                anime_episodes = anime_json_data['episodes']
                anime_synopsis = anime_json_data['synopsis']

                anime_type = anime_json_data['type']
                if anime_type == None:
                    anime_type = 'Unknown'

                anime_pic = anime_json_data['image']
                anime_status = anime_json_data['status']
                anime_youtube = None
                try:
                    if anime_json_data['youtubeVideoId'] != '':
                        anime_youtube = anime_json_data['youtubeVideoId']

                except KeyError:
                    pass
                
                genre_list = []
                for genre in anime_json_data['genre']:
                    genre_list.append(genre[1])

                anime_genre = ', '.join(genre_list)

                anime_rating = anime_json_data['rating']
                
                final_anime = Anime(title=anime_title, aired=anime_aired, score=anime_score, num_episodes=anime_episodes, synopsis=anime_synopsis, media_type=anime_type, picture=anime_pic, status=anime_status, youtube_id=anime_youtube, rating=anime_rating, genre=anime_genre)
                created_anime.append(final_anime)

                # Character
                if 'character' in anime_json_data:
                    for character_list_object in anime_json_data['character']:
                        if character_list_object['role'] == 'Main':
                            anime_character_id = (character_list_object['url'].split('/'))[4]
                            if anime_character_id in existing_character:
                                final_anime.characters.add(created_characters[existing_character[anime_character_id]])
                                continue

                            if os.path.exists(data_folder + jikan_character + anime_character_id):
                                with open(data_folder + jikan_character + anime_character_id) as character_datafile:
                                    character_json_data = json.load(character_datafile)

                                    try:
                                        character_name = character_json_data['name']
                                    except KeyError:
                                        continue
                                    
                                    character_japanese_name = character_json_data['name-japanese']
                                    character_about = character_json_data['about']
                                    character_pic = character_json_data['image']
                                    if not character_pic:
                                        character_pic = None

                                    print("Creating character with MAL ID:" + anime_character_id)
                                    final_character = Character(name=character_name, japanese_name=character_japanese_name, about=character_about, picture=character_pic)
                                    created_characters.append(final_character)
                                    existing_character[anime_character_id] = len(created_characters) - 1

                                    final_anime.characters.add(final_character)

                                    # Voice actor
                                    if 'voice-actor' in character_list_object:
                                        for actor_list_object in character_list_object['voice-actor']:
                                            actor_id = (actor_list_object['url'].split('/'))[4]

                                            if actor_id in existing_actor:
                                                final_character.actors.add(created_actors[existing_actor[actor_id]])
                                                final_anime.actors.add(created_actors[existing_actor[actor_id]])
                                                continue

                                            actor_name = actor_list_object['name']

                                            if os.path.exists(data_folder + jikan_person + actor_id):
                                                print("actor id: " + actor_id)
                                                with open(data_folder + jikan_person + actor_id) as actor_datafile:
                                                    actor_json_data = json.load(actor_datafile)

                                                    actor_language = actor_json_data['language']
                                                    actor_given_name = None

                                                    try:
                                                        actor_given_name = actor_json_data['given-name']
                                                    except KeyError:
                                                        pass
                                                    
                                                    actor_birthday = actor_json_data['birthday']
                                                    actor_pic = None if actor_json_data['image'] == "" else actor_json_data['image']
                                                    actor_website = None if actor_json_data['website'] == "" else actor_json_data['website']
                                                    
                                                    final_actor = Actor(name=actor_name, language=actor_language, given_name=actor_given_name, birthday=actor_birthday, picture=actor_pic, website=actor_website)
                                                    created_actors.append(final_actor)
                                                    existing_actor[actor_id] = len(created_actors) - 1

                                                    final_character.actors.add(final_actor)
                                                    final_anime.actors.add(final_actor)

                # Manga
                if 'related' in anime_json_data:
                    related = anime_json_data['related']
                    if 'Adaptation' in anime_json_data['related']:
                        adaptation_obj = related['Adaptation']

                        manga_id_list = []
                        if isinstance(adaptation_obj[0], list):
                            for list_obj in related['Adaptation']:
                                tokens = list_obj[1].split('/')
                                manga_id_list.append(tokens[2])

                        else:
                            manga = related['Adaptation']
                            manga = manga[1].split('/')
                            manga_id_list.append(manga[2])
                    
                        for manga_id in manga_id_list:
                            if manga_id in existing_manga:
                                final_anime.mangas.add(created_manga[existing_manga[manga_id]])

                            elif os.path.exists(data_folder + jikan_manga + manga_id):
                                print("manga id: " + manga_id)
                                with open(data_folder + jikan_manga + manga_id) as manga_datafile:
                                    manga_json_data = json.load(manga_datafile)

                                    manga_title = None
                                    if manga_json_data['type'] == 'Novel':
                                        manga_title = manga_json_data['title'] + ' - (Novel)'
                                    else:
                                        manga_title = manga_json_data['title']

                                    manga_title_english = None
                                    try:
                                        manga_title_english = manga_json_data['title-english']
                                    except KeyError:
                                        pass

                                    manga_title_japanese = None
                                    try:
                                        manga_title_japanese = manga_json_data['japanese']
                                    except KeyError:
                                        pass

                                    list_authors = []
                                    for json_author in manga_json_data['author']:
                                        list_authors.append(json_author['name'])
                                    manga_author = ', '.join(list_authors)

                                    manga_published = manga_json_data['published']
                                    
                                    manga_score = None
                                    try:
                                        manga_score = manga_json_data['score'][0]
                                    except KeyError:
                                        pass
                                    

                                    manga_chapters = manga_json_data['chapters']
                                    manga_synopsis = manga_json_data['synopsis']
                                    manga_type = manga_json_data['type']
                                    manga_picture = manga_json_data['image']
                                    manga_status = manga_json_data['status']

                                    manga_genre_list = []
                                    for genre in manga_json_data['genre']:
                                        manga_genre_list.append(genre[1])

                                    manga_genre = ', '.join(manga_genre_list)

                                    final_manga = Manga(title=manga_title, title_english=manga_title_english, title_japanese=manga_title_japanese, author=manga_author, published=manga_published, score=manga_score, num_chapters=manga_chapters, synopsis=manga_synopsis, media_type=manga_type, picture=manga_picture, status=manga_status, genre=manga_genre)
                                    created_manga.append(final_manga)
                                    existing_manga[manga_id] = len(created_manga) - 1

                                    final_anime.mangas.add(final_manga)


                                    for manga_character in manga_json_data['character']:
                                        manga_character_id = (manga_character['url'].split('/'))[4]

                                        if manga_character_id in existing_character:
                                            final_manga.characters.add(created_characters[existing_character[manga_character_id]])
                                        else:
                                            if os.path.exists(data_folder + jikan_character + manga_character_id):
                                                with open(data_folder + jikan_character + manga_character_id) as manga_character_datafile:
                                                    manga_character_json_data = json.load(manga_character_datafile)

                                                    try:
                                                        manga_character_name = manga_character_json_data['name']
                                                    except KeyError:
                                                        continue
                                                    
                                                    manga_character_japanese_name = manga_character_json_data['name-japanese']
                                                    manga_character_about = manga_character_json_data['about']
                                                    manga_character_pic = manga_character_json_data['image']

                                                    print("Creating manga character: " + manga_character_id)
                                                    final_manga_character = Character(name=manga_character_name, japanese_name=manga_character_japanese_name, about=manga_character_about, picture=manga_character_pic)
                                                    created_characters.append(final_manga_character)
                                                    existing_character[manga_character_id] = len(created_characters) - 1

                                                    final_manga.characters.add(final_manga_character)


        for anime in created_anime:
            db.session.add(anime)

        for character in created_characters:
            db.session.add(character)

        for actor in created_actors:
            db.session.add(actor)

        for manga in created_manga:
            db.session.add(manga)

        

        db.session.commit()
        print("I HAVE COMITTED")

def update_anime_with_video():
    with app.app_context():
        db.init_app(app)

        url = 'https://kitsu.io/api/edge/anime?filter[text]='

        anime_without_youtube = Anime.query.filter_by(youtube_id=None).all()

        for anime in anime_without_youtube:
            jikan_name = anime.title
            search_url = url + jikan_name
            r = requests.get(search_url)

            if r.status_code != 404:
                try:
                    r = r.json()

                    found = False
                    for kitsu_anime in r['data']:
                        if 'attributes' in kitsu_anime:
                            attr = kitsu_anime['attributes']
                            if attr['canonicalTitle'] == jikan_name and found != True:
                                print(attr['canonicalTitle'])
                                anime.youtube_id = attr['youtubeVideoId']
                except:
                    continue

        db.session.commit()

def update_anime_empty_string():
    with app.app_context():
        db.init_app(app)

        anime_without_youtube = Anime.query.filter_by(youtube_id='').all()

        for anime in anime_without_youtube:
            anime.youtube_id = None

        db.session.commit()

def update_character_role():
    with app.app_context():
        db.init_app(app)

        characters = Character.query.filter_by(role=None).all()

        for character in characters:
            character.role = "Main"

        db.session.commit()

def update_inappropriate():
    with app.app_context():
        db.init_app(app)

        # bad_word = "hentai"
        # bad_anime = Anime.query.filter(Anime.rating.ilike("%hentai%")).all()

        # for anime in bad_anime:
        #     db.session.delete(anime)
        
        bad_manga = Manga.query.filter(Manga.genre.contains("hentai")).all()

        for manga in bad_manga:
            db.session.delete(manga)
            print(manga.title)

        db.session.commit()

def update_empty_relationships():
    with app.app_context():
        db.init_app(app)

        # all_anime = Anime.query.all()

        # for anime in all_anime:
        #     if len(anime.characters) == 0 and len(anime.actors) == 0 and len(anime.mangas) == 0:
        #         db.session.delete(anime)
        #         print("DELETED: " + anime.title)
        
        all_characters = Character.query.all()

        for character in all_characters:
            if len(character.animes) == 0 and len(character.actors) == 0 and len(character.mangas) == 0:
                db.session.delete(character)
                print("DELETED: " + character.name)
        
        db.session.commit()

def delete_manga_model(rowid):
    with app.app_context():
        db.init_app(app)
        
        manga = Manga.query.filter_by(id=rowid).first()

        if len(manga.animes) == 0:

            for character in manga.characters:
                if len(character.animes) == 0 and len(character.actors) == 0:
                    db.session.delete(character)
                    print("DELETED: " + character.name)
        else:
            print("Manga has an anime, cannot delete characters. ID: " + str(rowid))

        db.session.delete(manga)
        print("Deleted manga ID: " + str(rowid))
            
        db.session.commit()

def fix_bad_genres():
    with app.app_context():
        db.init_app(app)

        all_anime = Anime.query.all()
        all_manga = Manga.query.all()

        models = []

        for anime in all_anime:
            if len(anime.genre) == 4: # Bad genres are in the form of "., ." where . is any symbol
                print("Anime ID: " + str(anime.id) + " Genre: " + anime.genre)
                models.append(anime)

        for manga in all_manga:
            if len(manga.genre) == 4: # Bad genres are in the form of "., ." where . is any symbol
                print("Manga ID: " + str(manga.id) + " Genre: " + manga.genre)
                models.append(manga)

        image_json = {}
        for anime_file_num in os.listdir(data_folder + jikan_anime):
            with open(data_folder + jikan_anime + anime_file_num) as anime_datafile:
                print("anime: " + anime_file_num)
                anime_json_data = json.load(anime_datafile)

                image_json[anime_json_data["image"]] = anime_json_data

        for manga_file_num in os.listdir(data_folder + jikan_manga):
            with open(data_folder + jikan_manga + manga_file_num) as manga_datafile:
                print("manga: " + manga_file_num)
                manga_json_data = json.load(manga_datafile)

                image_json[manga_json_data["image"]] = manga_json_data

        for model in models:
            # print(image_json[model.picture]['genre'])
            genre = image_json[model.picture]['genre']
            if type(genre) is dict:
                print(genre["name"])
                model.genre = genre["name"]
            if type(genre) is list:
                print(genre[1])
                model.genre = genre[1]
        
        db.session.commit()

def fix_html():
    with app.app_context():
        db.init_app(app)
        
        cleanr = re.compile('<.*?>')
        all_characters = Character.query.all()
        all_anime = Anime.query.all()
        all_manga = Manga.query.all()

        # for character in all_characters:
        #     cleantext = re.sub(cleanr, '', character.about)
        #     character.about = html.unescape(cleantext)

        # for anime in all_anime:
        #     cleantext = re.sub(cleanr, '', anime.synopsis)
        #     anime.synopsis = html.unescape(cleantext)

        # for manga in all_manga:
        #     cleantext = re.sub(cleanr, '', manga.synopsis)
        #     manga.synopsis = html.unescape(cleantext)

        for anime in all_anime:
            anime.rating = html.unescape(anime.rating)

            
        db.session.commit()
        
        
if __name__ == "__main__":

    fix_html()