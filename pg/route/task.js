const express = require('express');
const router = express.Router();
const taskController = require('../controller/task');
const verifyToken = require('../middleware/auth');

router.post('/tasks', verifyToken, taskController.createTask);
router.get('/tasks', verifyToken, taskController.getTasks);
router.put('/tasks/:taskId', verifyToken, taskController.updateTask);
router.delete('/tasks/:taskId', verifyToken, taskController.deleteTask);

module.exports = router;
