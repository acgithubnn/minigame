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
const difficultyDescription = document.getElementById("difficultyDescription");

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
  canFlip = false; // 미리 보기 중에는 카드를 뒤집을 수 없게 설정

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

  // 모든 카드를 1초 동안 보여줍니다
  cards.forEach((card) => {
    card.textContent = card.dataset.emoji;
    card.classList.add("flipped");
  });

  // 1초 후 카드를 다시 뒤집고 게임을 시작합니다
  setTimeout(() => {
    cards.forEach((card) => {
      card.textContent = "";
      card.classList.remove("flipped");
    });
    canFlip = true; // 이제 카드를 뒤집을 수 있게 설정

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
    endGame(true);
  }
}

function endGame(isSuccess = false) {
  canFlip = false;
  const timeTaken = getTimeTaken();
  localStorage.setItem("memoryGameScore", score);
  localStorage.setItem("memoryGameTime", timeTaken);
  localStorage.setItem("memoryGameDifficulty", difficulty);
  window.location.href = "/card-test/result.html";
}

function getTimeTaken() {
  const totalSeconds =
    difficulty === "easy" ? 60 : difficulty === "medium" ? 90 : 120;
  const secondsTaken = totalSeconds - timeLeft;
  const minutes = Math.floor(secondsTaken / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsTaken % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function setDifficulty(level) {
  difficulty = level;
  [easyBtn, mediumBtn, hardBtn].forEach((btn) =>
    btn.classList.remove("active")
  );
  document.getElementById(`${level}Btn`).classList.add("active");
  updateDifficultyDescription();
}

function updateDifficultyDescription() {
  let description;
  switch (difficulty) {
    case "easy":
      description = "Easy: 6쌍의 카드, 60초";
      break;
    case "medium":
      description = "Medium: 8쌍의 카드, 90초";
      break;
    case "hard":
      description = "Hard: 12쌍의 카드, 120초";
      break;
  }
  difficultyDescription.textContent = description;
}

easyBtn.addEventListener("click", () => setDifficulty("easy"));
mediumBtn.addEventListener("click", () => setDifficulty("medium"));
hardBtn.addEventListener("click", () => setDifficulty("hard"));
startBtn.addEventListener("click", startGame);

setDifficulty("medium"); // Set default difficulty
updateDifficultyDescription(); // Initial description update
