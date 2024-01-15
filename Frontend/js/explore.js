const tokenStr = localStorage.getItem("token");
if (!tokenStr) {
  window.location = "index.html";
}

const search = document.querySelector(".search");
const searchInput = document.querySelector(".search__field");
const results = document.querySelector(".results");

search.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;
  if (!searchTerm) return;

  renderSpinner(results);
  getRecipes(
    `${baseURL}recipes/name/${searchTerm
      .toLowerCase()
      .replace(searchTerm.charAt(0), searchTerm.charAt(0).toUpperCase())}`,
    results
  );
});

// Get recipes
const baseURL = "http://localhost:3000/api/v1/";

async function getRecipes(url, parentEle) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.length === 0) renderError(parentEle);

    // renderSpinner(parentEle)

    //  Preview
    parentEle.innerHTML = "";
    setTimeout(() => {
      data.map((bodydata) => {
        let markup = `<li class="preview">
              <a class="preview__link preview__link--active" href="#${bodydata.id}">
              <figure class="preview__fig">
                  <img src="${bodydata.image}" alt="${bodydata.name}" />
              </figure>
              <div class="preview__data">
                  <h4 class="preview__title">${bodydata.name}</h4>
                  <p class="preview__publisher">${bodydata.publisher}</p>
              </div>
              </a>
          </li>`;
        parentEle.insertAdjacentHTML("afterbegin", markup);
      });
    }, 1000);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

//spinner
const renderSpinner = function (parentEle) {
  if (parentEle.innerHTML === "") {
    const markup = `<div class="spinner">
      <svg>
        <use href="./img/icons.svg#icon-loader"></use>
      </svg>
    </div>`;
    parentEle.insertAdjacentHTML("afterend", markup);

    const spinner = document.querySelector(".spinner");
    setTimeout(() => {
      spinner.style.display = "none";
      parentEle.innerHTML = ``;
    }, 1500);
  } else {
    return;
  }
};

const renderError = function (parentEle) {
  const markup = `<div class="error">
    <div>
      <svg>
        <use href="./img/icons.svg#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>We could not find that recipe, try another one</p>
  </div>`;
  parentEle.innerHTML = "";
  parentEle.insertAdjacentHTML("beforeend", markup);
};

// View
const recipeContainer = document.querySelector(".recipe");

async function showRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const res = await fetch(`http://localhost:3000/api/v1/recipes/id/${id}`);
    const data = await res.json();
    console.log(data)
    const markup = `<figure class="recipe__fig">
    <img src="${data[0].image}" alt="${data[0].name}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${data[0].name}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="./img/icons.svg#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        data[0].timer
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <button class="btn--round" onclick="addBookmark(${id})">
      <svg class="bookmarkBtn">
        <use href="./img/icons.svg#icon-bookmark${
          localStorage.getItem("bookmarks").includes(id) ? `-fill` : ``
        }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${data[0].ingredients
      .map((ing) => {
        return `<li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="./img/icons.svg#icon-check"></use>
      </svg>
      <div class="recipe__description">
        ${ing.replace(ing.charAt(0), ing.charAt(0).toUpperCase())}
      </div>
    </li>`;
      })
      .join(" ")}
 </ul>
  </div>
  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${data[0].publisher.replace(
        data[0].publisher.charAt(0),
        data[0].publisher.charAt(0).toUpperCase()
      )}</span>.
    </p>
    <div class="down_btn">
    <button
      class="btn--small recipe__btn"
      onclick="recipeModal(${id})"
    >
      <span>Instructions</span>
       <svg class="">
        <use href="./img/icons.svg#icon-instruction"></use>
      </svg> 
    </button>
    <button
      class="btn--small"
    >
      <span> Nutrition Facts </span> 
         <svg class="">
        <use href="./img/icons.svg#icon-instruction"></use>
      </svg>  
    </button>
    <button
      class="btn--small"
    >
      <span> Meet Nutritionist </span>
      <svg class="search__icon">
        <use href="./img/icons.svg#icon-arrow-right"></use>
      </svg>
    </button>
    </div>
  </div>`;
    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", markup);

    const localBmks = JSON.parse(localStorage.getItem("bookmarks"));
    const bookmarkList = document.querySelector(".bookmarks__list");
    localBmks.forEach((bm) => {
      getRecipes(`http://localhost:3000/api/v1/recipes/id/${bm}`, bookmarkList);
    });
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

