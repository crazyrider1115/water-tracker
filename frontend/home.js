const BASE_URL = "https://water-tracker-backend-l05z.onrender.com";

const email = localStorage.getItem("user");

if (!email) {
  window.location.href = "index.html";
}

// ✅ FIX: always number
let goal = parseInt(localStorage.getItem("goal")) || 2000;

window.onload = () => {
  updateUI();
};

// ➕ ADD WATER
function addWater(amount) {
  fetch(`${BASE_URL}/update-water`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, amount })
  })
  .then(res => res.json())
  .then(data => {
    updateUI(data.water);
  });
}

// 🎯 SET GOAL
function setGoal() {
  const input = document.getElementById("goalInput").value;

  if (!input || isNaN(input)) return;

  goal = parseInt(input);
  localStorage.setItem("goal", goal);

  updateUI();
}

// 🔄 UPDATE UI
function updateUI(currentWater) {

  if (currentWater === undefined) {
    fetch(`${BASE_URL}/get-water`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email })
    })
    .then(res => res.json())
    .then(data => updateUI(data.water));
    return;
  }

  // ✅ FIXED GOAL DISPLAY
  document.getElementById("waterText").innerText =
    `${currentWater} / ${goal} ml`;

  // 🌊 CALCULATE FILL
  let percent = (currentWater / goal) * 100;
  if (percent > 100) percent = 100;

  // 🌊 APPLY FILL
  document.getElementById("waveContainer").style.height = percent + "%";
}

// 👤 PROFILE
function goProfile() {
  window.location.href = "profile.html";
}

// 🚪 LOGOUT
function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}