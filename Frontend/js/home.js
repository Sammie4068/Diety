//HAM
$(".ham").click(function () {
  if ($("menu").css("left") != "0px") {
    $(this).addClass(" hamburger");
    $("body").append('<div class="overlay" onclick="closer()"></div>');
    $("menu").css("left", "0px");
    $("body").css({ "overflow-y": "hidden" });
  }
});

//CLOSE
$(".close").click(function () {
  $(".overlay").remove();
  if ($("menu").css("left") >= "0px") {
    $(".ham").removeClass(" hamburger");
    $("menu").css("left", "-105%");
    $("body").css({ "overflow-y": "visible" });
  }
});
function closer(type, el) {
  if (type == "modal") {
    $("." + el).remove();
    return 1;
  }
  $(".overlay").remove();
  if ($("menu").css("left") >= "0px") {
    $(".ham").removeClass(" hamburger");
    $("menu").css("left", "-105%");
    $("body").css({ "overflow-y": "visible" });
  }
}

//Scroller Nav
window.onscroll = function () {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    $("nav").css("background-color", "var(--secondary_lite)");
    document.getElementById("roll_back").style.display = "flex";
  } else {
    $("nav").css("background-color", "transparent");
    document.getElementById("roll_back").style.display = "none";
  }
};

// Local Storage
const tokenStr = localStorage.getItem("token");
const username = localStorage.getItem("username");
const helloMsg = document.getElementById("helloMsg");
const exploreBtn = document.querySelector(".explore_btn");
const signoutBtn = document.querySelector(".signoutbtn");
const profileBtn = document.querySelector(".profilebtn");

if (!tokenStr) {
  exploreBtn.innerHTML = "Sign in to Explore";
  exploreBtn.addEventListener("click", () => {
    window.location = "auth.html";
  });
} else {
  exploreBtn.addEventListener("click", () => {
    window.location = "explore.html#9";
  });
  helloMsg.innerHTML = `Welcome  <span class='username'>${username} 👋🏼</span>`;

  profileBtn.classList.remove("hidden");
  signoutBtn.classList.remove("hidden");
  signoutBtn.addEventListener("click", () => {
    logout();
    setTimeout(() => {
      localStorage.clear();
      location.reload();
    }, 1000);
  });
}

const localBmks = JSON.parse(localStorage.getItem("bookmarks"));
const localID = localStorage.getItem("id");

function logout() {
  let data = {
    bookmark: localBmks,
    id: localID,
  };
  addBmk(data);
}

async function addBmk(data) {
  try {
    const res = fetch(`https://diety-k85n.onrender.com/api/v1/user/bookmark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await res.json();
  } catch (err) {
    console.error(err);
  }
}
