const dashboard = document.getElementById("dashboard");
const userManagement = document.getElementById("user-management");
const userList = document.getElementById("user-list");
const formContainer = document.getElementById("user-form-container");
const recipeManagement = document.getElementById("recipe-management");
const recipeForm = document.getElementById("recipe-form-container");
const recipeList = document.getElementById("recipe-list");

const searchBar = document.getElementById("recipe-search");
const userSearch = document.getElementById("user-search");

function showDashboard() {
  hideAllContent();
  dashboard.style.display = "block";
}
function addTab(container, list, form) {
  hideAllContent();
  container.style.display = "block";
  list.style.display = "none";
  form.style.display = "block";
}

function listTab(container, list, form) {
  hideAllContent();
  container.style.display = "block";
  form.style.display = "none";
  list.style.display = "block";
}

function showCategoryManagement() {
  hideAllContent();
  document.getElementById("category-management").style.display = "block";
}
function showAnalytics() {
  hideAllContent();
  document.getElementById("analytics").style.display = "block";
}
function showSettings() {
  hideAllContent();
  document.getElementById("settings").style.display = "block";
}

function showNutritionist() {
  hideAllContent();
  document.getElementById("nutritionist-dashboard").style.display = "block";
}

function logout() {
  window.location = "index.html";
}

function hideAllContent() {
  var contents = document.getElementsByClassName("dashboard-content");
  for (var i = 0; i < contents.length; i++) {
    contents[i].style.display = "none";
  }
}

//dashboard numbers
async function displayDashboardStats() {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/register`);
    const data = await res.json();
    const number = data.number;

    const resp = await fetch(`http://localhost:3000/api/v1/recipes`);
    const recData = await resp.json();
    const recNum = recData.number;

    document.getElementById("total-users").textContent = number;
    document.getElementById("total-recipes").textContent = recNum;
    // Assuming you have a categories array
    document.getElementById("total-categories").textContent = 0;
  } catch (err) {
    console.error(err);
  }
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

