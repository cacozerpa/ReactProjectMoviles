const {Router} = require('express');
const { createTask, updateTask, deleteTask } = require('../helpers/task.auth');
const router = Router();

router.post('/createtask', createTask);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);

module.exports = router;