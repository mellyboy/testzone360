import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CCol, CListGroup, CListGroupItem, CRow } from '@coreui/react';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';

const FeedList = ({ feeds }) => {
    const [feedData, setFeedData] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token && feeds.length > 0) {
            const feedIds = feeds.map(feed => feed.id);
            axios.post(`http://localhost:5000/api/feeds/likes`, {
                feedIds
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    const { likedFeeds, likesCounts } = response.data;
                    const newFeedData = feeds.map(feed => ({
                        ...feed,
                        isLiked: likedFeeds.includes(feed.id),
                        likes: likesCounts[feed.id] || 0
                    }));
                    setFeedData(newFeedData);
                })
                .catch(error => console.error('Error fetching like status:', error));
        }
    }, [feeds, token]);

    const handleLikeChange = (feedId, isLiked, likes) => {
        setFeedData(prevFeedData =>
            prevFeedData.map(feed =>
                feed.id === feedId ? { ...feed, isLiked, likes } : feed
            )
        );
    };

    return (
        <CListGroup flush>
            {feedData.map(feed => (
                <CListGroupItem key={feed.id} className="feed-item">
                    <div className="feed-title">{feed.title}</div>
                    <div className="feed-content">{feed.content}</div>
                    <div className="feed-actions" style={{ display: 'flex', gap: '10px' }}>
                        <LikeButton
                            feedId={feed.id}
                            initialLikes={feed.likes}
                            initialIsLiked={feed.isLiked}
                            onLikeChange={handleLikeChange}
                        />
                        <CommentButton feedId={feed.id} />
                    </div>
                </CListGroupItem>
            ))}
        </CListGroup>
    );
};

export default FeedList;
