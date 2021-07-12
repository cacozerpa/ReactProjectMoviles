const {Router} = require('express');
const { getUsers, getUsersByUserId } = require('../helpers/user');
const router = Router();

router.get('/users', getUsers);
router.get('/user/:id', getUsersByUserId);

module.exports = router;