const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const userCtrl =require('../controllers/user')

router.post('/:id', auth, multer, userCtrl.avatar);
router.get('/', auth, userCtrl.getInfo);
router.put('/:id', auth, userCtrl.updateInfo);
router.delete('/:id', auth, userCtrl.deleteProfile);
router.get('/:id', auth, userCtrl.getUserInfo);


module.exports = router;