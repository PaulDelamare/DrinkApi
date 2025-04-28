const express = require('express');
const router = express.Router();
const {
    getRoot,
    getUsers,
    createUser
} = require('../controllers/user.controller');

// Route definitions
router.get('/', getRoot);
router.get('/users', getUsers);
router.post('/users', createUser);

module.exports = router;