window.addEventListener("hashchange", showRecipe);
window.addEventListener("load", showRecipe)
window.addEventListener("load", displayRecipes)

//fetching all recipes
async function displayRecipes() {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/recipes`);
    const data = await res.json();

    data.data.map((bodydata) => {
      let markup = `<li class="preview">
              <a class="preview__link preview__link--active" href="#${bodydata.id}">
              <figure class="preview__fig">
                  <img src="${bodydata.image}" alt="${bodydata.name}" />
              </figure>
              <div class="preview__data">
                  <h4 class="preview__title">${bodydata.name}</h4>
                  <p class="preview__publisher">${bodydata.publisher}</p>
              </div>
              </a>
          </li>`;
      results.insertAdjacentHTML("afterbegin", markup);
    });
  } catch (err) {
    console.error(err);
  }
}

// filter dropdown
const filterInput = document.querySelector(".filter");
const filterList = document.getElementById("filter-dropdown");

filterInput.addEventListener("click", function () {
  if (filterList.style.display == "block") {
    filterList.style.display = "none";
  } else {
    filterList.style.display = "block";
  }
});

document.addEventListener("click", function (event) {
  if (event.target !== filterInput && event.target !== filterList) {
    filterList.style.display = "none";
  }
});

filterList.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    filterInput.value = event.target.textContent;
    filterList.style.display = "none";
    let filtered = filterInput.value;
    const searchTerm = searchInput.value;
    if (!searchTerm && filtered) {
      getRecipes(`${baseURL}recipes/category/${filtered}`, results);
    }

    getRecipes(
      `${baseURL}recipes/${searchTerm
        .toLowerCase()
        .replace(
          searchTerm.charAt(0),
          searchTerm.charAt(0).toUpperCase()
        )}/${filtered}`,
      results
    );
  }
});

// direction modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

async function recipeModal(id) {
  const div = document.createElement("ul");
  div.insertAdjacentHTML(
    "beforeend",
    `<button class="close-modal" onclick="closeModal()">&times;</button>`
  );

  const response = await fetch(`http://localhost:3000/api/v1/recipes/id/${id}`);
  const data = await response.json();

  const instructionsArray = data[0].instructions;
  for (let i = 0; i < instructionsArray.length; i++) {
    div.insertAdjacentHTML(
      "beforeend",
      `<li class="instructionList">${instructionsArray[i]}</li>`
    );
  }
  div.classList.add("instructions");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  overlay.addEventListener("click", closeModal);
  modal.append(div);
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  modal.innerHTML = "";
}

let bookmarked;

function addBookmark(id) {
  const localBmks = JSON.parse(localStorage.getItem("bookmarks"));
  const bookmarkBtn = document.querySelector(".bookmarkBtn");
  const bookmarkList = document.querySelector(".bookmarks__list");
  if (localBmks.includes(id)) {
    bookmarked = false;
    const i = localBmks.indexOf(id);
    localBmks.splice(i, 1);
  } else {
    bookmarked = true;
    localBmks.push(id);
  }

  localStorage.setItem("bookmarks", JSON.stringify(localBmks));

  if (!localBmks.includes(id)) {
    bookmarkBtn.innerHTML = `<use href="./img/icons.svg#icon-bookmark"></use>`;
  } else {
    bookmarkBtn.innerHTML = `<use href="./img/icons.svg#icon-bookmark-fill"></use>`;
  }
  
  localBmks.forEach((bm) => {
    getRecipes(`http://localhost:3000/api/v1/recipes/id/${bm}`, bookmarkList);
  });
}
