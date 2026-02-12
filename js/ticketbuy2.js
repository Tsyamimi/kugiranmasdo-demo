// JavaScript Document
// JavaScript Document

function selectCategory(name, price) {
    const grid = document.querySelector('.venue-grid');
    const allMapBoxes = document.querySelectorAll('.seat-box');
    const allListItems = document.querySelectorAll('.cat-item');

    // 1. Clear previous active states
    allMapBoxes.forEach(b => b.classList.remove('active-box'));
    allListItems.forEach(item => item.classList.remove('active-list'));

    // 2. Find and highlight the list item
    const targetListItem = document.querySelector(`.cat-item[data-cat="${name}"]`);
    if (targetListItem) targetListItem.classList.add('active-list');

    // 3. Highlight the map boxes
    // If VVIP is clicked from the list, highlight all boxes; 
    // If a specific box was clicked (handled in the event listener), only that one stays active.
    const targetMapBoxes = document.querySelectorAll(`.seat-box[data-cat="${name}"]`);
    targetMapBoxes.forEach(box => box.classList.add('active-box'));
    
    grid.classList.add('selection-active');
    
    // Optional: console.log instead of alert to prevent "distortion" during interaction
    console.log(`Linked selection: ${name} at RM ${price}`);
}

// Revised click listeners for Map Boxes
document.querySelectorAll('.seat-box').forEach(box => {
    box.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevents double-triggering
        
        const cat = this.getAttribute('data-cat');
        const price = this.getAttribute('data-price');
        const boxLabel = this.getAttribute('data-box');

        // Trigger the shared logic
        selectCategory(cat, price);

        // If it's a specific VVIP box, narrow the highlight to ONLY this box
        if (cat === "VVIP") {
            document.querySelectorAll('.seat-box[data-cat="VVIP"]').forEach(b => b.classList.remove('active-box'));
            this.classList.add('active-box');
            console.log(`Specific box linked: ${boxLabel}`);
        }
    });
});
// 1. Toggles the VVIP menu and highlights ALL VVIP boxes on the map initially
// 1. Toggles the VVIP menu and highlights ALL VVIP boxes on the map initially
function toggleVVIPSelector() {
    selectCategory('VVIP', 1200);
    document.getElementById('vvip-status').innerText = "Choose Box Number:";
}

// 2. Selects the specific box from the list
function selectSpecificBox(boxLabel, event) {
    event.stopPropagation(); // Prevents closing the menu when clicking a number
    
    // Highlight the specific map box
    const allMapBoxes = document.querySelectorAll('.seat-box');
    allMapBoxes.forEach(b => b.classList.remove('active-box'));
    
    const targetBox = document.querySelector(`.seat-box[data-box="${boxLabel}"]`);
    if (targetBox) {
        targetBox.classList.add('active-box');
        targetBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Update the list text
    document.getElementById('vvip-status').innerText = "Selected: " + boxLabel;

    // Highlight the small number in the grid
    document.querySelectorAll('#vvip-box-grid span').forEach(s => s.classList.remove('selected-num'));
    event.target.classList.add('selected-num');

    console.log("User specifically chose: " + boxLabel);
}

// 3. Keep your existing Map click logic, but add sync back to the list
document.querySelectorAll('.seat-box').forEach(box => {
    box.addEventListener('click', function() {
        const cat = this.getAttribute('data-cat');
        const boxLabel = this.getAttribute('data-box');
        
        if (cat === "VVIP") {
            // If user clicks Map Box 5, update the list text and show the grid
            document.querySelector('.vvip-row').classList.add('active-list');
            document.getElementById('vvip-status').innerText = "Selected: " + boxLabel;
            
            // Highlight the corresponding number in the small grid
            document.querySelectorAll('#vvip-box-grid span').forEach(s => {
                if(s.innerText == boxLabel.replace("Box ", "")) s.classList.add('selected-num');
                else s.classList.remove('selected-num');
            });
        }
    });
});
let currentPrice = 0;
let currentSelection = "";
let selectedBank = "";

// Triggered when Rockzone or Cat 1 is clicked
function selectCategory(name, price) {
    const grid = document.querySelector('.venue-grid');
    const allMapBoxes = document.querySelectorAll('.seat-box');
    const allListItems = document.querySelectorAll('.cat-item');

    // Reset previous selection visuals
    allMapBoxes.forEach(b => b.classList.remove('active-box'));
    allListItems.forEach(item => item.classList.remove('active-list'));

    // Highlight map & list
    const targetListItem = document.querySelector(`.cat-item[data-cat="${name}"]`);
    if (targetListItem) targetListItem.classList.add('active-list');
    document.querySelectorAll(`.seat-box[data-cat="${name}"]`).forEach(box => box.classList.add('active-box'));
    grid.classList.add('selection-active');

    // ACTIVATE CHECKOUT BAR
    activateCheckout(name, price);
}

// Triggered when specific VVIP number is clicked
function selectSpecificBox(boxLabel, event) {
    event.stopPropagation();
    const price = 1200;
    
    // Logic for individual VVIP box highlight (Keep your existing map highlight code here)
    const allMapBoxes = document.querySelectorAll('.seat-box');
    allMapBoxes.forEach(b => b.classList.remove('active-box'));
    const targetBox = document.querySelector(`.seat-box[data-box="${boxLabel}"]`);
    if (targetBox) targetBox.classList.add('active-box');

    // ACTIVATE CHECKOUT BAR
    activateCheckout(`VVIP (${boxLabel})`, price);
}

function activateCheckout(name, price) {
    currentPrice = price;
    currentSelection = name;

    const bar = document.getElementById('checkout-bar');
    document.getElementById('summary-label').innerText = "Selected: " + name;
    document.getElementById('summary-price').innerText = "RM " + price;
    
    // Make the bar appear
    bar.classList.add('checkout-bar-visible');
}

function openPaxModal() {
    // Small 150ms delay so the user sees the button press animation
    setTimeout(() => {
        document.getElementById('pax-cat-name').innerText = currentSelection;
        calculateTotal();
        document.getElementById('paxModal').style.display = 'flex';
    }, 150);
}

function calculateTotal() {
    const count = document.getElementById('pax-count').value;
    const total = count * currentPrice;
    document.getElementById('pax-total-price').innerText = "RM " + total.toLocaleString();
}

let selectedBankUrl = ""; // To store the destination URL

function setBank(bankName) {
    // 1. Define the bank links
    const bankLinks = {
        'Maybank': 'https://www.maybank2u.com.my/',
        'CIMB': 'https://www.cimbclicks.com.my/clicks/#/'
    };

    // 2. Save the URL and name
    selectedBank = bankName;
    selectedBankUrl = bankLinks[bankName];

    // 3. Visual feedback: highlight the selected button
    document.querySelectorAll('.bank-btn').forEach(btn => {
        btn.classList.remove('selected-bank');
    });
    
    // Find the button that was clicked and add the class
    event.currentTarget.classList.add('selected-bank');
}

function proceedToPayment() {
    if (!selectedBankUrl) {
        alert("Please select a bank to proceed with your payment.");
        return;
    }

    const finalTotal = document.getElementById('pax-total-price').innerText;
    const confirmPay = confirm(`You are being redirected to ${selectedBank}.\nTotal to pay: ${finalTotal}\n\nProceed?`);

    if (confirmPay) {
        // Redirect the user to the bank
        window.location.href = selectedBankUrl;
    }
}

function closePaxModal() {
    document.getElementById('paxModal').style.display = 'none';
}