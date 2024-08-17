document.addEventListener("DOMContentLoaded", () => {
  const finalScore = localStorage.getItem("finalScore");
  const avgReactionTime = localStorage.getItem("avgReactionTime");

  document.getElementById("finalScore").textContent = finalScore;
  document.getElementById("avgReactionTime").textContent = avgReactionTime;

  const { tier, message } = calculateTier(
    parseInt(finalScore),
    parseFloat(avgReactionTime)
  );
  document.getElementById("tierResult").textContent = `당신의 티어: ${tier}`;
  document.getElementById("tierMessage").textContent = message;

  document.getElementById("shareButton").addEventListener("click", shareResult);
});

function calculateTier(score, avgReactionTime) {
  const performanceIndex = (score / avgReactionTime) * 1000;

  if (performanceIndex > 30) {
    return {
      tier: "챌린저",
      message: "당신은 에임의 신! 프로게이머를 꿈꾸시나요?",
    };
  } else if (performanceIndex > 25) {
    return {
      tier: "다이아몬드",
      message: "탁월한 실력이에요! 상위 1%의 에임을 가졌네요.",
    };
  } else if (performanceIndex > 20) {
    return {
      tier: "플래티넘",
      message:
        "뛰어난 에임 실력입니다. 조금만 더 연습하면 다이아몬드도 가능해요!",
    };
  } else if (performanceIndex > 15) {
    return {
      tier: "골드",
      message:
        "괜찮은 실력이에요. 꾸준히 연습하면 더 높은 티어에 도전할 수 있어요.",
    };
  } else if (performanceIndex > 10) {
    return {
      tier: "실버",
      message:
        "평균적인 실력입니다. 조금 더 연습하면 금방 골드로 올라갈 수 있어요!",
    };
  } else {
    return {
      tier: "브론즈",
      message: "아직 시작 단계네요. 포기하지 말고 계속 연습해보세요!",
    };
  }
}

function shareResult() {
  const tier = document.getElementById("tierResult").textContent;
  const score = document.getElementById("finalScore").textContent;
  const message = `제 에임 트레이너 결과를 확인해보세요! ${tier}, 점수: ${score}`;

  // 여기에 실제 공유 기능을 구현할 수 있습니다.
  // 예: 소셜 미디어 공유 API 사용
  alert("공유 기능이 곧 추가될 예정입니다!\n" + message);
}
