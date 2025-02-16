from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'your_secret_key'
db = SQLAlchemy(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), nullable=False, unique=True)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String(150), nullable=False)

# Liked Songs Model
class LikedSong(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    artist = db.Column(db.String(200), nullable=False)
    image = db.Column(db.String(500), nullable=True)
    audio = db.Column(db.String(500), nullable=False)

    user = db.relationship('User', backref=db.backref('liked_songs', lazy=True))


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

# Route for Groovepad (To Fix BuildError)
@app.route('/audio/groovepad')
def groovepad():
    return render_template('groovepad.html')

# Route for Creator (To Fix BuildError)
@app.route('/creator')
def creator():
    return render_template('creator.html')

# User Login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('pswd')
        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
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
