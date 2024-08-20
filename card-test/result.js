document.addEventListener("DOMContentLoaded", function () {
  const finalScore = localStorage.getItem("memoryGameScore") || 0;
  const timeTaken = localStorage.getItem("memoryGameTime") || "00:00";
  const difficulty = localStorage.getItem("memoryGameDifficulty") || "Medium";

  document.getElementById("finalScore").textContent = finalScore;
  document.getElementById("timeTaken").textContent = timeTaken;
  document.getElementById("difficulty").textContent = difficulty;

  const performanceMessage = document.getElementById("performanceMessage");
  if (finalScore > 80) {
    performanceMessage.textContent =
      "훌륭합니다! 당신의 기억력은 정말 인상적입니다!";
  } else if (finalScore > 60) {
    performanceMessage.textContent =
      "잘 했어요! 계속 연습하면 더 좋아질 거예요.";
  } else {
    performanceMessage.textContent =
      "좋은 시도였어요! 더 많이 연습하면 실력이 향상될 거예요.";
  }

  document
    .getElementById("playAgainBtn")
    .addEventListener("click", function () {
      window.location.href = "index.html";
    });

  document
    .getElementById("backToMenuBtn")
    .addEventListener("click", function () {
      // 메인 메뉴 페이지가 있다고 가정합니다. 없다면 index.html로 리다이렉트하세요.
      window.location.href = "index.html";
    });
});
