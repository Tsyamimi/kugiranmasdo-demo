// JavaScript Document
// Get DOM elements
const modal = document.getElementById("concertModal");
const btn = document.getElementById("openModalBtn");
const span = document.getElementsByClassName("close-btn")[0];

// Open modal when button is clicked
btn.onclick = function() {
    modal.style.display = "flex";
}

// Close modal when (x) is clicked
span.onclick = function() {
    modal.style.display = "none";
}

// Close modal when clicking outside the box
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');

// 1. Open Lightbox
document.querySelectorAll('.lightbox-trigger img').forEach(image => {
    image.onclick = () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = image.src;
    };
});

// 2. Close Lightbox (Clicking 'X' or the background)
lightbox.onclick = (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
};