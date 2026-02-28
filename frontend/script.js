const BASE_URL = "https://water-tracker-backend-l05z.onrender.com";

let total = 2000;
let current = 0;

// 🚀 LOAD ON START
window.onload = function () {
  const email = localStorage.getItem("user");

  if (email) {
    document.getElementById("tracker").style.display = "block";

    fetch(BASE_URL + "/get-water", {
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
  }
};

// 🔐 SIGNUP
function signup() {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  fetch(BASE_URL + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.text())
  .then(data => {
    alert(data);
  });
}

// 🔐 LOGIN
function login() {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  fetch(BASE_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => {
    if (!res.ok) throw new Error("Invalid credentials");
    return res.text();
  })
  .then(data => {
    alert("✅ Login successful");

    localStorage.setItem("user", email);
    document.getElementById("tracker").style.display = "block";

    // load water
    fetch(BASE_URL + "/get-water", {
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
  })
  .catch(err => alert(err.message));
}

// 💧 ADD WATER
function addWater(amount) {
  const email = localStorage.getItem("user");

  fetch(BASE_URL + "/update-water", {
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

// 🎨 UPDATE UI
function updateUI() {
  document.getElementById("progress").innerText =
    current + " / " + total + " ml";

  let percent = Math.floor((current / total) * 100);
  if (percent > 100) percent = 100;

  document.getElementById("fill").style.width = percent + "%";
}

// 🚪 LOGOUT
function logout() {
  localStorage.removeItem("user");
  location.reload();
}