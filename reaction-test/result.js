document.addEventListener("DOMContentLoaded", function () {
  const averageTime = localStorage.getItem("averageReactionTime");
  const averageTimeElement = document.getElementById("averageTime");
  const tierElement = document.getElementById("tier");
  const messageElement = document.getElementById("message");

  averageTimeElement.textContent = `평균 반응 시간: ${averageTime}ms`;

  let tier, message, tierClass;

  if (averageTime < 150) {
    tier = "챌린저";
    message =
      "당신의 반응 속도는 정말 놀랍습니다! 프로게이머가 되어보는 건 어떨까요?";
    tierClass = "tier-challenger";
  } else if (averageTime < 180) {
    tier = "다이아몬드";
    message = "대단한 반응 속도네요! 상위 1%의 실력자입니다.";
    tierClass = "tier-diamond";
  } else if (averageTime < 200) {
    tier = "플래티넘";
    message =
      "훌륭한 반응 속도입니다. 조금만 더 연습하면 다이아몬드도 가능해요!";
    tierClass = "tier-platinum";
  } else if (averageTime < 230) {
    tier = "골드";
    message =
      "평균 이상의 반응 속도를 가지고 계시네요. 꾸준히 연습하면 더 좋아질 거예요!";
    tierClass = "tier-gold";
  } else if (averageTime < 250) {
    tier = "실버";
    message = "나쁘지 않은 반응 속도입니다. 조금 더 연습해보세요!";
    tierClass = "tier-silver";
  } else {
    tier = "브론즈";
    message =
      "아직 개선의 여지가 많아요. 하지만 걱정하지 마세요, 연습하면 반드시 좋아집니다!";
    tierClass = "tier-bronze";
  }

  tierElement.textContent = `티어: ${tier}`;
  tierElement.className = `result-tier ${tierClass}`;
  messageElement.textContent = message;

  // 요소들을 순차적으로 나타나게 하는 애니메이션
  const elements = [
    averageTimeElement,
    tierElement,
    messageElement,
    document.getElementById("retryButton"),
  ];
  elements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    setTimeout(() => {
      el.style.transition = "opacity 0.5s, transform 0.5s";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 200);
  });
});
