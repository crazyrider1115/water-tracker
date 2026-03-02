const BASE_URL = "https://water-tracker-backend-l05z.onrender.com";

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
    if (!res.ok) return res.text().then(err => { throw new Error(err); });
    return res.text();
  })
  .then(() => {
    localStorage.setItem("user", email);

    document.getElementById("status").innerText = "✅ Login successful";
    document.getElementById("status").style.color = "green";

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  })
  .catch(err => {
    document.getElementById("status").innerText = err.message;
    document.getElementById("status").style.color = "red";
  });
}