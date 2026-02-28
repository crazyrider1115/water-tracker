let total = 2000;
let current = 0;

window.onload = function () {
  const email = localStorage.getItem("user");

  if (!email) {
    window.location.href = "login.html";
    return;
  }

  // 👤 title
  document.getElementById("title").innerText =
    email + "'s water goal for the day";

  // 🎯 load saved goal
  const savedGoal = localStorage.getItem("goal");
  if (savedGoal) {
    total = parseInt(savedGoal);
  }

  document.getElementById("goalInput").value = total;

  // 💧 fetch water
  fetch("https://water-tracker-backend-l05z.onrender.com/get-water", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  })
  .then(res => res.json())
  .then(data => {
    current = data.water;
    updateUI();
  });
};

// ➕ add water
function addWater(amount) {
  const email = localStorage.getItem("user");

  fetch("https://water-tracker-backend-l05z.onrender.com/update-water", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, amount })
  })
  .then(res => res.json())
  .then(data => {
    current = data.water;
    updateUI();
  });
}

// 🎨 UI UPDATE (CLEAN VERSION)
function updateUI() {
    document.getElementById("waterText").innerText =
  current + " ml / " + total + " ml";
  let percent = Math.floor((current / total) * 100);
  if (percent > 100) percent = 100;

  // 🌊 background water
  if (current <= total) {
    document.body.style.background =
  `linear-gradient(to top, rgba(0,188,212,0.9) ${percent}%, #ffffff ${percent}%)`;

    document.getElementById("goalMsg").innerText = "";
  } else {
    // 🔴 overfill
    document.body.style.background =
      `linear-gradient(to top, red ${percent}%, white ${percent}%)`;

    document.getElementById("goalMsg").innerText =
      "⚠️ You exceeded your goal!";
  }

  document.body.style.transition = "background 0.8s ease-in-out";

  // 🔢 floating %
  document.getElementById("floatingPercent").innerText = percent + "%";
}

// 🎯 set goal
function setGoal() {
  const value = document.getElementById("goalInput").value;

  if (!value || value <= 0) {
    alert("Enter valid goal");
    return;
  }

  total = parseInt(value);
  localStorage.setItem("goal", total);

  updateUI();
}

// 🔄 reset water
function resetWater() {
  const email = localStorage.getItem("user");

  if (!confirm("Reset all water?")) return;

  fetch("https://water-tracker-backend-l05z.onrender.com/update-water", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, amount: -current })
  })
  .then(res => res.json())
  .then(data => {
    current = data.water;
    updateUI();
  });
}

// ⚙️ menu
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display =
    menu.style.display === "block" ? "none" : "block";
}

// 🚪 logout
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// 👤 profile
function goProfile() {
  window.location.href = "profile.html";
}