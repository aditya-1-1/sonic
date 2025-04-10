// Select the play/pause button and the GIF container
const playPauseBtn = document.getElementById("playPauseBtn");
const gifContainer = document.querySelector(".gif-container");

// Track play/pause state
let isPlaying = false;

playPauseBtn.addEventListener("click", function () {
    const icon = playPauseBtn.querySelector("i");

    if (isPlaying) {
        // Pause the GIF animation
        gifContainer.classList.add("paused");
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
    } else {
        // Resume the GIF animation
        gifContainer.classList.remove("paused");
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
    }

    // Toggle play state
    isPlaying = !isPlaying;
});
const audio = document.getElementById('audio');
const gif = document.querySelector('.animated-gif');
const songInfo = document.getElementById('currentSong');
let currentSong = '';

// Load songs from JSON file
let allSongs = [];

// Fetch songs from JSON file
fetch('/static/js/songs.json')
    .then(response => response.json())
    .then(data => {
        allSongs = data.songs;
        console.log('Songs loaded:', allSongs);
    })
    .catch(error => console.error('Error loading songs:', error));

// Function to get songs by mood
function getSongsByMood(mood) {
    return allSongs.filter(song => song.mood.toLowerCase() === mood.toLowerCase());
}

// Function to display songs
function displaySongs(songs) {
    const songsContainer = document.getElementById('songs-container');
    songsContainer.innerHTML = '';
    
    if (songs.length === 0) {
        songsContainer.innerHTML = '<p>No songs found for this mood</p>';
        return;
    }
    
    songs.forEach(song => {
        const songElement = document.createElement('div');
        songElement.className = 'song-card';
        songElement.innerHTML = `
            <img src="${song.photo_url}" alt="${song.title}">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
            <audio controls>
                <source src="${song.audio_url}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;
        songsContainer.appendChild(songElement);
    });
}

// Add click event listeners to mood buttons
document.addEventListener('DOMContentLoaded', () => {
    const moodButtons = document.querySelectorAll('.mood-button');
    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mood = button.getAttribute('data-mood');
            console.log('Clicked mood:', mood);
            const songs = getSongsByMood(mood);
            console.log('Found songs:', songs);
            displaySongs(songs);
        });
    });
});

// Play song when a mood is clicked
document.querySelectorAll('.submenu a').forEach(item => {
    item.addEventListener('click', function() {
        
        const song = this.getAttribute('data-song');
        if (currentSong !== song) {
            audio.src = song;
                audio.play();
                currentSong = song;
                songInfo.textContent = `Playing: ${song}`;
            gif.classList.add('playing');
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
    });
});

// Update GIF when audio ends
audio.addEventListener('ended', () => {
gif.classList.remove('playing');
playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
});