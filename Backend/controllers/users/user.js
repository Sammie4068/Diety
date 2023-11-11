const { req, res, next } = require("express");
const {
  getAllRecipes,
  getName,
  getCategory,
  getRecipeByID,
  getFilteredName,
} = require("../../models/index");

exports.getRecipes = async (req, res, next) => {
  try {
    const results = await getAllRecipes();
    const result = results.rows;
    result.forEach((rec) => {
      rec.ingredients = JSON.parse(rec.ingredients);
      rec.instructions = JSON.parse(rec.instructions);
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getMealName = async (req, res, next) => {
  try {
    const results = await getName(req.params.name);
        const result = results.rows;
        result.forEach((rec) => {
          rec.ingredients = JSON.parse(rec.ingredients);
          rec.instructions = JSON.parse(rec.instructions);
        });
        res.json(result);
    // res.json(results.rows);
  } catch (err) {
    next(err);
  }
};

exports.getMealCategory = async (req, res, next) => {
  try {
    const results = await getCategory(req.params.category);
     const result = results.rows;
     result.forEach((rec) => {
       rec.ingredients = JSON.parse(rec.ingredients);
       rec.instructions = JSON.parse(rec.instructions);
     });
     res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getRecipesByID = async (req, res, next) => {
  try {
    const results = await getRecipeByID(req.params.id);
      const result = results.rows;
      result.forEach((rec) => {
        rec.ingredients = JSON.parse(rec.ingredients);
        rec.instructions = JSON.parse(rec.instructions);
      });
      res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getFilteredNameMeal = async (req, res, next) => {
  try {
    const results = await getFilteredName(req.params.name, req.params.category)
     const result = results.rows;
     result.forEach((rec) => {
       rec.ingredients = JSON.parse(rec.ingredients);
       rec.instructions = JSON.parse(rec.instructions);
     });
     res.json(result);
  } catch (err) {
    next(err)
  }
}