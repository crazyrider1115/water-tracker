console.log("login.js loaded");

function signup() {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  console.log("SENDING:", email, password); // 👈 ADD THIS

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

function goSignup() {
  window.location.href = "signup.html";
}

function login() {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  fetch("http://localhost:3000/login", {
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
    const status = document.getElementById("status");

    status.innerHTML = "✅ Login successful";
    status.style.color = "#2e7d32";

    localStorage.setItem("user", email); // 🔥 IMPORTANT

    console.log("Redirecting..."); // 👈 DEBUG

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1200);
  })
  .catch(err => {
    document.getElementById("status").innerText = err.message;
    document.getElementById("status").style.color = "red";
  });
}
