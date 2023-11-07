const db = require("../../db");

exports.getAllRecipes = async () => {
    return db.query("SELECT * FROM recipes")
}

exports.getType = async (type) => {
    return db.query("SELECT * FROM recipes WHERE type=$1", [type])
}

exports.getCategory = async (category) => {
    return db.query("SELECT * FROM recipes WHERE category=$1", [category])
}

exports.getRecipeByID = async (id) => {
    return db.query("SELECT * FROM recipes WHERE id=$1", [id])
}