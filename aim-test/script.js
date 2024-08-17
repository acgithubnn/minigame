const gameArea = document.getElementById("gameArea");
const target = document.getElementById("target");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const startButton = document.getElementById("startButton");

let score = 0;
let timeLeft = 10;
let gameInterval;
let gameActive = false;
let lastTargetTime;
let reactionTimes = [];

function getRandomPosition(element) {
  const x = Math.random() * (gameArea.offsetWidth - element.offsetWidth);
  const y = Math.random() * (gameArea.offsetHeight - element.offsetHeight);
  return [x, y];
}

function moveTarget() {
  const [x, y] = getRandomPosition(target);
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;

  const size = Math.random() * (50 - 20) + 20;
  target.style.width = `${size}px`;
  target.style.height = `${size}px`;

  lastTargetTime = Date.now();
}

function startGame() {
  score = 0;
  timeLeft = 10;
  reactionTimes = [];
  scoreElement.textContent = score;
  timeElement.textContent = timeLeft;
  startButton.disabled = true;
  gameActive = true;

  target.style.display = "block";
  moveTarget();

  gameInterval = setInterval(() => {
    timeLeft--;
    timeElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(gameInterval);
  target.style.display = "none";
  startButton.disabled = false;
  gameActive = false;

  const avgReactionTime =
    reactionTimes.length > 0
      ? (reactionTimes.reduce((a, b) => a + b) / reactionTimes.length).toFixed(
          2
        )
      : 0;

  localStorage.setItem("finalScore", score);
  localStorage.setItem("avgReactionTime", avgReactionTime);

  window.location.href = "result.html";
}

target.addEventListener("click", () => {
  if (gameActive) {
    const reactionTime = Date.now() - lastTargetTime;
    reactionTimes.push(reactionTime);
    score++;
    scoreElement.textContent = score;
    moveTarget();
  }
});

startButton.addEventListener("click", startGame);

window.addEventListener("resize", () => {
  if (gameActive) {
    moveTarget();
  }
});
