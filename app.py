from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta
import random
import json
import os


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'your_secret_key'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)


db = SQLAlchemy(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), nullable=False, unique=True)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String(150), nullable=False)

# Song Model
class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    artist = db.Column(db.String(200), nullable=False)
    genre = db.Column(db.String(100), nullable=False)
    mood = db.Column(db.String(100), nullable=False)
    photo_url = db.Column(db.String(500), nullable=True)
    audio_url = db.Column(db.String(500), nullable=False)
    duration = db.Column(db.Integer, nullable=True)  # Duration in seconds
    release_date = db.Column(db.Date, nullable=True)
    lyrics = db.Column(db.Text, nullable=True)

# Liked Songs Model
class LikedSong(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    artist = db.Column(db.String(200), nullable=False)
    image = db.Column(db.String(500), nullable=True)
    audio = db.Column(db.String(500), nullable=False)

    user = db.relationship('User', backref=db.backref('liked_songs', lazy=True))


@app.route('/debug_moods')
def debug_moods():
    # Get all songs and their moods
    songs = Song.query.all()
    result = []
    for song in songs:
        result.append({
            "title": song.title,
            "mood": song.mood,
            "artist": song.artist
        })
    return jsonify(result)

@app.route('/songs_by_mood/<mood>')
def songs_by_mood(mood):
    # Convert mood to lowercase for case-insensitive matching
    mood = mood.lower()
    print(f"Searching for mood: {mood}")  # Debug print
    
    # Load songs from JSON file
    json_path = os.path.join(app.static_folder, 'js', 'songs.json')
    with open(json_path, 'r') as f:
        data = json.load(f)
        all_songs = data['songs']
    
    # Get all unique moods
    all_moods = list(set(song['mood'].lower() for song in all_songs))
    print(f"All moods in JSON: {all_moods}")  # Debug print
    
    # Filter songs by mood
    songs = [song for song in all_songs if song['mood'].lower() == mood]
    print(f"Found {len(songs)} songs")  # Debug print
    
    if songs:
        for song in songs:
            print(f"Song: {song['title']}, Mood: {song['mood']}")  # Debug print
    
    random.shuffle(songs)  # Randomize the list
    songs_data = [{
        "title": s["title"],
        "artist": s["artist"],
        "image": s["photo_url"],
        "audio": s["audio_url"]
    } for s in songs[:10]]  # Limit to 10 songs
    return jsonify(songs_data)


# Home Route
@app.route('/')
def home():
    return render_template('home.html')

# Library Route
@app.route('/library')
def library():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    user_id = session['user_id']
    liked_songs = LikedSong.query.filter_by(user_id=user_id).all()
    
    return render_template('library.html', liked_songs=liked_songs)

# Route for Moods (To Fix BuildError)
@app.route('/moods')
def moods():
    return render_template('moods.html')

# Route for Groovepad
@app.route('/audio/groovepad')
def groovepad():
    return render_template('groovepad.html')

# Route to serve audio files
@app.route('/static/audio/<path:filename>')
def serve_audio(filename):
    return app.send_static_file(f'audio/{filename}')


# User Login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('pswd')
        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            session.permanent = True  
            session['user_id'] = user.id
            session['username'] = user.username
            return redirect(url_for('home'))
        else:
            return "Invalid Credentials", 401  # Return error if login fails

    return render_template('login.html')

# User Signup
@app.route('/signup', methods=['POST'])
def signup():
    username = request.form.get('txt')
    email = request.form.get('email')
    password = request.form.get('pswd')

    if User.query.filter_by(email=email).first():
        return "Email already registered", 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session['user_id'] = new_user.id
    session['username'] = new_user.username

    return redirect(url_for('home'))

# User Logout
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    return redirect(url_for('home'))

# Like a Song
@app.route('/like_song', methods=['POST'])
def like_song():
    if 'user_id' not in session:
        return jsonify({"error": "User not logged in"}), 403

    user_id = session['user_id']
    data = request.json
    title = data.get('title')
    artist = data.get('artist')
    image = data.get('image')
    audio = data.get('audio')

    # Check if the song is already liked
    existing_song = LikedSong.query.filter_by(user_id=user_id, title=title).first()
    if existing_song:
        return jsonify({"message": "Song already liked"}), 200

    new_song = LikedSong(user_id=user_id, title=title, artist=artist, image=image, audio=audio)
    db.session.add(new_song)
    db.session.commit()

    return jsonify({"message": "Song liked successfully"}), 201

# Get Liked Songs
@app.route('/liked_songs', methods=['GET'])
def get_liked_songs():
    if 'user_id' not in session:
        return jsonify({"error": "User not logged in"}), 403

    user_id = session['user_id']
    liked_songs = LikedSong.query.filter_by(user_id=user_id).all()

    songs_list = [
        {
            "title": song.title,
            "artist": song.artist,
            "image": song.image,
            "audio": song.audio
        } for song in liked_songs
    ]

    return jsonify(songs_list), 200

# Run Flask App
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
