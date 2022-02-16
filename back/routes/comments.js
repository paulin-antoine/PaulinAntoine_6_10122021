const express = require('express');
const router = express.Router();
const commentsCtrls = require('../controllers/comments');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/:idPost', auth, commentsCtrls.sendComment );
router.get('/:idPost', auth, commentsCtrls.getCommentsList);
router.delete('/:idcomments', auth, commentsCtrls.deleteComment);

module.exports = router;