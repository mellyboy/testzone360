const feedModel = require('../model/feed');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth')

exports.createFeed = async (req, res) => {
    verifyToken(req, res, async () => {
        try {
            const feed = { ...req.body, author_id: req.user.id };
            const result = await feedModel.createFeed(feed);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

exports.deleteFeed = async (req, res) => {
    verifyToken(req, res, async () => {
        try {
            const feedId = req.params.feedId;
            const userId = req.user.id;
            const result = await feedModel.deleteFeed(feedId, userId);
            if (result === 0) {
                return res.status(404).json({ error: "Feed not found or not authorized" });
            }
            res.status(200).json({ message: "Feed deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

exports.updateFeed = async (req, res) => {
    verifyToken(req, res, async () => {
        try {
            const feedId = req.params.feedId;
            const userId = req.user.id;
            const feed = req.body;
            const result = await feedModel.updateFeed(feedId, userId, feed);
            if (result === 0) {
                return res.status(404).json({ error: "Feed not found or not authorized" });
            }
            res.status(200).json({ message: "Feed updated successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

exports.getGlobalFeeds = async (req, res) => {
    try {
        const feeds = await feedModel.getGlobalFeeds();
        res.json(feeds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserFeeds = async (req, res) => {
    verifyToken(req, res, async () => {
        try {
            const userId = req.params.userId;
            if (!userId || userId != req.user.id) {
                return res.status(403).json({ error: "Forbidden" });
            }
            const feeds = await feedModel.getUserFeeds(userId);
            res.json(feeds);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

exports.likeFeed = async (req, res) => {
    verifyToken(req, res, async () => {
        try {
            const like = {
                user_id: req.user.id,
                feed_id: req.params.feedId
            };
            const result = await feedModel.likeFeed(like);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

exports.unlikeFeed = async (req, res) => {
    verifyToken(req, res, async () => {
        try {
            const like = {
                user_id: req.user.id,
                feed_id: req.params.feedId
            };
            const result = await feedModel.unlikeFeed(like);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

exports.commentOnFeed = async (req, res) => {
    verifyToken(req, res, async () => {
        try {
            const comment = {
                content: req.body.content,
                user_id: req.user.id,
                feed_id: req.params.feedId
            };
            const result = await feedModel.commentOnFeed(comment);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

exports.deleteComment = async (req, res) => {
    verifyToken(req, res, async () => {
        try {
            const commentId = req.params.commentId;
            const userId = req.user.id;
            const result = await feedModel.deleteComment(commentId, userId);
            if (result === 0) {
                return res.status(404).json({ error: "Comment not found or not authorized" });
            }
            res.status(200).json({ message: "Comment deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

exports.getComments = async (req, res) => {
    try {
        const feedId = req.params.feedId;
        const comments = await feedModel.getComments(feedId);
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.isLiked = async (req, res) => {
    verifyToken(req, res, async () => {
        try {
            const { feedId } = req.params;
            const userId = req.user.id;
            const result = await feedModel.isLiked(userId, feedId);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

exports.isLikedBatch = async (req, res) => {
    verifyToken(req, res, async () => {
        try {
            const { feedIds } = req.body;
            const userId = req.user.id;
            const result = await feedModel.isLikedBatch(userId, feedIds);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

