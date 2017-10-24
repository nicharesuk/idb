# This is the file we will use to put data into the database
import os
import json
import sys
import requests
import json
import os
import errno
import filecmp
import re

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import CheckConstraint
from sqlalchemy.sql import func
from app.models import db, Character, Anime, Actor, Manga

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///weeb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Suppress warning

with app.app_context():
    db.init_app(app)

    db.create_all()

    created_anime = []
    created_characters = []
    created_actors = []
    created_manga = []

    existing_character = {}
    existing_actor = set()
    existing_manga = set()

    data_folder = 'getdata/'
    jikan_anime = 'jikan_anime/'
    jikan_character = 'jikan_character/'
    jikan_manga = 'jikan_manga/'
    jikan_person = 'jikan_person/'

    for anime_file in os.listdir(data_folder + jikan_anime):
        with open(data_folder + jikan_anime + anime_file) as anime_datafile:
                print("anime: " + anime_file)
                anime_json_data = json.load(anime_datafile)

                anime_title = anime_json_data['title']
                anime_aired = anime_json_data['aired']
                anime_score = anime_json_data['score'][0]
                anime_episodes = anime_json_data['episodes']
                anime_synopsis = anime_json_data['synopsis']
                anime_type = anime_json_data['type']
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

                created_anime.append(Anime(title=anime_title, aired=anime_aired, score=anime_score, num_episodes=anime_episodes, synopsis=anime_synopsis, media_type=anime_type, picture=anime_pic, status=anime_status, youtube_id=anime_youtube, rating=anime_rating, genre=anime_genre))

                # Character
                if 'character' in anime_json_data:
                    for character_list_object in anime_json_data['character']:
                        # print(character_list_object['role'])
                        if character_list_object['role'] == 'Main':
                            character_id = (character_list_object['url'].split('/'))[4]
                            if character_id in existing_character:
                                continue

                            if os.path.exists(data_folder + jikan_character + character_id):
                                with open(data_folder + jikan_character + character_id) as character_datafile:
                                    character_json_data = json.load(character_datafile)

                                    print("char id " + character_id)
                                    # print(list(character_json_data.keys()))
                                    try:
                                        character_name = character_json_data['name']
                                    except KeyError:
                                        continue
                                    
                                    character_japanese_name = character_json_data['name-japanese']
                                    character_about = character_json_data['about']
                                    character_pic = character_json_data['image']

                                    print("Creating character: " + character_id)
                                    created_characters.append(Character(name=character_name, japanese_name=character_japanese_name, about=character_about, picture=character_pic))
                                    existing_character[character_id] = len(created_characters) - 1


                                    # Voice actor
                                    if 'voice-actor' in character_list_object:
                                        for actor_list_object in character_list_object['voice-actor']:
                                            actor_id = (actor_list_object['url'].split('/'))[4]

                                            if actor_id in existing_actor:
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

                                                    created_actors.append(Actor(name=actor_name, language=actor_language, given_name=actor_given_name, birthday=actor_birthday, picture=actor_pic, website=actor_website))
                                                    existing_actor.add(actor_id)

                # Manga
                if 'related' in anime_json_data:
                    related = anime_json_data['related']
                    if 'Adaptation' in anime_json_data['related']:
                        adaptation_obj = related['Adaptation']

                        manga_id = None
                        if isinstance(adaptation_obj[0], list):
                            for list_obj in related['Adaptation']:
                                # print(list_obj)
                                tokens = list_obj[1].split('/')
                                manga_id = tokens[2]
                                # print('ID: ' + manga_id)

                        else:
                            manga = related['Adaptation']
                            manga = manga[1].split('/')
                            manga_id = manga[2]

                        if manga_id in existing_manga:
                            continue

                        if os.path.exists(data_folder + jikan_manga + manga_id):
                            print("manga id: " + manga_id)
                            with open(data_folder + jikan_manga + manga_id) as manga_datafile:
                                manga_json_data = json.load(manga_datafile)

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

                                created_manga.append(Manga(title=manga_title, title_english=manga_title_english, title_japanese=manga_title_japanese, author=manga_author, published=manga_published, score=manga_score, num_chapters=manga_chapters, synopsis=manga_synopsis, media_type=manga_type, picture=manga_picture, status=manga_status, genre=manga_genre))
                                existing_manga.add(manga_id)

    # for anime in created_anime:
    #     db.session.add(anime)

    # for character in created_characters:
    #     db.session.add(character)

    # for actor in created_actors:
    #     db.session.add(actor)

    for manga in created_manga:
        db.session.add(manga)

    

    db.session.commit()
    print("I HAVE COMITTED")

# Go through all the anime
# Get all the anime's static data, check to make sure it's not null if we don't allow it
# Create anime object
# Go through all main characters in the anime
# Get Static character data, check to make sure none of it is null if we don't allow it
# Create character object
# Go through all voice actors of the characters we got
# Get static data, check to make sure none of it is null
# create voice actor object
# anime.characters.add(character), anime.actors.add(actors), character.actors.add(actor)
# go through all of anime's manga
# get static data for manga 
# create manga object
# for each manga get all of the main characters static data, 
# only characters that we haven't already added, check id in a dictionary where value is the index into an added list
# If it's a repeat character, manga.characters.add(character)
# if it's a new character, create character object from static data in the character object
# add new character to manga.characters.add(newcharacter)
# anime.mangas.add(manga)

# Go through all lists of created objects, add them to the session
# commit




# anime_row = Anime(title='TestAnime', year=1988, genre='Comedy', score=8, num_episodes=13, synopsis='Two boys learn the true meaning of friendship', media_type='TV', picture='https:\/\/myanimelist.cdn-dena.com\/images\/anime\/8\/37971.jpg', status='Finished Airing')

# character_row = Character(name='TestCharacter', about="He's a boy with a big heart", japanese_name='(\u30ad\u30e9\u30fb\u30e4\u30de\u30c8)', picture='https:\/\/myanimelist.cdn-dena.com\/images\/characters\/10\/72646.jpg')

# actor_row = Actor(name='TestActor', given_name='\u529b\u4e5f', language='Japanese', birthday='April 13, 1995', picture="https://myanimelist.cdn-dena.com/images/voiceactors/1/42208.jpg")

# manga_row = Manga(title='TestManga', author='MangaAuthor', published="1987", genre='Comedy', score=7, num_chapters=40, synopsis='Two boys learn the true meaning of friendship but in manga form', media_type='Manga', picture='https:\/\/myanimelist.cdn-dena.com\/images\/anime\/8\/37971.jpg', status='Finished')

# anime_row.characters.add(character_row)
# anime_row.mangas.add(manga_row)
# anime_row.actors.add(actor_row)

# Only add this character's anime if that anime is one of the ones we pulled
# character_row.animes.add(anime_row) 

# Only add this character's manga if that manga is one of the ones we pulled
# character_row.mangas.add(manga_row)


# character_row.actors.add(actor_row)

# db.session.add(anime_row)
# db.session.add(character_row)
# db.session.add(actor_row)
# db.session.add(manga_row)

# db.session.commit()