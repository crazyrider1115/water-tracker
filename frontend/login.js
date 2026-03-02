const BASE_URL = "https://water-tracker-backend-l05z.onrender.com";

function goSignup() {
  window.location.href = "signup.html";
}

function login() {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  })
  .then(res => {
    if (!res.ok) return res.text().then(err => { throw new Error(err); });
    return res.text();
  })
  .then(() => {
    localStorage.setItem("user", email);
    window.location.href = "home.html";
  })
  .catch(err => {
    document.getElementById("status").innerText = err.message;
  });
}