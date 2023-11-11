const { req, res, next } = require("express");
const { addRecipes } = require("../../models/index");

exports.addMealRecipes = async (req, res, next) => {
  try {
    const recipe = {
      name: req.body.name,
      image: req.body.image,
      type: req.body.type,
      category: req.body.category,
      ingredients: JSON.stringify(req.body.ingredients),
      instructions: JSON.stringify(req.body.instructions),
      timer: req.body.timer,
      publisher: req.body.publisher,
    };
    const result = await addRecipes(recipe);
    res.json({ message: "Success" });
  } catch (err) {
    return next(err);
  }
};
