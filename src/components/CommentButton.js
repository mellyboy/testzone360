import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CButton, CCollapse, CFormTextarea, CListGroup, CRow, CCol, CCard, CCardBody } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCommentSquare } from '@coreui/icons';
import CommentsList from './CommentList';

const CommentButton = ({ feedId,currentUserId  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const token = localStorage.getItem('token');
    const apiURL = import.meta.env.VITE_APP_API_URL;

    useEffect(() => {
        if (isOpen) {
            fetchComments();
        }
    }, [isOpen]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${apiURL}/feeds/${feedId}/comments`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setComments(response.data);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleAddComment = async () => {
        try {
            const response = await axios.post(`${apiURL}/feeds/${feedId}/comments`, {
                content: newComment
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 201) {
                // Fetch the user information
                const userResponse = await axios.get(`${apiURL}/user/userprofile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Add the new comment to the comments array
                setComments([...comments, {
                    id: response.data.id,
                    content: newComment,
                    user_id: currentUserId,
                    first_name: userResponse.data.firstName,
                    last_name: userResponse.data.lastName
                }]);
                setNewComment('');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = (commentId) => {
        setComments(comments.filter(comment => comment.id !== commentId));
    };

    return (
        <>
            <CButton size='sm' color='secondary' onClick={() => setIsOpen(!isOpen)}>
                <CIcon icon={cilCommentSquare} size="sm" />
                {' '}Comment
            </CButton>
            <CCollapse visible={isOpen}>
                <CommentsList comments={comments} currentUserId={currentUserId} onDeleteComment={handleDeleteComment} />
                <CFormTextarea
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className='mt-2'
                />
                <CButton size='sm' color='primary' onClick={handleAddComment} className='mt-2'>
                    Submit
                </CButton>
            </CCollapse>
        </>
    );

};

export default CommentButton;
