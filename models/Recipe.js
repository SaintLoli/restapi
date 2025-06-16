const db = require('../config/db');

class Recipe {
  static async create({ title, cooking_time, difficulty, chef_id }) {
    const { rows } = await db.query(
      `INSERT INTO recipes (title, cooking_time, difficulty, chef_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, cooking_time, difficulty, chef_id]
    );
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await db.query(
      `SELECT r.*, c.bio as chef_bio 
       FROM recipes r
       JOIN chefs c ON r.chef_id = c.chef_id
       WHERE recipe_id = $1`,
      [id]
    );
    return rows[0];
  }

  static async getAll() {
    const { rows } = await db.query('SELECT * FROM recipes');
    return rows;
  }

  static async getGroceryList(recipe_id) {
    const { rows } = await db.query(
      `SELECT name, amount FROM ingredients 
       WHERE recipe_id = $1`,
      [recipe_id]
    );
    return rows;
  }

  static async delete(id) {
    const { rowCount } = await db.query(
      'DELETE FROM recipes WHERE recipe_id = $1',
      [id]
    );
    return rowCount > 0; // Вернёт true, если рецепт был удалён
  }

  static async update(id, { title, cooking_time, difficulty, chef_id }) {
    const { rows } = await db.query(
      `UPDATE recipes 
       SET title = $1, cooking_time = $2, difficulty = $3, chef_id = $4 
       WHERE recipe_id = $5 RETURNING *`,
      [title, cooking_time, difficulty, chef_id, id]
    );
    return rows[0];
  }

  static async getAllWithChefName() {
    const { rows } = await db.query(
      `SELECT r.*, c.bio as chef_name 
       FROM recipes r
       LEFT JOIN chefs c ON r.chef_id = c.chef_id`
    );
    return rows;
  }
}

module.exports = Recipe;
