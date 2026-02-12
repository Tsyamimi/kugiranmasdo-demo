// JavaScript Document

// --- MODAL LOGIC (Concert Details) ---
const modal = document.getElementById("concertModal");
const btn = document.getElementById("openModalBtn");
const span = document.querySelector(".close-btn");

if(btn && modal) {
    btn.onclick = () => modal.style.display = "flex";
    if(span) span.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }
}

// --- LIGHTBOX LOGIC ---
// REMOVED the "/" that was here breaking the code

function flipInsideLightbox() {
    const innerCard = document.getElementById('innerCard');
    if(innerCard) {
        innerCard.classList.toggle('is-flipped');
    }
}
function openBrochureLightbox() {
    const lb = document.getElementById('mainLightbox');
    document.getElementById('brochureFlipWrapper').style.display = 'block';
    document.getElementById('flyerZoomWrapper').style.display = 'none';
    document.getElementById('flipBtn').style.display = 'block'; // Show button
    
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function openFlyerLightbox(imgSrc) {
    const lb = document.getElementById('mainLightbox');
    // This part now works because these are siblings
    document.getElementById('brochureFlipWrapper').style.display = 'none';
    document.getElementById('flyerZoomWrapper').style.display = 'block';
    
    document.getElementById('flyer-img').src = imgSrc;
    document.getElementById('flipBtn').style.display = 'none'; 
    
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {

    const lb = document.getElementById('mainLightbox');

    if(lb) lb.style.display = 'none';

    document.body.style.overflow = 'auto';

}



function flipInsideLightbox() {

    const innerCard = document.getElementById('innerCard');

    if(innerCard) innerCard.classList.toggle('is-flipped');

}



// Close on Escape key

document.addEventListener('keydown', (e) => {

    if (e.key === "Escape") closeLightbox();

});