const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin');
const auth = require('../middleware/auth');

router.get('/',auth, adminCtrl.getAllUsers);
router.delete('/:userID', auth, adminCtrl.deleteUser);

module.exports = router;