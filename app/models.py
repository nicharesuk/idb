from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import CheckConstraint

# from sqlalchemy.sql import func
# app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///weeb.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Suppress warning

# db = SQLAlchemy(app)

db = SQLAlchemy()

anime_character = db.Table('anime_character',
    db.Column('anime_id', db.Integer, db.ForeignKey('anime.id'), primary_key=True),
    db.Column('character_id', db.Integer, db.ForeignKey('character.id'), primary_key=True)
)

manga_character = db.Table('manga_character',
    db.Column('manga_id', db.Integer, db.ForeignKey('manga.id'), primary_key=True),
    db.Column('character_id', db.Integer, db.ForeignKey('character.id'), primary_key=True)
)

actor_character = db.Table('actor_character',
    db.Column('actor_id', db.Integer, db.ForeignKey('actor.id'), primary_key=True),
    db.Column('character_id', db.Integer, db.ForeignKey('character.id'), primary_key=True)
)

actor_anime = db.Table('actor_anime',
    db.Column('actor_id', db.Integer, db.ForeignKey('actor.id'), primary_key=True),
    db.Column('anime_id', db.Integer, db.ForeignKey('anime.id'), primary_key=True)
)

manga_anime = db.Table('manga_anime',
    db.Column('manga_id', db.Integer, db.ForeignKey('manga.id'), primary_key=True),
    db.Column('anime_id', db.Integer, db.ForeignKey('anime.id'), primary_key=True)
)

class Anime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=True, nullable=False)
    aired = db.Column(db.String(80), nullable=False)
    score = db.Column(db.Float, nullable=False)
    num_episodes = db.Column(db.Integer, nullable=False)
    synopsis = db.Column(db.Text, nullable=False)
    media_type = db.Column(db.String(80), nullable=False)
    picture = db.Column(db.Text, unique=True, nullable=False)
    status = db.Column(db.String(80), nullable=False)
    youtube_id = db.Column(db.String(80))
    rating = db.Column(db.Text)
    genre = db.Column(db.Text)

    characters = db.relationship('Character', secondary=anime_character, back_populates="animes", collection_class=set)
    actors = db.relationship('Actor', secondary=actor_anime, back_populates="animes", collection_class=set)
    mangas = db.relationship('Manga', secondary=manga_anime, back_populates="animes", collection_class=set)

    def __repr__(self):
        return '<Anime %r>' % self.title

class Manga(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=True, nullable=False)
    title_english = db.Column(db.String(80), unique=True)
    title_japanese = db.Column(db.String(80), unique=True)
    author = db.Column(db.Text, nullable=False)
    published = db.Column(db.String(80), nullable=False)
    genre = db.Column(db.Text, nullable=False)
    score = db.Column(db.Float)
    num_chapters = db.Column(db.Integer, nullable=False)
    synopsis = db.Column(db.Text, nullable=False)
    media_type = db.Column(db.String(80), nullable=False)
    picture = db.Column(db.Text, unique=True, nullable=False)
    status = db.Column(db.String(80), nullable=False)

    characters = db.relationship('Character', secondary=manga_character, back_populates="mangas", collection_class=set)
    animes = db.relationship('Anime', secondary=manga_anime, back_populates="mangas", collection_class=set)

    def __repr__(self):
        return '<Manga %r>' % self.title

class Character(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    about = db.Column(db.Text, nullable=False)
    japanese_name = db.Column(db.String(80))
    picture = db.Column(db.Text, unique=True, nullable=False)
    
    actors = db.relationship('Actor', secondary=actor_character, back_populates="characters", collection_class=set)
    mangas = db.relationship('Manga', secondary=manga_character, back_populates="characters", collection_class=set)
    animes = db.relationship('Anime', secondary=anime_character, back_populates="characters", collection_class=set)

    def __repr__(self):
        return '<Character %r>' % self.name

class Actor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    given_name = db.Column(db.String(80))
    language = db.Column(db.String(80), nullable=False)
    birthday = db.Column(db.String(80))
    picture = db.Column(db.Text, unique=True)
    website = db.Column(db.Text)

    characters = db.relationship('Character', secondary=actor_character, back_populates="actors", collection_class=set)
    animes = db.relationship('Anime', secondary=actor_anime, back_populates="actors", collection_class=set)

    def __repr__(self):
        return '<Actor %r>' % self.name

# db.create_all()

# anime_row = Anime(title='TestAnime', year=1988, genre='Comedy', score=8, num_episodes=13, synopsis='Two boys learn the true meaning of friendship', media_type='TV', picture='https:\/\/myanimelist.cdn-dena.com\/images\/anime\/8\/37971.jpg', status='Finished Airing')

# character_row = Character(name='TestCharacter', about="He's a boy with a big heart", japanese_name='(\u30ad\u30e9\u30fb\u30e4\u30de\u30c8)', picture='https:\/\/myanimelist.cdn-dena.com\/images\/characters\/10\/72646.jpg')

# actor_row = Actor(name='TestActor', given_name='\u529b\u4e5f', language='Japanese', birthday='April 13, 1995', picture="https://myanimelist.cdn-dena.com/images/voiceactors/1/42208.jpg")

# manga_row = Manga(title='TestManga', author='MangaAuthor', year=1987, genre='Comedy', score=7, num_chapters=40, synopsis='Two boys learn the true meaning of friendship but in manga form', media_type='Manga', picture='https:\/\/myanimelist.cdn-dena.com\/images\/anime\/8\/37971.jpg', status='Finished')

# anime_row.characters.add(character_row)
# anime_row.mangas.add(manga_row)
# anime_row.actors.add(actor_row)

# character_row.animes.add(anime_row)
# character_row.mangas.add(manga_row)
# character_row.actors.add(actor_row)

# actor_row.characters.add(character_row)
# actor_row.animes.add(anime_row)

# manga_row.characters.add(character_row)
# manga_row.animes.add(anime_row)

# db.session.add(anime_row)
# db.session.add(character_row)
# db.session.add(actor_row)
# db.session.add(manga_row)

# db.session.commit()
