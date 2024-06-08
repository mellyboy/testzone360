import React from 'react';
import { CListGroup, CListGroupItem } from '@coreui/react';

const CommentsList = ({ comments }) => {
    return (
        <CListGroup flush className='mt-2'>
            {comments.map(comment => (
                <CListGroupItem key={comment.id}>
                    {comment.content}
                </CListGroupItem>
            ))}
        </CListGroup>
    );
};

export default CommentsList;
