const express = require('express');
const router = express.Router();
const postCtrls = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config.js');

router.post('/', auth, postCtrls.post);
router.get('/', auth, postCtrls.getPostsList);
router.post('/:idPost', auth, postCtrls.incrementId);
router.put('/:insertId', auth, multer, postCtrls.addPostImage);
router.delete('/:idPost', auth, postCtrls.deletePost);
router.get('/:idPost', auth, postCtrls.getLike);

module.exports = router;