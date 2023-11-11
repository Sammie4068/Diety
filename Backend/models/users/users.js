const db = require("../../db");

exports.getAllRecipes = async () => {
    return db.query("SELECT * FROM meals")
}

exports.getName = async (name) => {
    return db.query(
      "SELECT * FROM meals WHERE $1 = ANY(string_to_array(name, ' '));",
      [name]
    );
}

exports.getCategory = async (category) => {
    return db.query("SELECT * FROM meals WHERE category=$1", [category])
}

exports.getRecipeByID = async (id) => {
    return db.query("SELECT * FROM meals WHERE id=$1", [id])
}

exports.getFilteredName = async (name, category) => {
    return db.query("SELECT * FROM meals WHERE $1 = ANY(string_to_array(name, ' ')) AND $2 = ANY(string_to_array(category, ' '))", [name, category])
}