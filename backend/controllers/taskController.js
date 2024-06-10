const taskModel = require('../models/taskModel');
const { verifyToken } = require('../middleware/verifyToken');

exports.createTask = (req, res) => {
    verifyToken(req, res, () => {
        const task = { ...req.body, user_id: req.user.id };
        taskModel.createTask(task, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json(result);
        });
    });
};

exports.getTasks = (req, res) => {
    verifyToken(req, res, () => {
        const userId = req.user.id;
        taskModel.getTasks(userId, (err, tasks) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(tasks);
        });
    });
};

exports.updateTask = (req, res) => {
    verifyToken(req, res, () => {
        const taskId = req.params.taskId;
        const updates = req.body;
        const userId = req.user.id;
        taskModel.updateTask(taskId, userId, updates, (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.changes === 0) return res.status(404).json({ error: "Task not found or not authorized" });
            res.status(200).json({ message: "Task updated successfully" });
        });
    });
};

exports.deleteTask = (req, res) => {
    verifyToken(req, res, () => {
        const taskId = req.params.taskId;
        const userId = req.user.id;
        taskModel.deleteTask(taskId, userId, (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.changes === 0) return res.status(404).json({ error: "Task not found or not authorized" });
            res.status(200).json({ message: "Task deleted successfully" });
        });
    });
};
