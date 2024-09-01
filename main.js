// Initialize Howler.js with a sample song
var sound = new Howl({
    src: ['audio/song.mp3'], // Replace with the actual song file path
    html5: true,
    onplay: function() {
        // Update UI when the song starts playing
        requestAnimationFrame(updateProgress);
        document.getElementById('play-pause-btn').querySelector('img').src = 'images/pause-icon.png';
    },
    onpause: function() {
        // Update UI when the song is paused
        document.getElementById('play-pause-btn').querySelector('img').src = 'images/play-icon.png';
    },
    onend: function() {
        // Reset UI when the song ends
        document.getElementById('play-pause-btn').querySelector('img').src = 'images/play-icon.png';
    }
});

// Play/Pause functionality
var playPauseBtn = document.getElementById('play-pause-btn');
playPauseBtn.addEventListener('click', function() {
    if (sound.playing()) {
        sound.pause();
    } else {
        sound.play();
    }
});

// Update progress bar
var progressBar = document.getElementById('progress-bar');
function updateProgress() {
    var seek = sound.seek() || 0;
    progressBar.value = (seek / sound.duration()) * 100;
    if (sound.playing()) {
        requestAnimationFrame(updateProgress);
    }
}

// Change song position on progress bar input
progressBar.addEventListener('input', function() {
    var seekTime = (progressBar.value / 100) * sound.duration();
    sound.seek(seekTime);
});

// Placeholder for previous and next button functionality
document.getElementById('prev-btn').addEventListener('click', function() {
    // Logic to play the previous track
    console.log('Previous button clicked');
});

document.getElementById('next-btn').addEventListener('click', function() {
    // Logic to play the next track
    console.log('Next button clicked');
});