// Function to display recipes in the list
async function displayRecipes() {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/recipes`);
    const data = await res.json();
    const recipes = data.data;

    const recipeItems = document.getElementById("recipe-items");
    recipeItems.innerHTML = "";

    searchBar.addEventListener("input", () => {
      const searchTerm = searchBar.value.toLowerCase();
      const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm)
      );
      recipeItems.innerHTML = ``;
      filteredRecipes.forEach((recipe) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${recipe.name}</strong>`;
        [listItem].forEach((list) => {
          list.addEventListener("click", () => {
            // modal
            const div = document.createElement("div");
            div.classList.add("item");
            div.insertAdjacentHTML(
              "beforeend",
              `<button class="close-modal" onclick="closeModal()">&times;</button>`
            );

            for (let i = 0; i < [recipe].length; i++) {
              div.insertAdjacentHTML(
                "beforeend",
                `
					  <img src="${recipe.image}">
            <h1 class="title">${recipe.name}</h1>
					  <div class="flex-container">
              <button class="food_edit" onclick="editRecipe('${recipe.id}')"> Edit </button>
              <button class="food_delete" onclick="deleteRecipe('${recipe.id}')">Delete</button>
				    </div>`
              );
            }
            modal.classList.remove("hidden");
            overlay.classList.remove("hidden");
            overlay.addEventListener("click", closeModal);
            modal.append(div);
          });
        });
        recipeItems.appendChild(listItem);
      });
    });

    recipes.forEach((recipe) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>${recipe.name}</strong>`;
      [listItem].forEach((list) => {
        list.addEventListener("click", () => {
          // modal
          const div = document.createElement("div");
          div.classList.add("item");
          div.insertAdjacentHTML(
            "beforeend",
            `<button class="close-modal" onclick="closeModal()">&times;</button>`
          );

          for (let i = 0; i < [recipe].length; i++) {
            div.insertAdjacentHTML(
              "beforeend",
              `
					  <img src="${recipe.image}">
            <h1 class="title">${recipe.name}</h1>
					  <div class="flex-container">
                       <button class="food_edit" onclick="editRecipe('${recipe.id}')"> Edit </button>
                       <button class="food_delete" onclick="deleteRecipe('${recipe.id}')">Delete</button>
				    </div>`
            );
          }
          modal.classList.remove("hidden");
          overlay.classList.remove("hidden");
          overlay.addEventListener("click", closeModal);
          modal.append(div);
        });
      });
      recipeItems.appendChild(listItem);
    });
  } catch (err) {
    console.error(err);
  }
}

//close Modal
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  modal.innerHTML = "";
}

// deleting recipe
async function deleteRecipe(id) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/v1/recipes/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (data.message == "success") {
      displayRecipes();
      closeModal();
    }
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  displayRecipes();
});

const bookmarks = document.getElementById("userBookmarks");
const bookmarkItems = document.getElementById("bookmark-items");

const activeBtn = document.querySelector(".activeBtn");

async function displayUsers() {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/register`);
    const data = await res.json();
    const users = data.data;

    const userItems = document.getElementById("user-items");
    userItems.innerHTML = "";

    userSearch.addEventListener("input", () => {
      const searchTerm = userSearch.value.toLowerCase();
      const filteredusers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm)
      );
      userItems.innerHTML = ``;
      filteredusers.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${user.name}</strong> ${user.email}`;
        [listItem].forEach((list) => {
          list.addEventListener("click", () => {
            if (user.active) {
              activeBtn.textContent = "Deactivate";
              activeBtn.classList.add("deactivate");
            } else {
              activeBtn.textContent = "Activate";
              activeBtn.classList.add("activate");
            }
            activeBtn.addEventListener("click", (e) => {
              e.preventDefault();
              active(user.id);
            });
            addTab(userManagement, userList, formContainer);
            userInfo(user);
            const bmArr = JSON.parse(user.bookmarks);
            console.log(bmArr);
            bmArr.forEach(async (bm) => {
              console.log(typeof bm);
              const res = await fetch(
                `http://localhost:3000/api/v1/recipes/id/${bm}`
              );
              const data = await res.json();
              const recipe = data[0];
              if (data.length === 0) return;

              const bookmarkLists = document.createElement("li");
              bookmarkLists.innerHTML = `<strong>${recipe.name}</strong>`;
              [bookmarkLists].forEach((list) => {
                list.addEventListener("click", () => {
                  // modal
                  const div = document.createElement("div");
                  div.classList.add("item");
                  div.insertAdjacentHTML(
                    "beforeend",
                    `<button class="close-modal" onclick="closeModal()">&times;</button>`
                  );

                  for (let i = 0; i < [recipe].length; i++) {
                    div.insertAdjacentHTML(
                      "beforeend",
                      `<img src="${recipe.image}">
                        <h1 class="title">${recipe.name}</h1>
					              <div class="flex-container">
                            <button class="food_edit"             onclick="editRecipe('${recipe.id}')">             Edit </button>
                            <button class="food_delete"             onclick="deleteRecipe('${recipe.id}')           ">Delete</button>
				                </div>`
                    );
                  }
                  modal.classList.remove("hidden");
                  overlay.classList.remove("hidden");
                  overlay.addEventListener("click", closeModal);
                  modal.append(div);
                });
              });
              bookmarkItems.appendChild(bookmarkLists);
            });
          });
        });
        userItems.appendChild(listItem);
      });
    });

    users.forEach((user) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>${user.name}</strong> ${user.email}`;
      [listItem].forEach((list) => {
        list.addEventListener("click", () => {
          if (user.active) {
            activeBtn.textContent = "Deactivate";
            activeBtn.classList.add("deactivate");
          } else {
            activeBtn.textContent = "Activate";
            activeBtn.classList.add("activate");
          }
          activeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            active(user.id);
          });
          addTab(userManagement, userList, formContainer);
          userInfo(user);
          const bmArr = JSON.parse(user.bookmarks);

          if (!Array.isArray(bmArr) || bmArr.length === 0) {
            bookmarkItems.innerHTML = `No Bookmarks yet 😟`;
          } else {
            bookmarkItems.innerHTML = ``;
          }

          bmArr.forEach(async (bm) => {
            const res = await fetch(
              `http://localhost:3000/api/v1/recipes/id/${bm}`
            );
            const data = await res.json();
            const recipe = data[0];
            if (data.length === 0) return;

            const bookmarkLists = document.createElement("li");
            bookmarkLists.innerHTML = `<strong>${recipe.name}</strong>`;
            [bookmarkLists].forEach((list) => {
              list.addEventListener("click", () => {
                // modal
                const div = document.createElement("div");
                div.classList.add("item");
                div.insertAdjacentHTML(
                  "beforeend",
                  `<button class="close-modal" onclick="closeModal()">&times;</button>`
                );

                for (let i = 0; i < [recipe].length; i++) {
                  div.insertAdjacentHTML(
                    "beforeend",
                    `
					  <img src="${recipe.image}">
            <h1 class="title">${recipe.name}</h1>
					  <div class="flex-container">
                <button class="food_edit" onclick="editRecipe('${recipe.id}')"> Edit </button>
                <button class="food_delete" onclick="deleteRecipe('${recipe.id}')">Delete</button>
				    </div>`
                  );
                }
                modal.classList.remove("hidden");
                overlay.classList.remove("hidden");
                overlay.addEventListener("click", closeModal);
                modal.append(div);
              });
            });
            bookmarkItems.appendChild(bookmarkLists);
          });
        });
      });
      userItems.appendChild(listItem);
    });
  } catch (err) {
    console.error(err);
  }
}

