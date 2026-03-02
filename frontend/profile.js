const email = localStorage.getItem("user");

if (!email) {
  window.location.href = "index.html";
}

document.getElementById("userEmail").innerText = email;

function goHome() {
  window.location.href = "home.html";
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}