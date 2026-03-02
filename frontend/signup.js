const BASE_URL = "https://water-tracker-backend-l05z.onrender.com";

function signup() {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  })
  .then(res => res.text())
  .then(data => {
    document.getElementById("status").innerText = data;

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  });
}

function goLogin() {
  window.location.href = "index.html";
}