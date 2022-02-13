const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin');
const auth = require('../middleware/auth');

router.get('/:id',auth, adminCtrl.getAllUsers);
router.delete('/:userID', auth, adminCtrl.deleteUser);

module.exports = router;