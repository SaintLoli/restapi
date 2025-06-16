const db = require('../config/db');

class Masterclass {
  static async create({ chef_id, recipe_id, schedule, price, max_participants }) {
    const { rows } = await db.query(
      `INSERT INTO masterclasses 
       (chef_id, recipe_id, schedule, price, max_participants) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [chef_id, recipe_id, schedule, price, max_participants]
    );
    return rows[0];
  }

  static async getAll() {
    const { rows } = await db.query('SELECT * FROM masterclasses');
    return rows;
  }

  static async delete(id) {
    const { rowCount } = await db.query(
      'DELETE FROM masterclasses WHERE class_id = $1',
      [id]
    );
    return rowCount > 0;
  }

  static async update(id, { chef_id, recipe_id, schedule, price, max_participants }) {
    const formattedSchedule = new Date(schedule).toISOString();
    
    const { rows } = await db.query(
      `UPDATE masterclasses 
       SET chef_id = $1, recipe_id = $2, schedule = $3, price = $4, max_participants = $5 
       WHERE class_id = $6 RETURNING *`,
      [chef_id, recipe_id, formattedSchedule, price, max_participants, id]
    );
    return rows[0];
  }

  static async findByChefId(chef_id) {
    const { rows } = await db.query(
      `SELECT * FROM masterclasses WHERE chef_id = $1`,
      [chef_id]
    );
    return rows;
  }

  static async getAllWithNames() {
    const { rows } = await db.query(
      `SELECT m.*, r.title as recipe_title, c.bio as chef_name 
       FROM masterclasses m
       JOIN recipes r ON m.recipe_id = r.recipe_id
       JOIN chefs c ON m.chef_id = c.chef_id`
    );
    return rows;
  }

  static async getRecommended(user_id) {
    const { rows } = await db.query(
      `SELECT m.* FROM masterclasses m
        JOIN user_classes uc ON m.class_id = uc.class_id
        WHERE uc.user_id = $1
        AND m.schedule > NOW() -- Только будущие события
        ORDER BY m.schedule DESC 
        LIMIT 5`, // Увеличьте лимит
      [user_id]
    );
    return rows;
    }
}

module.exports = Masterclass;