const {getUserByEmail, addUsers, getAllUsers} = require("./auth/auth")
const { getAllRecipes, getType, getCategory, getRecipeByID } = require("./users/users")
const { addRecipes } = require("./admin/admin")

module.exports = { getUserByEmail, addUsers, getAllUsers, getAllRecipes, getType, getCategory, getRecipeByID, addRecipes }