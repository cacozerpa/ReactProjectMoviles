const {Router} = require('express');
const { getUsers, getUsersById } = require('../helpers/user');
const router = Router();

router.get('/users', getUsers);
router.get('/user/:user_id', getUsersById);

module.exports = router;