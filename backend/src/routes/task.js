const {Router} = require('express');
const { getTasks, getTaskById, getTasksByUsername } = require('../helpers/task');
const router = Router();

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.get('/usertasks/:id', getTasksByUsername);

module.exports = router;