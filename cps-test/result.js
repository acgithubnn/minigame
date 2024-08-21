document.addEventListener("DOMContentLoaded", () => {
  const totalClicks = localStorage.getItem("totalClicks");
  const averageCPS = localStorage.getItem("averageCPS");

  document.getElementById("totalClicks").textContent = totalClicks;
  document.getElementById("averageCPS").textContent = averageCPS;

  const tier = calculateTier(parseFloat(averageCPS));
  displayTierResult(tier);

  document.getElementById("retryButton").addEventListener("click", () => {
    window.location.href = "cps-test/index.html";
  });
});

function calculateTier(cps) {
  if (cps < 6)
    return {
      name: "Bronze",
      icon: "🥉",
      description: "Keep practicing, you can do better!",
    };
  if (cps < 6.6)
    return {
      name: "Silver",
      icon: "🥈",
      description: "Good job, but there's room for improvement.",
    };
  if (cps < 7.2)
    return {
      name: "Gold",
      icon: "🥇",
      description: "Great performance! You're above average.",
    };
  if (cps < 7.6)
    return {
      name: "Platinum",
      icon: "💎",
      description: "Excellent! You're in the top tier of clickers.",
    };
  if (cps < 8)
    return {
      name: "Diamond",
      icon: "💠",
      description: "Amazing speed! You're among the elite.",
    };
  return {
    name: "Challenger",
    icon: "🏆",
    description: "Incredible! You're a clicking machine!",
  };
}

function displayTierResult(tier) {
  const tierName = document.getElementById("tierName");
  const tierIcon = document.getElementById("tierIcon");
  const tierDescription = document.getElementById("tierDescription");

  tierName.textContent = tier.name;
  tierIcon.textContent = tier.icon;
  tierDescription.textContent = tier.description;

  tierName.className = `tier-${tier.name.toLowerCase()}`;
  tierIcon.className = `tier-${tier.name.toLowerCase()}`;
}
