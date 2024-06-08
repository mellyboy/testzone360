import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CButton, CCollapse, CFormTextarea, CListGroup, CRow, CCol, CCard, CCardBody } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCommentSquare } from '@coreui/icons';
import CommentsList from './CommentList';

const CommentButton = ({ feedId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (isOpen) {
            fetchComments();
        }
    }, [isOpen]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/feeds/${feedId}/comments`, {
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
            const response = await axios.post(`http://localhost:5000/api/feeds/${feedId}/comments`, {
                content: newComment
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 201) {
                setComments([...comments, response.data]);
                setNewComment('');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <CButton size='sm' color='secondary' onClick={() => setIsOpen(!isOpen)}>
                <CIcon icon={cilCommentSquare} size="sm" />
                {' '}Comment
            </CButton>
            <CCollapse visible={isOpen}>
                <div style={{ width: '100%', marginTop: '10px' }}>
                    <CommentsList comments={comments} />
                    <CFormTextarea
                        placeholder="Add a comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className='mt-2'
                    />
                    <CButton size='sm' color='primary' onClick={handleAddComment} className='mt-2'>
                        Submit
                    </CButton>
                </div>
            </CCollapse>
        </div>
    );

};

export default CommentButton;
