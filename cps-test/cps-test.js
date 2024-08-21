const clickArea = document.getElementById("clickArea");
const clickCount = document.getElementById("clickCount");
const timeLeft = document.getElementById("timeLeft");
const totalClicks = document.getElementById("totalClicks");
const currentCps = document.getElementById("currentCps");
const startButton = document.getElementById("startButton");
const clickMarkers = document.getElementById("clickMarkers");
const gameInfo = document.getElementById("gameInfo");

let clicks = 0;
let timer = 10;
let interval;
let cpsData = [];
let chart;
let isGameRunning = false;

function startGame() {
  if (isGameRunning) return;

  clicks = 0;
  timer = 10;
  cpsData = [];
  isGameRunning = true;
  updateDisplay();
  startButton.classList.add("hidden");
  gameInfo.classList.remove("hidden");
  clickArea.style.cursor = "pointer";
  interval = setInterval(updateTimer, 100);
  initChart();
}

function updateTimer() {
  timer -= 0.1;
  if (timer <= 0) {
    endGame();
  } else {
    timeLeft.textContent = timer.toFixed(1);
    updateCPS();
  }
}

function updateCPS() {
  const currentTime = 10 - timer;
  const cps = clicks / currentTime;
  currentCps.textContent = cps.toFixed(2);
  cpsData.push({ x: currentTime, y: cps });
  updateChart();
}

function endGame() {
  clearInterval(interval);
  isGameRunning = false;
  clickArea.style.cursor = "default";
  startButton.classList.remove("hidden");
  gameInfo.classList.add("hidden");

  const averageCPS = (clicks / 10).toFixed(2);
  saveResults(clicks, averageCPS);

  // 결과 페이지로 리다이렉트
  window.location.href = "result.html";
}

function saveResults(totalClicks, averageCPS) {
  localStorage.setItem("totalClicks", totalClicks);
  localStorage.setItem("averageCPS", averageCPS);
}

function updateDisplay() {
  clickCount.textContent = clicks;
  totalClicks.textContent = clicks;
  timeLeft.textContent = timer.toFixed(1);
}

function addClickMarker(e) {
  const marker = document.createElement("div");
  marker.classList.add("click-marker");
  marker.style.left = `${e.offsetX}px`;
  marker.style.top = `${e.offsetY}px`;
  clickMarkers.appendChild(marker);
  setTimeout(() => clickMarkers.removeChild(marker), 1000);
}

function initChart() {
  const ctx = document.getElementById("cpsChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "CPS",
          data: cpsData,
          borderColor: "rgb(233, 69, 96)",
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: {
            display: true,
            text: "Time (seconds)",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "CPS",
          },
        },
      },
      animation: {
        duration: 0,
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

function updateChart() {
  chart.data.datasets[0].data = cpsData;
  chart.update();
}

clickArea.addEventListener("click", (e) => {
  if (isGameRunning) {
    clicks++;
    updateDisplay();
    addClickMarker(e);
  }
});

startButton.addEventListener("click", startGame);

initChart();
