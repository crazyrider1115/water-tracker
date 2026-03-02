const BASE_URL = "https://water-tracker-backend-l05z.onrender.com";

const email = localStorage.getItem("user");

if (!email) {
  window.location.href = "index.html";
}

function addWater(amount) {
  fetch(`${BASE_URL}/update-water`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, amount })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("waterText").innerText = `${data.water} / 2000 ml`;
  });
}

function goProfile() {
  window.location.href = "profile.html";
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}