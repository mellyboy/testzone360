const taskModel = require('../model/task');
const verifyToken = require('../middleware/auth');

const convertUnixToDate = (unixTimestamp) => {
    if (!unixTimestamp) return null;
    const date = new Date(unixTimestamp * 1000);
    if (isNaN(date.getTime())) return null;
    return date.toISOString();
};

exports.createTask = async (req, res) => {
    try {
        await verifyToken(req, res, async () => {
            const { title, content, start_date, target_end_date, status } = req.body;

            const task = {
                title,
                content,
                start_date: start_date ? new Date(start_date).toISOString().split('T')[0] : null,
                target_end_date: target_end_date ? new Date(target_end_date).toISOString().split('T')[0] : null,
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
                start_date: start_date ? new Date(start_date).toISOString().split('T')[0] : null,
                target_end_date: target_end_date ? new Date(target_end_date).toISOString().split('T')[0] : null,
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