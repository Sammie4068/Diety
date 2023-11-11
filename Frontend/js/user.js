const username = localStorage.getItem("username");
const email = localStorage.getItem("email");
const phone = localStorage.getItem("phone");
const id = localStorage.getItem("id");
const editBtn = document.getElementById("edit__btn");
const inputs = document.querySelectorAll("input");
const nameInput = document.querySelector(".name");
const emailInput = document.querySelector(".email");
const phoneInput = document.querySelector(".phone");
const profileInfo = document.querySelector(".profile-info");

nameInput.value = username;
emailInput.value = email;
phoneInput.value = phone;

function edit() {
  inputs.forEach((input) => {
    input.removeAttribute("readonly");
    input.style.borderBottom = "2px solid #2980b9";
  });
  const markup = `<a href="#" class="button" id="saveBtn" onclick="save()">Save</a>
      </div>`;
  editBtn.classList.add("hidden");
  profileInfo.insertAdjacentHTML("afterend", markup);
}
editBtn.addEventListener("click", edit);

async function save() {
  try {
    const newData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      id,
    };

    const res = await fetch(`http://localhost:3000/api/v1/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    const data = await res.json();
    if (data.message == "success") {
      localStorage.setItem("username", newData.name);
      localStorage.setItem("email", newData.email);
      localStorage.setItem("phone", newData.phone);

      const saveBtn = document.getElementById("saveBtn");
      editBtn.classList.remove("hidden");
      saveBtn.classList.add("hidden");
      inputs.forEach((input) => {
        input.setAttribute("readonly", "readonly");
        input.style.borderBottom = "1px solid #333";
      });
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
