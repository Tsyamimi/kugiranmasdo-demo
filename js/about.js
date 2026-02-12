// JavaScript Document
const memberData = {
    "1": {
        titleImg: "img/asmawi.png",
        description: "There’s Asmawi, the wizard of the guitar. Whether he’s shredding solos or strumming sweet tunes, this guy’s got the strings under his control. His fingers dance on the fretboard like magic, creating melodies that stick with you long after the song ends. Cool, collected, and always on point, Asmawi brings the extra spice to Masdo’s sound."
    },
    "2": {
        titleImg: "img/ali.png",
        description: "Meet Ali: the charismatic frontman with a voice that’ll make you swoon and a guitar riff that’ll make you groove. He’s got the star power and the charm that makes you wanna sing along with every word. From his smooth vocals to his effortless stage presence, Ali's the heartbeat of Masdo. When he’s not rocking the mic, he’s probably plotting the next big hit."
    },
    "3": {
        titleImg: "img/putuceri.png",
        description: "Say hello to Putuceri, the bassist with the smoothest grooves in town. He’s the guy who keeps the rhythm tight and the beats fresh. With his steady hands and cool attitude, Putuceri is the unsung hero who adds that extra oomph to every song. Want to feel the music in your bones? Just follow his bassline."
    }
};

const titleDisplay = document.getElementById('detailsTitle');
const textDisplay = document.getElementById('detailsText');
const thumbs = document.querySelectorAll('.thumb-wrapper');

thumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
        // --- NEW: Handle Selected State ---
        // Remove 'selected' class from all thumbnails
        thumbs.forEach(t => t.classList.remove('selected'));
        // Add 'selected' class to the clicked thumbnail
        this.classList.add('selected');
        // ----------------------------------

        const id = this.getAttribute('data-id');
        const data = memberData[id];

        if (data) {
            // Hide current content (Slide down and fade out)
            titleDisplay.classList.add('fade');
            textDisplay.classList.add('fade');

            // Wait for the hide animation to finish
            setTimeout(() => {
                // Swap the content
                titleDisplay.src = data.titleImg;
                textDisplay.innerText = data.description;
                
                // Show new content (Slide up and fade in)
                setTimeout(() => {
                    titleDisplay.classList.remove('fade');
                    textDisplay.classList.remove('fade');
                }, 50); 
            }, 400); 
        }
    });
});
const audioPlayer = document.getElementById('mainAudio');
const songCards = document.querySelectorAll('.song-card');

songCards.forEach(card => {
    card.addEventListener('click', () => {
        // Check if this specific card is already open
        const isAlreadyFlipped = card.classList.contains('flipped');

        // 1. Close ALL cards (this makes other open cards slide back smoothly)
        songCards.forEach(c => c.classList.remove('flipped'));

        if (!isAlreadyFlipped) {
            // 2. Open THIS card
            card.classList.add('flipped');
            const songUrl = card.getAttribute('data-audio');
            
            if (songUrl) {
                audioPlayer.src = songUrl;
                audioPlayer.play();
            }
        } else {
            // 3. If it was already open, we just pause the music 
            // The CSS takes care of sliding the pictures back to center
            audioPlayer.pause();
        }
    });
});