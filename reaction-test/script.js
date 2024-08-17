const clickArea = document.getElementById("clickArea");
const clickInstruction = document.getElementById("clickInstruction");
const startButton = document.getElementById("startButton");
const instruction = document.getElementById("instruction");
const result = document.getElementById("result");
const attemptCount = document.getElementById("attemptCount");

let gameActive = false;
let changeTime;
let attempts = 0;
let totalReactionTime = 0;

function startGame() {
  if (attempts >= 3) {
    showFinalResult();
    return;
  }

  gameActive = true;
  startButton.style.display = "none";
  instruction.textContent = "초록색으로 변할 때까지 기다리세요...";
  result.textContent = "";
  clickArea.classList.add("wait");
  clickInstruction.textContent = "대기중...";
  clickArea.classList.remove("pulse");

  const delay = Math.floor(Math.random() * 4000) + 1000;
  setTimeout(changeToGreen, delay);
}

function changeToGreen() {
  if (!gameActive) return;
  clickArea.classList.remove("wait");
  clickArea.classList.add("click");
  clickInstruction.textContent = "클릭!";
  clickArea.classList.add("pulse");
  instruction.textContent = "지금 클릭하세요!";
  changeTime = Date.now();
}

function handleClick() {
  if (!gameActive) return;
  if (clickArea.classList.contains("click")) {
    const reactionTime = Date.now() - changeTime;
    totalReactionTime += reactionTime;
    attempts++;
    result.textContent = `반응 시간: ${reactionTime}ms`;
    attemptCount.textContent = `시도: ${attempts} / 3`;
    gameActive = false;
    clickArea.classList.remove("click", "wait");
    clickArea.classList.remove("pulse");

    if (attempts < 3) {
      startButton.style.display = "block";
      startButton.textContent = "다음 라운드";
    } else {
      showFinalResult();
    }
  } else {
    result.textContent = "너무 빨랐어요! 초록색을 기다려주세요.";
    gameActive = false;
    startButton.style.display = "block";
    startButton.textContent = "다시 시도";
    clickArea.classList.remove("wait");
  }
}

function showFinalResult() {
  const averageTime = Math.round(totalReactionTime / 3);
  localStorage.setItem("averageReactionTime", averageTime);
  window.location.href = "result.html";
}

startButton.addEventListener("click", startGame);
clickArea.addEventListener("click", handleClick);
