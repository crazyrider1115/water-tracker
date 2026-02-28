let total = 2000;
let current = 0;

// Load saved data
window.onload = function () {
  const user = localStorage.getItem("user");

  if (user) {
    document.getElementById("tracker").style.display = "block";

    fetch("http://localhost:3000/get-water", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: user })
    })
    .then(res => res.json())
    .then(data => {
      current = data.water;

      document.getElementById("progress").innerText =
        current + " / " + total + " ml";
    });
  }
};
  const saved = localStorage.getItem("water");
  if (saved) {
    current = parseInt(saved);
    document.getElementById("progress").innerText =
      current + " / " + total + " ml";
  };

// SIGNUP
function signup() {
  const email = document.getElementById("signupEmail").value.trim().toLowerCase();
  const password = document.getElementById("signupPassword").value.trim();

  fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.text())
  .then(data => alert(data));
}

// LOGIN
function login() {
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value.trim();

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => {
    if (!res.ok) throw new Error("Login failed");
    return res.text();
  })
  .then(data => {
    alert(data);

    localStorage.setItem("user", email);
    document.getElementById("tracker").style.display = "block";
  })
  .catch(err => alert(err.message));
}

// WATER TRACKER
function addWater(amount) {
  const email = localStorage.getItem("user");

  fetch("http://localhost:3000/update-water", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, amount })
  })
  .then(res => res.json())
  .then(data => {
    current = data.water;

    document.getElementById("progress").innerText =
      current + " / " + total + " ml";
  });
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}

let percent = (current / total) * 100;
document.getElementById("fill").style.width = percent + "%";
