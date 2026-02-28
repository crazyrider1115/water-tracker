function signup() {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.text())
  .then(data => {
    document.getElementById("status").innerHTML = "✅ " + data;
    document.getElementById("status").style.color = "green";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  });
}

function goLogin() {
  window.location.href = "login.html";
}

//// 🌊 water cursor effect
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener("mousemove", (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(e.clientX, e.clientY, 50, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0, 188, 212, 0.3)";
  ctx.fill();
});