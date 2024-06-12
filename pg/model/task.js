const pool = require('../db');

exports.createTask = async (task) => {
    const { title, content, start_date, target_end_date, status, user_id } = task;
    const query = `INSERT INTO tasks (title, content, start_date, target_end_date, status, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
    try {
        const { rows } = await pool.query(query, [title, content, start_date, target_end_date, status, user_id]);
        return rows[0];
    } catch (err) {
        throw err;
    }
};

exports.getTasks = async (userId) => {
    const query = `SELECT * FROM tasks WHERE user_id = $1`;
    try {
        const { rows } = await pool.query(query, [userId]);
        return rows;
    } catch (err) {
        throw err;
    }
};

exports.updateTask = async (taskId, userId, updates) => {
    const { title, content, start_date, target_end_date, status } = updates;
    const query = `UPDATE tasks SET title = $1, content = $2, start_date = $3, target_end_date = $4, status = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 AND user_id = $7`;
    try {
        const result = await pool.query(query, [title, content, start_date, target_end_date, status, taskId, userId]);
        return result;
    } catch (err) {
        throw err;
    }
};

exports.deleteTask = async (taskId, userId) => {
    const query = `DELETE FROM tasks WHERE id = $1 AND user_id = $2`;
    try {
        const result = await pool.query(query, [taskId, userId]);
        return result;
    } catch (err) {
        throw err;
    }
};
