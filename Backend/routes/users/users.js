const { Router } = require("express");
const router = Router();
const {
  getRecipes,
  getMealName,
  getMealCategory,
  getRecipesByID,
  getFilteredNameMeal,
  updateUserProfile,
} = require("../../controllers/index");

router.get("/recipes", getRecipes)
router.get("/recipes/category/:category", getMealCategory)
router.get("/recipes/name/:name", getMealName)
router.get("/recipes/id/:id", getRecipesByID)
router.get("/recipes/:name/:category", getFilteredNameMeal);
router.post("/user", updateUserProfile);

module.exports = router
