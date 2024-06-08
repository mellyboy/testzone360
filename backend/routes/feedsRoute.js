const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedsController');

router.post('/feeds', feedController.createFeed);
router.get('/feeds', feedController.getGlobalFeeds);
router.get('/feeds/:userId', feedController.getUserFeeds);
router.post('/feeds/:feedId/likes', feedController.likeFeed);
router.delete('/feeds/:feedId/likes', feedController.unlikeFeed);
router.post('/feeds/:feedId/comments', feedController.commentOnFeed);
router.get('/feeds/:feedId/comments', feedController.getComments);
router.get('/feeds/:userId/:feedId/isLiked', feedController.isLiked);
router.post('/feeds/likes', feedController.isLikedBatch);
router.delete('/feeds/:feedId', feedController.deleteFeed);
router.delete('/comments/:commentId', feedController.deleteComment);
router.put('/feeds/:feedId', feedController.updateFeed);


module.exports = router;
