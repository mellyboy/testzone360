const taskModel = require('../model/task');
const verifyToken = require('../middleware/auth');

const convertUnixToDate = (unixTimestamp) => {
    return new Date(unixTimestamp * 1000).toISOString();
};

exports.createTask = async (req, res) => {
    try {
        await verifyToken(req, res, async () => {
            const { title, content, start_date, target_end_date, status } = req.body;

            const task = {
                title,
                content,
                start_date: start_date ? convertUnixToDate(start_date) : null,
                target_end_date: target_end_date ? convertUnixToDate(target_end_date) : null,
                status,
                user_id: req.user.id
            };
            const result = await taskModel.createTask(task);
            res.status(201).json(result);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        await verifyToken(req, res, async () => {
            const userId = req.user.id;
            const tasks = await taskModel.getTasks(userId);
            res.status(200).json(tasks);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        await verifyToken(req, res, async () => {
            const taskId = req.params.taskId;
            const { title, content, start_date, target_end_date, status } = req.body;

            const updates = {
                title,
                content,
                start_date: start_date ? convertUnixToDate(start_date) : null,
                target_end_date: target_end_date ? convertUnixToDate(target_end_date) : null,
                status
            };

            const userId = req.user.id;
            const result = await taskModel.updateTask(taskId, userId, updates);
            if (result.rowCount === 0) return res.status(404).json({ error: "Task not found or not authorized" });
            res.status(200).json({ message: "Task updated successfully" });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await verifyToken(req, res, async () => {
            const taskId = req.params.taskId;
            const userId = req.user.id;
            const result = await taskModel.deleteTask(taskId, userId);
            if (result.rowCount === 0) return res.status(404).json({ error: "Task not found or not authorized" });
            res.status(200).json({ message: "Task deleted successfully" });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};