import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CButton, CListGroup, CListGroupItem, CModal, CModalBody, CModalFooter, CModalHeader, CFormInput, CFormTextarea, CTooltip } from '@coreui/react';
import Icon from '@mdi/react';
import { mdiDelete, mdiFileEdit } from '@mdi/js';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';

const FeedList = ({ feeds, currentUserId, onDeleteFeed, onUpdateFeed, onLikeChange }) => {
    const [feedData, setFeedData] = useState([]);
    const token = localStorage.getItem('token');
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editFeed, setEditFeed] = useState({ id: '', title: '', content: '' });

    const handleEditClick = (feed) => {
        setEditFeed(feed);
        setEditModalVisible(true);
    };

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

    const handleUpdateFeed = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:5000/api/feeds/${editFeed.id}`, {
                title: editFeed.title,
                content: editFeed.content
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                onUpdateFeed(editFeed);  // Call parent callback to update feed
                setFeedData(feedData.map(feed => feed.id === editFeed.id ? editFeed : feed)); // Update local state
                setEditModalVisible(false);
            }
        } catch (error) {
            console.error('Error updating feed:', error);
        }
    };

    const handleDeleteFeed = async (feedId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`http://localhost:5000/api/feeds/${feedId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                onDeleteFeed(feedId);  // Call parent callback to delete feed
                setFeedData(feedData.filter(feed => feed.id !== feedId)); // Update local state
            }
        } catch (error) {
            console.error('Error deleting feed:', error);
        }
    };

    const handleLikeChange = (feedId, isLiked, likes) => {
        setFeedData(prevFeedData =>
            prevFeedData.map(feed =>
                feed.id === feedId ? { ...feed, isLiked, likes } : feed
            )
        );
        // Call the parent callback to update like status
        onLikeChange(feedId, isLiked, likes);
    };

    return (
        <>
            <CListGroup flush>
                {feedData.map(feed => (
                    <CListGroupItem key={feed.id} className="feed-item">
                        <div className="feed-author">
                            {feed.first_name} {feed.last_name}
                            <span className="feed-created-at">{new Date(feed.created_at).toLocaleString()}</span>
                        </div>
                        <div className="feed-title">{feed.title}</div>
                        <div className="feed-content">{feed.content}</div>
                        <div className="feed-actions">
                            <LikeButton
                                feedId={feed.id}
                                initialLikes={feed.likes}
                                initialIsLiked={feed.isLiked}
                                onLikeChange={handleLikeChange}
                            />
                            <CommentButton feedId={feed.id} currentUserId={currentUserId} />
                            {feed.author_id === currentUserId && (
                                <div className="corner-buttons">
                                    <CTooltip
                                        content="Edit Feed"
                                        trigger={['hover']}
                                    >
                                        <CButton className='small-button' size='sm' color='warning' onClick={() => handleEditClick(feed)}>
                                            <Icon path={mdiFileEdit} size={0.7} />
                                        </CButton>
                                    </CTooltip>
                                    <CTooltip
                                        content="Delete Feed"
                                        trigger={['hover']}
                                    >
                                        <CButton className='small-button' size='sm' color='danger' onClick={() => handleDeleteFeed(feed.id)}>
                                            <Icon path={mdiDelete} size={0.7} />
                                        </CButton>
                                    </CTooltip>
                                </div>
                            )}
                        </div>
                    </CListGroupItem>
                ))}
            </CListGroup>
            <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)}>
                <CModalHeader>Update Feed</CModalHeader>
                <CModalBody>
                    <CFormInput
                        type="text"
                        value={editFeed.title}
                        onChange={(e) => setEditFeed({ ...editFeed, title: e.target.value })}
                        className='mb-2'
                    />
                    <CFormTextarea
                        value={editFeed.content}
                        onChange={(e) => setEditFeed({ ...editFeed, content: e.target.value })}
                        className='mb-2'
                        style={{ height: '100px' }}
                    />
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={handleUpdateFeed}>Update</CButton>
                    <CButton color="secondary" onClick={() => setEditModalVisible(false)}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default FeedList;
