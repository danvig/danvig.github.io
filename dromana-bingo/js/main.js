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
    "Luke pisses someone off",
    "Luke pisses everybody off",
    "Kelsey goes to bed early",
    "Harrison hates everyone in the morning",
    "Harrison clings to Teresa"
];

// Interface Connect
const bingoContainer = document.getElementById('bingo-container');
const resetButton = document.getElementById('reset-button');
const rulesButton = document.getElementById('rules-button');
const winnerDisplay = document.getElementById('winner-display');
const winnerBanner = document.getElementById('winner-banner');
const bannerText = document.getElementById('banner-text');

// Load marked items and winner from localStorage
const markedItems = JSON.parse(localStorage.getItem('markedBingoItems')) || [];
let winner = localStorage.getItem('bingoWinner') || null;

// Display winner if it exists
if (winner) {
    winnerDisplay.textContent = `${winner}, you have finished`;
    winnerDisplay.style.marginTop = "20px";
    winnerDisplay.style.fontSize = "1.2rem";
    winnerDisplay.style.color = "green";

    // Show winner banner
    winnerBanner.style.display = "block";
    bannerText.textContent = `${winner} You have completed your Bingo card!`;

    // Make the squares unclickable
    makeSquaresUnclickable();
}

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

    if (winner) {
        makeSquaresUnclickable();
    }
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
    checkForBingo();
}

// Check for Bingo
function checkForBingo() {
    const totalSquares = bingoItems.length; // Total number of squares
    const isBlackout = markedItems.length === totalSquares; // Check if all squares are marked

    if (isBlackout) {
        declareWinner(); // Call winner declaration if blackout is achieved
    }
}

// Declare a winner
function declareWinner() {
    if (!winner) { // Only allow one winner
        const name = prompt("Bingo! Enter your name:");
        if (name) {
            winner = name;
            localStorage.setItem('bingoWinner', winner);
            winnerDisplay.textContent = `Bingo Winner: ${winner}`;

            // Update winner display and banner
            winnerDisplay.textContent = `Bingo Winner: ${winner}`;
            winnerBanner.style.display = "block";
            bannerText.textContent = `${winner}! You have completed your Bingo card!`;
            alert(`Congratulations, ${name}!`);

            // Make squares unclickable
            makeSquaresUnclickable();
        }
    }
}

// Disable clicks on all bingo squares
function makeSquaresUnclickable() {
    const squares = document.querySelectorAll('.bingo-item');
    squares.forEach(square => {
        square.style.pointerEvents = 'none'; // Disable pointer events
        square.style.opacity = '0.6'; // Optional: Make squares look disabled
    });
}

// Reset the game
function resetGame() {
    const confirmation = confirm("Resetting the bingo board will reset your progress. Are you sure you want to reset?");
    if (confirmation) {
        markedItems.length = 0;
        localStorage.removeItem('markedBingoItems');
        localStorage.removeItem('bingoWinner');
        winner = null;

        // Hide winner display and banner
        winnerDisplay.textContent = '';
        winnerBanner.style.display = "none";

        renderBingo();
    }
}

// Function to display the rules
function displayRules() {
    // Create the modal container
    const modal = document.createElement('div');
    modal.id = 'rules-modal';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = '#fff';
    modal.style.padding = '20px';
    modal.style.borderRadius = '8px';
    modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    modal.style.zIndex = '1000';
    modal.style.textAlign = 'left';
    modal.style.maxWidth = '90%';
    modal.style.lineHeight = '1.6';

    // Add the rules text
    modal.innerHTML = `
        <h2>How to Play:</h2>
        <ol>
            <li>When an event happens, mark off the square.</li>
            <li>Make sure you are not playing in Incognito Mode/Private Browsing as the site has to recognize your device to save your progress.</li>
            <li>If you win, enter your name and you are crowned the winner. The board will then be locked.</li>
            <li>If you need to start again, click the reset button.</li>
        </ol>
        <button id="close-rules-button" style="
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 1rem;
            color: white;
            background-color: #00bfff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;">Close</button>
    `;

    // Append modal to the body
    document.body.appendChild(modal);

    // Add functionality to close the modal
    document.getElementById('close-rules-button').addEventListener('click', () => {
        modal.remove();
    });
}

// Add event listener to reset button
resetButton.addEventListener('click', resetGame);
rulesButton.addEventListener('click', displayRules);

// Initial render
renderBingo();