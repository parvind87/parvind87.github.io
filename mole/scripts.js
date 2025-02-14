// script.js
const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const startBtn = document.querySelector('#start-btn');
let score = 0;
let timeLeft = 30;
let timerId;
let moleTimerId;

// Randomly pop up a mole
function popUpMole() {
  const hole = holes[Math.floor(Math.random() * holes.length)];
  const mole = document.createElement('div');
  mole.classList.add('mole');
  hole.appendChild(mole);

  // Remove mole after a random time
  setTimeout(() => {
    mole.remove();
  }, Math.random() * 1000 + 500); // Mole stays for 0.5 to 1.5 seconds

  // Add click event to mole
  mole.addEventListener('click', () => {
    if (mole.classList.contains('up')) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      mole.remove();
    }
  });

  // Make mole appear
  setTimeout(() => {
    mole.classList.add('up');
  }, 10);
}

// Start the game
function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = `Score: ${score}`;
  timeDisplay.textContent = `Time Left: ${timeLeft}`;
  startBtn.disabled = true;

  // Start mole popping up
  moleTimerId = setInterval(popUpMole, 800);

  // Start countdown
  timerId = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = `Time Left: ${timeLeft}`;

    if (timeLeft === 0) {
      clearInterval(timerId);
      clearInterval(moleTimerId);
      alert(`Game Over! Your score is ${score}.`);
      startBtn.disabled = false;
    }
  }, 1000);
}

// Event listener for start button
startBtn.addEventListener('click', startGame);
