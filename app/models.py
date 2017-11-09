from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import CheckConstraint

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
    title = db.Column(db.String(80), nullable=False)
    title_english = db.Column(db.String(80))
    title_japanese = db.Column(db.String(80))
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
    picture = db.Column(db.Text)
    role = db.Column(db.String(80))
    
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
