import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilThumbUp } from '@coreui/icons';

const LikeButton = ({ feedId, initialLikes, initialIsLiked, onLikeChange }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const token = localStorage.getItem('token');
    const apiURL = import.meta.env.VITE_APP_API_URL;

    const handleLike = async () => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            if (isLiked) {
                try {
                    const response = await axios.delete(`${apiURL}/feeds/${feedId}/likes`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        data: { user_id: userId }
                    });
                    if (response.status === 200) {
                        setLikes(prevLikes => prevLikes - 1);
                        setIsLiked(false);
                        onLikeChange(feedId, false, likes - 1);
                    }
                } catch (error) {
                    console.error('Error unliking the feed:', error);
                }
            } else {
                try {
                    const response = await axios.post(`${apiURL}/feeds/${feedId}/likes`, {
                        user_id: userId
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.status === 201) {
                        setLikes(prevLikes => prevLikes + 1);
                        setIsLiked(true);
                        onLikeChange(feedId, true, likes + 1);
                    }
                } catch (error) {
                    console.error('Error liking the feed:', error);
                }
            }
        }
    };

    return (
        <CButton
            size='sm'
            onClick={handleLike}
            color='primary'
        >
            <CIcon icon={cilThumbUp} size="sm" />
            {' '}{isLiked ? 'Unlike' : 'Like'} ({likes})
        </CButton>
    );
};

export default LikeButton;
