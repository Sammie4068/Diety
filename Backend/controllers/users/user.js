const { req, res, next } = require("express");
const { getAllRecipes, getType, getCategory, getRecipeByID } = require("../../models/index");

exports.getRecipes = async (req, res, next) => {
  try {
    const results = await getAllRecipes();
    res.json(results.rows);
  } catch (err) {
    next(err);
  }
};

exports.getMealType = async (req, res, next) => {
  try {
    const results = await getType(req.params.type);
    res.json(results.rows)
  } catch (er) {
    next(err)
  }
}

exports.getMealCategory = async (req, res, next) => {
  try {
    const results = await getCategory(req.params.category);
    res.json(results.rows)
  } catch (err) {
    next(err)
  }
}

exports.getRecipesByID = async (req, res, next) => {
  try {
    const results = await getRecipeByID(req.params.id);
    res.json(results.rows)
  } catch (err) {
    next(err)
  }
}