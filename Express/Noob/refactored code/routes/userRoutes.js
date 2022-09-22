const express = require('express');
const router = express.Router();
const { getUser, updateUser } = require('./../controller/userController');
router.route('/').get(getUser);
router.route('/:id').patch(updateUser);

module.exports = router;