const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userPhone = document.getElementById("user-phone");
const user_form = document.getElementById("user-form");
// Function to add a new user
async function userInfo(user) {
  userName.value = user.name;
  userEmail.value = user.email;
  userPhone.value = user.phone;
}

async function active(id) {
  const res = await fetch(`http://localhost:3000/api/v1/active`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const data = await res.json();
  console.log(data);
  if (data.message == "false") {
    activeBtn.textContent = "Activate";
    activeBtn.classList.remove("deactivate");
    activeBtn.classList.add("activate");
  } else {
    activeBtn.textContent = "Deactivate";
    activeBtn.classList.remove("activate");
    activeBtn.classList.add("deactivate");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  displayUsers();
});
// Sample data for recent activity
let recentActivity = [
  { type: "user", action: "created", timestamp: "2023-11-15 10:30" },
  { type: "recipe", action: "added", timestamp: "2023-11-15 11:15" },
];

// Function to display recent activity on the dashboard
function displayRecentActivity() {
  const activityList = document.getElementById("activity-list");
  activityList.innerHTML = "";

  recentActivity.forEach((activity) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${
      activity.type.charAt(0).toUpperCase() + activity.type.slice(1)
    } ${activity.action} - ${activity.timestamp}`;
    activityList.appendChild(listItem);
  });
}
// Display dashboard stats and recent activity when the page loads
document.addEventListener("DOMContentLoaded", function () {
  displayDashboardStats();
  displayRecentActivity();
});
// Sample data for initial categories
let categories = [
  { id: 1, name: "Breakfast" },
  { id: 2, name: "Lunch" },
];

// Function to display categories in the list
function displayCategories() {
  const categoryList = document.getElementById("category-items");
  categoryList.innerHTML = "";

  categories.forEach((category) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${category.name}</strong> 
                              <button onclick="editCategory(${category.id})">Edit</button>
                              <button onclick="deleteCategory(${category.id})">Delete</button>`;
    categoryList.appendChild(listItem);
  });
}
function addCategory() {
  const categoryForm = document.getElementById("category-form");
  const categoryName = categoryForm.elements["category-name"].value;
  const newCategoryId = categories.length + 1;
  const newCategory = {
    id: newCategoryId,
    name: categoryName,
  };
  categories.push(newCategory);
  categoryForm.reset();
  displayCategories();
}

