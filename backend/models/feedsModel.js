const db = require('../database');

//create a feed
const createFeed = (feed, callback) => {
    const { title, content, author_id } = feed;
    const query = `INSERT INTO feeds (title, content, author_id) VALUES (?, ?, ?)`;
    db.run(query, [title, content, author_id], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null, { id: this.lastID });
    });
};

// Update a feed
const updateFeed = (feedId, userId, feed, callback) => {
    const { title, content } = feed;
    const query = `UPDATE feeds SET title = ?, content = ? WHERE id = ? AND author_id = ?`;
    db.run(query, [title, content, feedId, userId], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null, { changes: this.changes });
    });
};

//delete a feed
const deleteFeed = (feedId, userId, callback) => {
    const query = `DELETE FROM feeds WHERE id = ? AND author_id = ?`;
    db.run(query, [feedId, userId], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null, { changes: this.changes });
    });
};


//retrieve all feeds (global feeds)
const getGlobalFeeds = (callback) => {
    const query = `SELECT * FROM feeds ORDER BY created_at DESC`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return callback(err);
        }
        callback(null, rows);
    });
};

//retrieve user's feeds (my feeds)
const getUserFeeds = (userId, callback) => {
    const query = `SELECT * FROM feeds WHERE author_id = ? ORDER BY created_at DESC`;
    db.all(query, [userId], (err, rows) => {
        if (err) {
            return callback(err);
        }
        callback(null, rows);
    });
};


//like a feed
const likeFeed = (like, callback) => {
    const { user_id, feed_id } = like;
    const query = `INSERT INTO likes (user_id, feed_id) VALUES (?, ?)`;
    db.run(query, [user_id, feed_id], function(err) {
        if (err) {
            return callback(err);
        }
        // Increment likes_count in feeds table
        db.run(`UPDATE feeds SET likes_count = likes_count + 1 WHERE id = ?`, [feed_id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, { id: this.lastID });
        });
    });
};

//unlike a feed
const unlikeFeed = (like, callback) => {
    const { user_id, feed_id } = like;
    const query = `DELETE FROM likes WHERE user_id = ? AND feed_id = ?`;
    db.run(query, [user_id, feed_id], function(err) {
        if (err) {
            return callback(err);
        }
        // Decrement likes_count in feeds table
        db.run(`UPDATE feeds SET likes_count = likes_count - 1 WHERE id = ?`, [feed_id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, { changes: this.changes });
        });
    });
};

//check if a user has liked a feed
const isLiked = (user_id, feed_id, callback) => {
    const isLikedQuery = `SELECT * FROM likes WHERE user_id = ? AND feed_id = ?`;
    const likesCountQuery = `SELECT COUNT(*) AS likesCount FROM likes WHERE feed_id = ?`;

    db.get(isLikedQuery, [user_id, feed_id], (err, row) => {
        if (err) {
            return callback(err);
        }
        const isLiked = !!row;

        db.get(likesCountQuery, [feed_id], (err, countRow) => {
            if (err) {
                return callback(err);
            }
            const likesCount = countRow ? countRow.likesCount : 0;
            callback(null, isLiked, likesCount);
        });
    });
};

const isLikedBatch = (user_id, feed_ids, callback) => {
    const isLikedQuery = `SELECT feed_id FROM likes WHERE user_id = ? AND feed_id IN (${feed_ids.map(() => '?').join(',')})`;
    const likesCountQuery = `SELECT feed_id, COUNT(*) AS likesCount FROM likes WHERE feed_id IN (${feed_ids.map(() => '?').join(',')}) GROUP BY feed_id`;

    db.all(isLikedQuery, [user_id, ...feed_ids], (err, likedRows) => {
        if (err) {
            return callback(err);
        }
        const likedFeeds = likedRows.map(row => row.feed_id);

        db.all(likesCountQuery, feed_ids, (err, countRows) => {
            if (err) {
                return callback(err);
            }
            const likesCounts = {};
            countRows.forEach(row => {
                likesCounts[row.feed_id] = row.likesCount;
            });
            callback(null, likedFeeds, likesCounts);
        });
    });
};


//add a comment to a feed
const commentOnFeed = (comment, callback) => {
    const { content, user_id, feed_id } = comment;
    const query = `INSERT INTO comments (content, user_id, feed_id) VALUES (?, ?, ?)`;
    db.run(query, [content, user_id, feed_id], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null, { id: this.lastID });
    });
};

//delete a comment
const deleteComment = (commentId, userId, callback) => {
    const query = `DELETE FROM comments WHERE id = ? AND user_id = ?`;
    db.run(query, [commentId, userId], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null, { changes: this.changes });
    });
};

//retrieve comments for a specific feed
const getComments = (feedId, callback) => {
    const query = `
        SELECT comments.id, comments.content, comments.created_at, comments.user_id, users.first_name, users.last_name
        FROM comments
        JOIN users ON comments.user_id = users.id
        WHERE comments.feed_id = ?
        ORDER BY comments.created_at DESC
    `;
    db.all(query, [feedId], (err, rows) => {
        if (err) {
            return callback(err);
        }
        callback(null, rows);
    });
};

module.exports = { createFeed, updateFeed, deleteFeed, getGlobalFeeds, getUserFeeds, likeFeed, unlikeFeed, commentOnFeed, deleteComment, getComments, isLiked, isLikedBatch };
