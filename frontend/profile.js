window.onload = function () {
  const email = localStorage.getItem("user");

  if (!email) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("userEmail").innerText = email;
};

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

function goHome() {
  window.location.href = "home.html";
}