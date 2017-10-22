from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import CheckConstraint

# app = Flask(__name__)

# # CORS(app, headers=['Content-Type'])
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///weeb.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Suppress warning

db = SQLAlchemy()

anime_character = db.Table('anime_character',
    db.Column('anime_id', db.Integer, db.ForeignKey('anime.id'), primary_key=True),
    db.Column('character_id', db.Integer, db.ForeignKey('character.id'), primary_key=True)
)

actor_character = db.Table('actor_character',
    db.Column('actor_id', db.Integer, db.ForeignKey('actor.id'), primary_key=True),
    db.Column('character_id', db.Integer, db.ForeignKey('character.id'), primary_key=True)
)

class Anime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=True, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String(80), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    num_episodes = db.Column(db.Integer, nullable=False)
    synopsis = db.Column(db.Text, nullable=False)
    showType = db.Column(db.String(80), nullable=False)
    picture = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(80), nullable=False)

    manga = db.relationship('Manga', backref='anime', uselist=False, lazy=True)
    anime_characters = db.relationship('Anime', secondary=anime_character, backref=db.backref('animes', lazy=True))

    def __repr__(self):
        return '<Anime %r>' % self.title

class Manga(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=True, nullable=False)
    author = db.Column(db.String(80), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String(80), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    num_chapters = db.Column(db.Integer, nullable=False)
    synopsis = db.Column(db.Text, nullable=False)
    showType = db.Column(db.String(80), nullable=False)
    picture = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(80), nullable=False)

    anime_id = db.Column(db.Integer, db.ForeignKey('anime.id'))
    manga_characters = db.relationship('Character', backref=db.backref('manga', lazy=True))

    def __repr__(self):
        return '<Manga %r>' % self.title

class Character(db.Model):
    # __table_args__ = (CheckConstraint('NOT(anime_id IS NULL AND manga_id IS NULL)'),)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    about = db.Column(db.Text, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    birthday = db.Column(db.DateTime)
    japanese_name = db.Column(db.String(80), nullable=False)
    picture = db.Column(db.Text, nullable=False)

    anime_id = db.Column(db.Integer, db.ForeignKey('anime.id'))
    manga_id = db.Column(db.Integer, db.ForeignKey('manga.id'))
    
    anime = db.relationship('Anime', secondary=anime_character, backref=db.backref('characters', lazy=True))
    actors_of_character = db.relationship('Actor', secondary=actor_character, backref=db.backref('characters', lazy=True))

    def __repr__(self):
        return '<Character %r>' % self.name

class Actor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    japanese_name = db.Column(db.String(80), nullable=False)
    birthday = db.Column(db.DateTime)
    picture = db.Column(db.Text, nullable=False)

    characters_of_actor = db.relationship('Character', secondary=actor_character, backref=db.backref('actors', lazy=True))

    def __repr__(self):
        return '<Actor %r>' % self.name