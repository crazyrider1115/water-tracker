const BASE_URL = "https://water-tracker-backend-l05z.onrender.com";

console.log("login.js loaded");

function signup() {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  }) // ✅ FIXED HERE
  .then(res => res.text())
  .then(data => alert(data))
  .catch(err => console.error(err)); // optional but useful
}

function goSignup() {
  window.location.href = "signup.html";
}

function login() {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  fetch(`${BASE_URL}/login`, {
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
  .then(() => {
    const status = document.getElementById("status");

    status.innerHTML = "✅ Login successful";
    status.style.color = "#2e7d32";

    localStorage.setItem("user", email);

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1200);
  })
  .catch(err => {
    document.getElementById("status").innerText = err.message;
    document.getElementById("status").style.color = "red";
  });
}