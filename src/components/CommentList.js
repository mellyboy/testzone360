import React from 'react';
import { CCard, CCardBody, CCardText, CListGroup, CButton } from '@coreui/react';
import axios from 'axios';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

const CommentsList = ({ comments, currentUserId, onDeleteComment }) => {
    const apiURL = import.meta.env.VITE_APP_API_URL;

    const handleDelete = async (commentId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${apiURL}/comments/${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            onDeleteComment(commentId);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <CListGroup className='mt-2'>
            {comments.map(comment => (
                <CCard className='custom-card-comment border-info' key={comment.id}>
                    <CCardBody className='d-flex justify-content-between align-items-center'>
                        <CCardText className='custom-card-text-comment mb-0'>
                           <strong>{comment.first_name} {comment.last_name}</strong>: {comment.content}
                        </CCardText>
                        {comment.user_id === currentUserId && (
                            <CButton size='sm' color='danger' onClick={() => handleDelete(comment.id)}>
                                <Icon path={mdiDelete} size={0.7} />
                            </CButton>
                        )}
                    </CCardBody>
                </CCard>
            ))}
        </CListGroup>
    );
};

export default CommentsList;
