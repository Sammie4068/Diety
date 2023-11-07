// const tokenStr = localStorage.getItem("token");
// if (!tokenStr) {
//   window.location = "index.html";
// }

const search = document.querySelector(".search");
const searchInput = document.querySelector(".search__field");
const results = document.querySelector(".results");

search.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;
  if (!searchTerm) return;
  getRecipes(`${baseURL}recipes/category/${searchTerm}`);
});

// Get recipes
const baseURL = "http://localhost:3000/api/v1/";

async function getRecipes(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    renderSpinner(results);
    if (data.length === 0) {
      renderError(recipeContainer);
    }
    // preview
    results.innerHTML = "";
    setTimeout(() => {
      data.map((bodydata) => {
        let markup = `<li class="preview">
              <a class="preview__link preview__link--active" href="#${bodydata.id}">
              <figure class="preview__fig">
                  <img src=".${bodydata.image}" alt="${bodydata.name}" />
              </figure>
              <div class="preview__data">
                  <h4 class="preview__title">${bodydata.name}</h4>
                  <p class="preview__publisher">${bodydata.publisher}</p>
              </div>
              </a>
          </li>`;
        // results.innerHTML = "";
        results.insertAdjacentHTML("afterbegin", markup);
      });
    }, 1000);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

//spinner
const renderSpinner = function (parentEle) {
  if ((parentEle.innerHTML === "")) {
    const markup = `<div class="spinner">
      <svg>
        <use href="./img/icons.svg#icon-loader"></use>
      </svg>
    </div>`;
    parentEle.insertAdjacentHTML("afterbegin", markup);
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
  parentEle.insertAdjacentHTML("afterbegin", markup);
};

// View
const recipeContainer = document.querySelector(".recipe");

async function showRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const res = await fetch(`http://localhost:3000/api/v1/recipes/id/${id}`);
    const data = await res.json();
    console.log(data);

    const markup = `<figure class="recipe__fig">
    <img src=".${data[0].image}" alt="${data[0].name}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${data[0].name}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="./img/icons.svg#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${data[0].timer
        .split(" ")
        .shift()}</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="./img/icons.svg#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${data[0].ingredients
      .split(",")
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
    <a
      class="btn--small recipe__btn"
      href="#"_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="./img/icons.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;

    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

window.addEventListener("hashchange", showRecipe);
// window.addEventListener("load", showRecipe);
// window.addEventListener("load", ()=>{
//   window.open("../frontend/explore.html")
// })
