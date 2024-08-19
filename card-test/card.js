const emojis = [
  "😀",
  "😎",
  "🤔",
  "🥳",
  "🚀",
  "🌈",
  "🍕",
  "🎸",
  "🐱",
  "🐶",
  "🦄",
  "🍦",
];
let cards = [];
let flippedCards = [];
let score = 0;
let canFlip = false;
let timeLeft = 0;
let timerInterval;
let difficulty = "medium";

const gameBoard = document.getElementById("gameBoard");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const easyBtn = document.getElementById("easyBtn");
const mediumBtn = document.getElementById("mediumBtn");
const hardBtn = document.getElementById("hardBtn");

function createCard(emoji) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.emoji = emoji;
  card.addEventListener("click", flipCard);
  return card;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startGame() {
  if (timerInterval) clearInterval(timerInterval);
  gameBoard.innerHTML = "";
  cards = [];
  flippedCards = [];
  score = 0;
  scoreElement.textContent = score;
  canFlip = true;

  let gameEmojis, gridColumns, timeLimit;
  switch (difficulty) {
    case "easy":
      gameEmojis = emojis.slice(0, 6);
      gridColumns = 3;
      timeLimit = 60;
      break;
    case "medium":
      gameEmojis = emojis.slice(0, 8);
      gridColumns = 4;
      timeLimit = 90;
      break;
    case "hard":
      gameEmojis = emojis.slice(0, 12);
      gridColumns = 4;
      timeLimit = 120;
      break;
  }

  gameEmojis = [...gameEmojis, ...gameEmojis];
  shuffleArray(gameEmojis);
  gameBoard.style.gridTemplateColumns = `repeat(${gridColumns}, 1fr)`;

  gameEmojis.forEach((emoji) => {
    const card = createCard(emoji);
    cards.push(card);
    gameBoard.appendChild(card);
  });

  timeLeft = timeLimit;
  updateTimer();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  timeElement.textContent = `${minutes}:${seconds}`;
}

function flipCard() {
  if (!canFlip || this.classList.contains("flipped")) return;

  this.textContent = this.dataset.emoji;
  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    canFlip = false;
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    score += 10;
    scoreElement.textContent = score;
  } else {
    card1.textContent = "";
    card2.textContent = "";
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }

  flippedCards = [];
  canFlip = true;

  if (document.querySelectorAll(".flipped").length === cards.length) {
    clearInterval(timerInterval);
    setTimeout(() => {
      alert(
        `Congratulations! You've completed the game with a score of ${score}`
      );
    }, 500);
  }
}

function endGame() {
  canFlip = false;
  alert(`Time's up! Your final score is ${score}`);
}

function setDifficulty(level) {
  difficulty = level;
  [easyBtn, mediumBtn, hardBtn].forEach((btn) =>
    btn.classList.remove("active")
  );
  document.getElementById(`${level}Btn`).classList.add("active");
}

easyBtn.addEventListener("click", () => setDifficulty("easy"));
mediumBtn.addEventListener("click", () => setDifficulty("medium"));
hardBtn.addEventListener("click", () => setDifficulty("hard"));
startBtn.addEventListener("click", startGame);

setDifficulty("medium"); // Set default difficulty
