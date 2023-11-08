const {login, register, getUsers, tokenChecker} = require("./auth/auth")
const { getRecipes, getMealType, getMealCategory, getRecipesByID } = require("./users/user")
const { addMealRecipes } = require("./admin/admin")

module.exports = { login , register, getUsers, tokenChecker, getRecipes, getMealType, getMealCategory, getRecipesByID, addMealRecipes}