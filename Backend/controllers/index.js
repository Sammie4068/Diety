const {login, register, getUsers, tokenChecker} = require("./auth/auth")
const {
  getRecipes,
  getMealName,
  getMealCategory,
  getRecipesByID,
  getFilteredNameMeal,
  updateUserProfile,
  addBookmark,
} = require("./users/user");
const { addMealRecipes } = require("./admin/admin")

module.exports = {
  login,
  register,
  getUsers,
  tokenChecker,
  getRecipes,
  getMealName,
  getMealCategory,
  getRecipesByID,
  addMealRecipes,
  getFilteredNameMeal,
  updateUserProfile,
  addBookmark,
};