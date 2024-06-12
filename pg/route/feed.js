const express = require('express');
const router = express.Router();
const feedController = require('../controller/feed');
const verifyToken = require('../middleware/auth');

router.post('/feeds', verifyToken, feedController.createFeed);
router.get('/feeds', feedController.getGlobalFeeds);
router.get('/feeds/:userId', verifyToken, feedController.getUserFeeds);
router.post('/feeds/:feedId/likes', verifyToken, feedController.likeFeed);
router.delete('/feeds/:feedId/likes', verifyToken, feedController.unlikeFeed);
router.post('/feeds/:feedId/comments', verifyToken, feedController.commentOnFeed);
router.get('/feeds/:feedId/comments', verifyToken, feedController.getComments);
router.get('/feeds/:userId/:feedId/isLiked', verifyToken, feedController.isLiked);
router.post('/feeds/likes', verifyToken, feedController.isLikedBatch);
router.delete('/feeds/:feedId', verifyToken, feedController.deleteFeed);
router.delete('/comments/:commentId', verifyToken, feedController.deleteComment);
router.put('/feeds/:feedId', verifyToken, feedController.updateFeed);

module.exports = router;
