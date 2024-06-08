const feedModel = require('../models/feedsModel');
const jwt = require('jsonwebtoken');

//middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, 'my-32-character-ultra-secure-and-ultra-long-secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = decoded;
        next();
    });
};


exports.createFeed = (req, res) => {
    verifyToken(req, res, () => {
        const feed = { ...req.body, author_id: req.user.id };
        feedModel.createFeed(feed, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json(result);
        });
    });
};

exports.deleteFeed = (req, res) => {
    verifyToken(req, res, () => {
        const feedId = req.params.feedId;
        const userId = req.user.id;
        feedModel.deleteFeed(feedId, userId, (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.changes === 0) return res.status(404).json({ error: "Feed not found or not authorized" });
            res.status(200).json({ message: "Feed deleted successfully" });
        });
    });
};

exports.updateFeed = (req, res) => {
    verifyToken(req, res, () => {
        const feedId = req.params.feedId;
        const userId = req.user.id;
        const feed = req.body;
        feedModel.updateFeed(feedId, userId, feed, (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.changes === 0) return res.status(404).json({ error: "Feed not found or not authorized" });
            res.status(200).json({ message: "Feed updated successfully" });
        });
    });
};

exports.getGlobalFeeds = (req, res) => {
    feedModel.getGlobalFeeds((err, feeds) => {
        if (err) return res.status(500).json(err);
        res.json(feeds);
    });
};

exports.getUserFeeds = (req, res) => {
    verifyToken(req, res, () => {
        const userId = req.params.userId;
        if (!userId || userId != req.user.id) {
            return res.status(403).json({ error: "Forbidden" });
        }
        feedModel.getUserFeeds(userId, (err, feeds) => {
            if (err) return res.status(500).json(err);
            res.json(feeds);
        });
    });
};


exports.likeFeed = (req, res) => {
    verifyToken(req, res, () => {
        const like = {
            user_id: req.user.id,
            feed_id: req.params.feedId
        };
        feedModel.likeFeed(like, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json(result);
        });
    });
};

exports.unlikeFeed = (req, res) => {
    verifyToken(req, res, () => {
        const like = {
            user_id: req.user.id,
            feed_id: req.params.feedId
        };
        feedModel.unlikeFeed(like, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(result);
        });
    });
};

exports.commentOnFeed = (req, res) => {
    verifyToken(req, res, () => {
        const comment = {
            content: req.body.content,
            user_id: req.user.id,
            feed_id: req.params.feedId
        };
        feedModel.commentOnFeed(comment, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json(result);
        });
    });
};

exports.deleteComment = (req, res) => {
    verifyToken(req, res, () => {
        const commentId = req.params.commentId;
        const userId = req.user.id;
        feedModel.deleteComment(commentId, userId, (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.changes === 0) return res.status(404).json({ error: "Comment not found or not authorized" });
            res.status(200).json({ message: "Comment deleted successfully" });
        });
    });
};

exports.getComments = (req, res) => {
    const feedId = req.params.feedId;
    feedModel.getComments(feedId, (err, comments) => {
        if (err) return res.status(500).json(err);
        res.json(comments);
    });
};

exports.isLiked = (req, res) => {
    verifyToken(req, res, () => {
        const { feedId } = req.params;
        const userId = req.user.id;
        feedModel.isLiked(userId, feedId, (err, isLiked, likesCount) => {
            if (err) return res.status(500).json(err);
            res.json({ isLiked, likesCount });
        });
    });
};

exports.isLikedBatch = (req, res) => {
    verifyToken(req, res, () => {
        const { feedIds } = req.body;
        const userId = req.user.id;
        feedModel.isLikedBatch(userId, feedIds, (err, likedFeeds, likesCounts) => {
            if (err) return res.status(500).json(err);
            res.json({ likedFeeds, likesCounts });
        });
    });
};

