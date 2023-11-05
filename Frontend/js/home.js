const tokenStr = localStorage.getItem("token");
const username = localStorage.getItem("username");
if (!tokenStr) {
  window.location = "index.html";
}

document.getElementById("helloMsg").innerHTML = `Welcome  ${username.replace(username[0], username[0].toUpperCase())} 👋🏼`;

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

document.querySelector(".logout").addEventListener("click", logout)