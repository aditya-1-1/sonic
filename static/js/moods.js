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