const tracks = [
    
    {
        title: "Arijit Singh",
        artist: "Artist",
        image: "static\\images\\image copy.png",
        audio: "static\\audio\\arijit.mp3"
    },
    {
        title: "Justin Bieber",
        artist: "Artist",
        image: "static\\images\\image copy 4.png",
        audio: "static\\audio\\justin.mp3"
    },
    {
        title: "Hariharan",
        artist: "Artist",
        image: "static\\images\\image copy 2.png",
        audio: "static\\audio\\hariharan.mp3"
    },
    {
        title: "Alan Walker",
        artist: "Artist",
        image: "static\\images\\image copy 3.png",
        audio: "static\\audio\\kygo.mp3"
    },
    {
        title: "Billie Eilish",
        artist: "Artist",
        image: "static\\images\\image.png",
        audio: "static\\audio\\billie.mp3"
    },
    
    {
        title: "Glory",
        artist: "Yo Yo Honey Singh",
        image: "https://tse2.mm.bing.net/th?id=OIP.ejyQME9-36oMc9RKztpqyQHaEK&pid=Api&P=0&h=180",
        audio: "static\\audio\\glory.mp3"
    },
    {
        title: "Yeh Jawaani",
        artist: "Pritam",
        image: "https://tse3.mm.bing.net/th?id=OIP.SYOJc1Ghu9wsLMDCorhFiQHaIg&pid=Api&P=0&h=180",
        audio: "static\\audio\\badtameez.mp3"
    },
    {
        title: "Still Rolling",
        artist: "Shubh",
        image: "https://tse1.mm.bing.net/th?id=OIP.XgSDVMJ1JwOe_0nOzNnkxwHaFj&pid=Api&P=0&h=180",
        audio: "static\\audio\\still.mp3"
    },
    {
        title: "Animal",
        artist: "Manan Bhardwaj, Vishal Mishra, Jaani",
        image: "https://tse4.mm.bing.net/th?id=OIP.raJCZ85vDTelZDnG2LbH-wHaKX&pid=Api&P=0&h=180",
        audio: "static\\audio\\animal.mp3"
    },
    {
        title: "Ghost",
        artist: "Diljit Dosanjh",
        image: "https://tse2.mm.bing.net/th?id=OIP.IJyIxpjonzB2Xzv8d_HXGgHaM4&pid=Api&P=0&h=180",
        audio: "static\\audio\\ghost.mp3"
    },
 
    {
        title: "Ekantik Vartalaap",
        artist: "Shrii hit Premanand Govind Sharan Ji Maharaj",
        image: "https://tse1.mm.bing.net/th?id=OIP.NA1KoLAojR1eaF4lYH8x0wHaE7&pid=Api&P=0&h=180",
        audio: "static\\audio\\vartalaap.mp3"
    },
    {
        title: "Srimad Bhagwat Geeta",
        artist: "Hare Krishna Podcast",
        image: "https://tse2.mm.bing.net/th?id=OIP.RcHKLQDWxhYbkFsvsfmEaQHaFj&pid=Api&P=0&h=180",
        audio: "static\\audio\\bhagwat.mp3"
    },
    {
        title: "Shiv Puran",
        artist: "Anupama Dhunsoiya",
        image: "https://tse3.mm.bing.net/th?id=OIP.m1D58vg8ysKpRTIS_z7ElgHaDt&pid=Api&P=0&h=180",
        audio: "static\\audio\\shiv.mp3"
    },
    {
        title: "Shree Krishna Leela",
        artist: "Spotify Studios",
        image: "https://tse2.mm.bing.net/th?id=OIP.bIBVTtNn_5bsp7RY9BnmFwHaGL&pid=Api&P=0&h=180",
        audio: "static\\audio\\leela.mp3"
    },
    {
        title: "Chanakya Neeti",
        artist: "Vishal S",
        image: "https://tse4.mm.bing.net/th?id=OIP.Hof0v1At2vDxsJQGc8Z1WgHaFj&pid=Api&P=0&h=180",
        audio: "static\\audio\\vartalaap.mp3"
    },
    
    {
        title: "Late Night Cool",
        artist: "Soothing Tunes",
        image: "https://tse1.mm.bing.net/th?id=OIP.FqKec4Hh8jsEmlRVahyRHQHaHa&pid=Api&P=0&h=180",
        audio: "static\\audio\\night.mp3"
    },
    {
        title: "Bollywood Sufi",
        artist: "Mystical Sufi",
        image: "https://tse4.mm.bing.net/th?id=OIP.YGG5vvnsH4N-IikALY89DAHaDw&pid=Api&P=0&h=180",
        audio: "static\\audio\\bollywood.mp3"
    },
    {
        title: "Soulful Tunes",
        artist: "Heartful Melodies",
        image: "https://tse4.mm.bing.net/th?id=OIP.ObJS2IpSOoUielTXDlGUlwHaD4&pid=Api&P=0&h=180",
        audio: "static\\audio\\soulful.mp3"
    },
    {
        title: "It's Okay Not To Be Okay",
        artist: "Chill Vibes",
        image: "https://tse1.mm.bing.net/th?id=OIP.jxWG0o5RgSzwhbjUKXZ8IAHaKe&pid=Api&P=0&h=180",
        audio: "static\\audio\\ok.mp3"
    },
    {
        title: "Lofi Beats",
        artist: "Relaxing Lofi",
        image: "https://diffusionart.co/wp-content/uploads/2023/04/Lofi-Music-Anime-Graphics-Wallpapers9.png",
        audio: "static\\audio\\lofi.mp3"
    }
];


