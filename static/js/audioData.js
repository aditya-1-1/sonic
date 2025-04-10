const audioData = {
    "pads": [
        { "sound": "/static/audio/beat1.mp3", "name": "Beat 1" },
        { "sound": "/static/audio/beat2.mp3", "name": "Beat 2" },
        { "sound": "/static/audio/beat3.mp3", "name": "Beat 3" },
        { "sound": "/static/audio/beat4.mp3", "name": "Beat 4" },
        { "sound": "/static/audio/beat5.mp3", "name": "Beat 5" },
        { "sound": "/static/audio/beat6.mp3", "name": "Beat 6" },
        { "sound": "/static/audio/beat7.mp3", "name": "Beat 7" },
        { "sound": "/static/audio/beat8.mp3", "name": "Beat 8" },
        { "sound": "/static/audio/beat9.mp3", "name": "Beat 9" },
        { "sound": "/static/audio/Beat10.mp3", "name": "Beat 10" },
        { "sound": "/static/audio/arijit.mp3", "name": "Arijit" },
        { "sound": "/static/audio/bollywood.mp3", "name": "Bollywood" },
        { "sound": "/static/audio/lofi.mp3", "name": "Lofi" },
        { "sound": "/static/audio/soulful.mp3", "name": "Soulful" },
        { "sound": "/static/audio/night.mp3", "name": "Night" }
    ]
};

document.addEventListener("DOMContentLoaded", function () {
    const padContainer = document.querySelector(".pad-container");
    const activePads = new Map(); // Store active audio elements

    audioData.pads.forEach(padData => {
        const pad = document.createElement("div");
        pad.classList.add("pad");
        pad.setAttribute("data-sound", padData.sound);

        pad.innerHTML = `
            <span class="loader"></span>
            <span class="beat-name">${padData.name}</span>
        `;

        let isReverse = false;
        let audio = null;

        pad.addEventListener("click", () => {
            if (audio && !audio.paused) {
                // Stop the audio if it's playing
                audio.pause();
                audio.currentTime = 0;
                pad.classList.remove('playing', 'reverse');
            } else {
                // Start new audio
                audio = new Audio(padData.sound);
                audio.loop = true;
                audio.play();
                
                // Toggle rotation direction
                isReverse = !isReverse;
                pad.classList.add('playing');
                if (isReverse) {
                    pad.classList.add('reverse');
                } else {
                    pad.classList.remove('reverse');
                }

                // Handle audio ending
                audio.addEventListener('ended', () => {
                    if (!audio.loop) {
                        pad.classList.remove('playing', 'reverse');
                    }
                });
            }
        });

        padContainer.appendChild(pad);
    });
});
