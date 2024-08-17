document.addEventListener("DOMContentLoaded", () => {
  const gameCards = document.querySelectorAll(".game-card");

  gameCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      // 클릭된 요소가 실제로 이 카드인지 확인합니다
      if (event.currentTarget === card) {
        const game = card.dataset.game;
        switch (game) {
          case "reaction":
            window.location.href = "reaction-test/index.html";
            break;
          case "aim":
            window.location.href = "aim-test/index.html";
            break;
          // 추후 더 많은 게임을 추가할 수 있습니다
        }
      }
    });
  });
});