let currentTrackIndex = 0; 
let audioElement = new Audio();
let isLooping = false;

// Add error handling for audio
audioElement.addEventListener('error', (e) => {
    console.error('Audio error:', e);
    alert('Error loading audio. Please try another track.');
});

audioElement.addEventListener('stalled', () => {
    console.warn('Audio stalled - trying to reload');
    audioElement.load();
});


function playTrack(index) {
    const track = tracks[index];

   
    document.getElementById("nowPlayingImage").src = track.image;
    document.getElementById("nowPlayingTitle").textContent = track.title;
    document.getElementById("nowPlayingArtist").textContent = track.artist;

    
    // Convert backslashes to forward slashes for compatibility
    const fixedAudioPath = track.audio.replace(/\\/g, '/');
    audioElement.src = fixedAudioPath;
    currentTrackIndex = index;

    // Add error handling for play
    audioElement.play().catch(error => {
        console.error('Play failed:', error);
        alert('Unable to play audio. Please check your connection and try again.');
    });
    document.getElementById("playPauseButton").innerHTML = '<i class="fa-solid fa-pause"></i>';
    document.getElementById("playbar").style.display = "flex"; 
}


function togglePlayPause() {
    if (audioElement.paused) {
        audioElement.play();
        document.getElementById("playPauseButton").innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        audioElement.pause();
        document.getElementById("playPauseButton").innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}


function playNext() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(currentTrackIndex);
}


function playPrevious() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentTrackIndex);
}


audioElement.addEventListener("timeupdate", () => {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    document.getElementById("musicTracker").value = progress;
});


document.getElementById("musicTracker").addEventListener("input", (event) => {
    const seekTime = (audioElement.duration * event.target.value) / 100;
    audioElement.currentTime = seekTime;
});


document.addEventListener("DOMContentLoaded", () => {
    const playButtons = document.querySelectorAll(".play-btn");
    playButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => playTrack(index));
    });

    
    document.getElementById("playPauseButton").addEventListener("click", togglePlayPause);
    
    
    document.getElementById("nextButton").addEventListener("click", playNext);
    document.getElementById("prevButton").addEventListener("click", playPrevious);
    
    
    document.getElementById("loopButton").addEventListener("click", toggleLoop);
});


audioElement.addEventListener("ended", () => {
    if (!isLooping) {
        playNext();
    }
});

audioElement.addEventListener('emptied', () => {
    console.log('Audio source emptied');
});

audioElement.addEventListener('waiting', () => {
    console.log('Audio waiting for data');
});

audioElement.addEventListener('canplay', () => {
    console.log('Audio ready to play');
});


document.getElementById("searchInput").addEventListener("input", function(event) {
    const query = event.target.value.toLowerCase();
    const filteredTracks = tracks.filter(track => 
        track.title.toLowerCase().includes(query) || 
        track.artist.toLowerCase().includes(query)
    );

    // Update the UI with the filtered tracks
    updateTrackList(filteredTracks);
});

function updateTrackList(filteredTracks) {
    const trackListElement = document.getElementById("trackList");
    
    if (filteredTracks.length === 0) {
        trackListElement.style.display = "none"; // Hide track list if empty
        return;
    } 
    
    trackListElement.style.display = "block"; // Show track list when searching
    trackListElement.innerHTML = ""; // Clear the current list

    filteredTracks.forEach((track, index) => {
        const trackElement = document.createElement("div");
        trackElement.classList.add("item");
        trackElement.innerHTML = `
            <img src="${track.image}" alt="${track.title}">
            <div class="play-btn">
                <span><i class="fa-solid fa-play"></i></span>
            </div>
            <h4>${track.title}</h4>
            <p>${track.artist}</p>
        `;
        trackListElement.appendChild(trackElement);
        
        // Add click event to play the track
        trackElement.querySelector('.play-btn').addEventListener('click', () => playTrack(index));
    });

    // Re-attach event listeners to the new play buttons
    document.querySelectorAll(".play-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => playTrack(index));
    });
}

// Modify search event listener to check if input is empty
document.getElementById("searchInput").addEventListener("input", function(event) {
    const query = event.target.value.toLowerCase().trim();
    
    if (query === "") {
        document.getElementById("trackList").style.display = "none"; // Hide when empty
        return;
    }

    const filteredTracks = tracks.filter(track => 
        track.title.toLowerCase().includes(query) || 
        track.artist.toLowerCase().includes(query)
    );

    updateTrackList(filteredTracks);
});

// Initially hide the track list
document.getElementById("trackList").style.display = "none";

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".heart-btn").forEach((btn, index) => {
        btn.addEventListener("click", function () {
            const track = tracks[index]; 

            fetch("/like_song", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: track.title,
                    artist: track.artist,
                    image: track.image,
                    audio: track.audio
                })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error("Error liking song:", error);
            });
        });
    });
});
