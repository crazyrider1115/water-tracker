const BASE_URL = "https://water-tracker-backend-l05z.onrender.com";

const email = localStorage.getItem("user");

if (!email) window.location.href = "index.html";

let goal = parseInt(localStorage.getItem("goal")) || 2000;
let streak = parseInt(localStorage.getItem("streak")) || 0;

document.addEventListener("DOMContentLoaded", () => {
  fetchWater();
  startBubbles();
  updateStreak();
});

function fetchWater() {
  fetch(`${BASE_URL}/get-water`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email })
  })
  .then(res => res.json())
  .then(data => updateUI(data.water));
}

function addWater(amount) {
  fetch(`${BASE_URL}/update-water`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, amount })
  })
  .then(res => res.json())
  .then(data => updateUI(data.water));
}

function setGoal() {
  const input = document.getElementById("goalInput").value;
  if (!input) return;

  goal = parseInt(input);
  localStorage.setItem("goal", goal);
  fetchWater();
}

function updateUI(currentWater) {

  document.getElementById("waterText").innerText =
    `${currentWater} / ${goal} ml`;

  let percent = (currentWater / goal) * 100;

  const wave = document.getElementById("waveContainer");

  if (percent >= 100) {
    document.getElementById("message").innerText = "🎉 Goal reached!";
    streak++;
    localStorage.setItem("streak", streak);
    updateStreak();
  }

  if (percent > 100) {
    document.getElementById("message").innerText = "⚠️ Goal exceeded!";
    wave.classList.add("exceeded");
    percent = 100;
  } else {
    wave.classList.remove("exceeded");
  }

  wave.style.height = percent + "%";
}

function updateStreak() {
  document.getElementById("streakText").innerText =
    `🔥 Streak: ${streak} days`;
}

function resetWater() {
  fetch(`${BASE_URL}/reset-water`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
  .then(res => res.json())
  .then(data => updateUI(data.water));
}

function startBubbles() {
  setInterval(() => {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.left = Math.random() * 100 + "%";
    bubble.style.animationDuration = (Math.random() * 3 + 2) + "s";

    document.getElementById("bubbles").appendChild(bubble);

    setTimeout(() => bubble.remove(), 5000);
  }, 300);
}

function goProfile() {
  window.location.href = "profile.html";
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}