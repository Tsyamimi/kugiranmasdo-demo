// JavaScript Document
document.querySelectorAll('.btn-ticket').forEach((button, index) => {
    button.addEventListener('click', () => {
        // You can link to actual URLs here
        // window.location.href = "https://ticket-link.com";
        
        alert("Redirecting to Ticket Page for show #" + (index + 1));
        
        // Visual feedback
        button.innerText = "LOADING...";
        setTimeout(() => {
            button.innerText = "TICKET";
        }, 2000);
    });
});

document.querySelectorAll('.btn-presale').forEach(button => {
    button.addEventListener('click', () => {
        alert("Pre-sale is currently exclusive to Fan Club members!");
    });
});