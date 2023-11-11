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

exports.addBookmark = async (recipeID) => {
  return db.query("INSERT INTO users (bookmarks) VALUES ($1) RETURNING *", [recipeID]);
};

exports.updateUser = async (name, email, phone, id) => {
    return db.query("UPDATE users SET name = $1, email = $2, phone = $3 WHERE id = $4", [name, email, phone, id])
}