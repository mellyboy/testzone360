const db = require('../database');

exports.createTask = (task, callback) => {
    const { title, content, start_date, target_end_date, user_id } = task;
    const query = `INSERT INTO tasks (title, content, start_date, target_end_date, user_id) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [title, content, start_date, target_end_date, user_id], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null, { id: this.lastID });
    });
};

exports.getTasks = (userId, callback) => {
    const query = `SELECT * FROM tasks WHERE user_id = ?`;
    db.all(query, [userId], (err, rows) => {
        if (err) {
            return callback(err);
        }
        callback(null, rows);
    });
};

exports.updateTask = (taskId, userId, updates, callback) => {
    const { title, content, start_date, target_end_date, status } = updates;
    const query = `UPDATE tasks SET title = ?, content = ?, start_date = ?, target_end_date = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`;
    db.run(query, [title, content, start_date, target_end_date, status, taskId, userId], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null, { changes: this.changes });
    });
};

exports.deleteTask = (taskId, userId, callback) => {
    const query = `DELETE FROM tasks WHERE id = ? AND user_id = ?`;
    db.run(query, [taskId, userId], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null, { changes: this.changes });
    });
};
