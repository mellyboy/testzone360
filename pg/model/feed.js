const pool = require('../db');

// Create a feed
const createFeed = async (feed) => {
    try {
        const { title, content, author_id } = feed;
        const query = `
            INSERT INTO feeds (title, content, author_id) 
            VALUES ($1, $2, $3) 
            RETURNING id
        `;
        const { rows } = await pool.query(query, [title, content, author_id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

// Update a feed
const updateFeed = async (feedId, userId, feed) => {
    try {
        const { title, content } = feed;
        const query = `
            UPDATE feeds 
            SET title = $1, content = $2 
            WHERE id = $3 AND author_id = $4
            RETURNING id
        `;
        const { rowCount } = await pool.query(query, [title, content, feedId, userId]);
        return rowCount;
    } catch (error) {
        throw error;
    }
};

// Delete a feed
const deleteFeed = async (feedId, userId) => {
    try {
        const query = `
            DELETE FROM feeds 
            WHERE id = $1 AND author_id = $2
            RETURNING id
        `;
        const { rowCount } = await pool.query(query, [feedId, userId]);
        return rowCount;
    } catch (error) {
        throw error;
    }
};

// Retrieve all feeds (global feeds)
const getGlobalFeeds = async () => {
    try {
        const query = `
            SELECT feeds.*, users.first_name, users.last_name 
            FROM feeds 
            JOIN users ON feeds.author_id = users.id 
            ORDER BY feeds.created_at DESC
        `;
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        throw error;
    }
};

// Retrieve user's feeds (my feeds)
const getUserFeeds = async (userId) => {
    try {
        const query = `
            SELECT feeds.*, users.first_name, users.last_name 
            FROM feeds 
            JOIN users ON feeds.author_id = users.id 
            WHERE feeds.author_id = $1 
            ORDER BY feeds.created_at DESC
        `;
        const { rows } = await pool.query(query, [userId]);
        return rows;
    } catch (error) {
        throw error;
    }
};

// Like a feed
const likeFeed = async (like) => {
    try {
        const { user_id, feed_id } = like;
        const query = `
            INSERT INTO likes (user_id, feed_id) 
            VALUES ($1, $2) 
            RETURNING id
        `;
        const { rows } = await pool.query(query, [user_id, feed_id]);
        // Increment likes_count in feeds table
        await pool.query(`UPDATE feeds SET likes_count = likes_count + 1 WHERE id = $1`, [feed_id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

// Unlike a feed
const unlikeFeed = async (like) => {
    try {
        const { user_id, feed_id } = like;
        const query = `
            DELETE FROM likes 
            WHERE user_id = $1 AND feed_id = $2
            RETURNING id
        `;
        const { rowCount } = await pool.query(query, [user_id, feed_id]);
        if (rowCount > 0) {
            // Decrement likes_count in feeds table
            await pool.query(`UPDATE feeds SET likes_count = likes_count - 1 WHERE id = $1`, [feed_id]);
        }
        return rowCount;
    } catch (error) {
        throw error;
    }
};

// Check if a user has liked a feed
const isLiked = async (user_id, feed_id) => {
    try {
        const isLikedQuery = `
            SELECT 1 FROM likes 
            WHERE user_id = $1 AND feed_id = $2
        `;
        const likesCountQuery = `
            SELECT COUNT(*) AS likesCount 
            FROM likes 
            WHERE feed_id = $1
        `;
        const isLikedResult = await pool.query(isLikedQuery, [user_id, feed_id]);
        const isLiked = isLikedResult.rows.length > 0;
        const likesCountResult = await pool.query(likesCountQuery, [feed_id]);
        const likesCount = parseInt(likesCountResult.rows[0].likescount, 10);
        return { isLiked, likesCount };
    } catch (error) {
        throw error;
    }
};

const isLikedBatch = async (user_id, feedIds) => {
    try {
        const likedFeedsQuery = `
            SELECT feed_id 
            FROM likes 
            WHERE user_id = $1 AND feed_id = ANY($2)
        `;
        const likesCountsQuery = `
            SELECT feed_id, COUNT(*) AS likesCount 
            FROM likes 
            WHERE feed_id = ANY($1)
            GROUP BY feed_id
        `;

        const likedFeedsResult = await pool.query(likedFeedsQuery, [user_id, feedIds]);
        const likedFeeds = likedFeedsResult.rows.map(row => row.feed_id);

        const likesCountsResult = await pool.query(likesCountsQuery, [feedIds]);
        const likesCounts = likesCountsResult.rows.reduce((acc, row) => {
            acc[row.feed_id] = parseInt(row.likescount, 10);
            return acc;
        }, {});

        return { likedFeeds, likesCounts };
    } catch (error) {
        throw error;
    }
};


// Add a comment to a feed
const commentOnFeed = async (comment) => {
    try {
        const { content, user_id, feed_id } = comment;
        const query = `
            INSERT INTO comments (content, user_id, feed_id) 
            VALUES ($1, $2, $3) 
            RETURNING id
        `;
        const { rows } = await pool.query(query, [content, user_id, feed_id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

// Delete a comment
const deleteComment = async (commentId, userId) => {
    try {
        const query = `
            DELETE FROM comments 
            WHERE id = $1 AND user_id = $2
            RETURNING id
        `;
        const { rowCount } = await pool.query(query, [commentId, userId]);
        return rowCount;
    } catch (error) {
        throw error;
    }
};

// Retrieve comments for a specific feed
const getComments = async (feedId) => {
    try {
        const query = `
            SELECT comments.id, comments.content, comments.created_at, comments.user_id, 
                   users.first_name, users.last_name
            FROM comments
            JOIN users ON comments.user_id = users.id
            WHERE comments.feed_id = $1
            ORDER BY comments.created_at DESC
        `;
        const { rows } = await pool.query(query, [feedId]);
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createFeed,
    updateFeed,
    deleteFeed,
    getGlobalFeeds,
    getUserFeeds,
    likeFeed,
    unlikeFeed,
    isLiked,
    isLikedBatch,
    commentOnFeed,
    deleteComment,
    getComments,
};