function editCategory(categoryId) {
  const categoryToEdit = categories.find(
    (category) => category.id === categoryId
  );
  const categoryForm = document.getElementById("category-form");
  categoryForm.elements["category-name"].value = categoryToEdit.name;
  categories = categories.filter((category) => category.id !== categoryId);
  displayCategories();
}
function deleteCategory(categoryId) {
  categories = categories.filter((category) => category.id !== categoryId);
  displayCategories();
}
function searchCategories() {
  const searchTerm = document
    .getElementById("category-search")
    .value.toLowerCase();

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm)
  );
  displayCategories(filteredCategories);
}
function clearCategorySearch() {
  document.getElementById("category-search").value = "";
  displayCategories();
}
document.addEventListener("DOMContentLoaded", function () {
  displayCategories();
});
// Sample data for analytics
let analyticsData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Page Views",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};
// Function to display analytics chart
function displayAnalyticsChart() {
  const chartCanvas = document
    .getElementById("analytics-chart")
    .getContext("2d");
  new Chart(chartCanvas, {
    type: "bar",
    data: analyticsData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
document.addEventListener("DOMContentLoaded", function () {
  displayAnalyticsChart();
});

function saveGeneralSettings() {
  const generalSettingsForm = document.getElementById("general-settings-form");
  const appTitle = generalSettingsForm.elements["app-title"].value;
  const themeColor = generalSettingsForm.elements["theme-color"].value;
  console.log("App Title:", appTitle);
  console.log("Theme Color:", themeColor);
}
function saveUserPreferences() {
  const userPreferencesForm = document.getElementById("user-preferences-form");
  const selectedLanguage = userPreferencesForm.elements["language"].value;
  const selectedTimezone = userPreferencesForm.elements["timezone"].value;
  console.log("Language:", selectedLanguage);
  console.log("Timezone:", selectedTimezone);
}
// Sample data for initial nutritionists
let nutritionists = [
  { id: 1, name: "John Doe", patients: 5 },
  { id: 2, name: "Jane Smith", patients: 8 },
];

// Function to display nutritionist activity and statistics
function displayNutritionistActivity() {
  const nutritionistList = document.getElementById("nutritionist-list");
  nutritionistList.innerHTML = "";

  nutritionists.forEach((nutritionist) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${nutritionist.name}</strong> - Patients: ${nutritionist.patients}`;
    nutritionistList.appendChild(listItem);
  });
  document.getElementById("total-nutritionists").textContent =
    nutritionists.length;
}
document.addEventListener("DOMContentLoaded", function () {
  displayNutritionistActivity();
});

const subs = document.querySelector(".sub-menu");
const subs2 = document.querySelector(".sub-menu2");
const recipeBar = document.getElementById("recipeBar");

function showsubs(sub) {
  if (sub.style.display == "block") {
    sub.style.display = "none";
  } else {
    sub.style.display = "block";
  }
  document.getElementById("users").classList.toggle("rotate");
}

recipeBar.addEventListener("click", (e) => {
  e.preventDefault();
  showsubs(subs2);
});

//ADDING RECIPES
async function postData(data) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/recipes`, {
      method: "POST",
      body: data,
    });
    const bodydata = await res.json();
    if (bodydata.message == "success") {
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
const uploadBtn = document.getElementById("upload");
const saveBtn = document.querySelector(".saveBtn");
const recipeName = document.getElementById("recipeName");
const recipeImage = document.getElementById("recipeImage");
const category = document.getElementById("cat");
const type = document.getElementById("type");
const publisher = document.getElementById("recipePublisher");
const time = document.getElementById("recipeTime");
const recipeIng = document.getElementById("recipe-ingredients");
const recipeInst = document.getElementById("recipe-instructions");

uploadBtn.addEventListener("click", (e) => { const formData = new FormData();
  const ingredients = recipeIng.value.split(",");
  const steps = recipeInst.value.split(";");

  formData.append("name", recipeName.value);
  formData.append("image", recipeImage.files[0]);
  formData.append("category", category.value);
  formData.append("type", type.value);
  formData.append("ingredients", JSON.stringify(ingredients));
  formData.append("instructions", JSON.stringify(steps));
  formData.append("timer", time.value);
  formData.append("publisher", publisher.value);

  postData(formData);
});

async function editRecipe(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/recipes/id/${id}`);
    const data = await res.json();
    localStorage.setItem("recipeID", data[0].id);
    recipeName.value = data[0].name;
    category.value = data[0].category;
    type.value = data[0].type;
    time.value = data[0].timer;
    publisher.value = data[0].publisher;
    recipeIng.value = data[0].ingredients.join(", ");
    recipeInst.value = data[0].instructions.join(", ");
    closeModal();
    addTab(recipeManagement, recipeList, recipeForm);
    uploadBtn.classList.add("hidden");
    saveBtn.classList.remove("hidden");
  } catch (err) {
    console.error(err);
  }
}

//save btn
saveBtn.addEventListener("click", () => {
  const recipeID = localStorage.getItem("recipeID");
  const formData = new FormData();
  const ingredients = recipeIng.value.split(",");
  const steps = recipeInst.value.split(",");

  console.log(typeof +recipeID);
  formData.append("id", +recipeID);
  formData.append("name", recipeName.value);
  formData.append("image", recipeImage.files[0]);
  formData.append("category", category.value);
  formData.append("type", type.value);
  formData.append("ingredients", JSON.stringify(ingredients));
  formData.append("instructions", JSON.stringify(steps));
  formData.append("timer", time.value);
  formData.append("publisher", publisher.value);

  updateRecipe(formData);
});

// fnction to update recipe
async function updateRecipe(data) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/recipes/update`, {
      method: "POST",
      body: data,
    });
    const bodydata = await res.json();
    if (bodydata.message == "success") {
      location.reload();
      setTimeout(() => {
        displayRecipes();
      }, 1000);
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
