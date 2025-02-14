// script.js
const basket = document.getElementById('basket');
const object = document.getElementById('object');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');

let score = 0;
let basketPosition = 175; // Initial position of the basket
let objectPosition = { top: 0, left: 175 }; // Initial position of the object
let gameInterval;

// Move the basket with arrow keys
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && basketPosition > 0) {
    basketPosition -= 10; // Move basket left
  } else if (event.key === 'ArrowRight' && basketPosition < 350) {
    basketPosition += 10; // Move basket right
  }
  basket.style.left = `${basketPosition}px`;
});

// Move the object down
function moveObject() {
  objectPosition.top += 5; // Move object down by 5px
  object.style.top = `${objectPosition.top}px`;

  // Check if object is caught by the basket
  if (
    objectPosition.top >= 570 && // Object is near the bottom
    objectPosition.left >= basketPosition && // Object is within the basket's left boundary
    objectPosition.left <= basketPosition + 50 // Object is within the basket's right boundary
  ) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    resetObject();
  }

  // Check if object missed the basket
  if (objectPosition.top >= 600) {
    stopGame();
    alert(`Game Over! Your score is ${score}.`);
  }
}

// Reset object to the top
function resetObject() {
  objectPosition.top = 0;
  objectPosition.left = Math.floor(Math.random() * 380); // Random horizontal position
  object.style.left = `${objectPosition.left}px`;
}

// Start the game
function startGame() {
  if (!gameInterval) {
    gameInterval = setInterval(moveObject, 50); // Update object position every 50ms
  }
}

// Stop the game
function stopGame() {
  clearInterval(gameInterval);
  gameInterval = null;
}

// Reset the game
function resetGame() {
  stopGame();
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  resetObject();
}

// Event listeners for buttons
startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
