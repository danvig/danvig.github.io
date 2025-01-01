// Bingo items array
const bingoItems = [
    "Robert has a tantrum",
    "Robert makes someone else cry",
    "Robert gets fed up with Daniel’s unusual sense of humour",
    "Someone asks Robert to turn the music down",
    "Robert gets pissy because of that",
    "Adrian leaves to make Tamales",
    "Ollie and Harry up past midnight",
    "Teresa yells at her kids",
    "Certain guests stay past midnight and interrupt clock tower",
    "Julian constantly texting Piper",
    "Mandy takes lovely photos",
    "Robert gets pissy because we wanna play clock tower",
    "Robert locks himself in the bedroom",
    "Robert gets pissy because Daniel targets him in clock tower.",
    "Jono gets killed off first in clock tower.",
    "Daniel attacks Teresa for literally no reason (he's probably autistic)",
    "David says something racist",
    "Amanda puts on RuPaul",
    "Another one",
    "Another one"
];

const bingoContainer = document.getElementById('bingo-container');

// Load marked items from localStorage
const markedItems = JSON.parse(localStorage.getItem('markedBingoItems')) || [];

// Function to render bingo items
function renderBingo() {
    bingoContainer.innerHTML = '';
    bingoItems.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'bingo-item';
        div.textContent = item;

        if (markedItems.includes(index)) {
            div.classList.add('marked');
        }

        div.addEventListener('click', () => toggleMark(index));

        bingoContainer.appendChild(div);
    });
}

// Toggle marking an item
function toggleMark(index) {
    if (markedItems.includes(index)) {
        const itemIndex = markedItems.indexOf(index);
        markedItems.splice(itemIndex, 1);
    } else {
        markedItems.push(index);
    }

    localStorage.setItem('markedBingoItems', JSON.stringify(markedItems));
    renderBingo();
}

// Initial render
renderBingo();