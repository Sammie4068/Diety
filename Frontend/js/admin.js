// Dropdown menu for category and type
const categoryInput = document.querySelector(".cat-dropdown-input");
const catList = document.getElementById("cat-dropdown-list");

categoryInput.addEventListener("click", function () {
  catList.style.display = "block";
});

document.addEventListener("click", function (event) {
  if (event.target !== categoryInput && event.target !== catList) {
    catList.style.display = "none";
  }
});

catList.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    categoryInput.value = event.target.textContent;
    catList.style.display = "none";
  }
});

const typeInput = document.querySelector(".type-dropdown-input");
const typeList = document.getElementById("type-dropdown-list");

typeInput.addEventListener("click", function () {
  typeList.style.display = "block";
});

document.addEventListener("click", function (event) {
  if (event.target !== typeInput && event.target !== typeList) {
    typeList.style.display = "none";
  }
});

typeList.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    typeInput.value = event.target.textContent;
    typeList.style.display = "none";
  }
});

// Posting to API
const uploadBtn = document.querySelector(".upload__btn");
const recipeName = document.getElementById("recipeName");
const recipeImage = document.getElementById("recipeImage");
const recipeType = document.getElementById("recipeType");
const recipeCat = document.getElementById("recipeCat");
const recipePublisher = document.getElementById("recipePublisher");
const recipeTime = document.getElementById("recipeTime");
const recipeIngredients = document.querySelectorAll("#recipeIngredients");
const recipeSteps = document.querySelectorAll("#recipeSteps");

async function postData(data) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const bodydata = await res.json();
    console.log(bodydata);
    // if(bodydata.message == "Success"){

    // }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

uploadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const ingredients = [];
  const steps = [];
  recipeIngredients.forEach((ing) => {
    if (!ing.value) {
      return;
    } else {
      ingredients.push(ing.value);
    }
  });
  recipeSteps.forEach((step) => {
    if (!step.value) {
      return;
    } else {
      steps.push(step.value);
    }
  });
  const recipe = {
    name: recipeName.value,
    image: recipeImage.value,
    type: recipeType.value,
    category: recipeCat.value,
    ingredients: ingredients,
    instructions: steps,
    timer: recipeTime.value,
    publisher: recipePublisher.value,
  };
    postData(recipe);
});

// Adding ingredients input
const ingAddBtn = document.getElementById("addIng");
const ingField = document.querySelector(".upload__column2");

ingAddBtn.addEventListener("click", () => {
  html = ` <input
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description e.g 1kg rice, 2 spoons of salt..."
            id="recipeIngredients"
          />`;
  ingField.insertAdjacentHTML("beforeend", html);
});

const stepAddBtn = document.getElementById("addStep");
const stepsField = document.querySelector(".upload__column3");
let stepsCount = 6;

stepAddBtn.addEventListener("click", () => {
  html = `<label>step ${++stepsCount}</label>
          <input
            type="text"
            required
            name="step-1"
            placeholder="Steps to make the recipe"
            id="recipeSteps"
          />`;
  stepsField.insertAdjacentHTML("beforeend", html);
});
