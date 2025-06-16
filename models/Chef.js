const db = require('../config/db');

class Chef {
    static async getAll() {
        const { rows } = await db.query('SELECT * FROM chefs');
        return rows;
    }
}

module.exports = Chef;