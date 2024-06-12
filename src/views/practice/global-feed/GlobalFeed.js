import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
    CButton,
    CCol,
    CRow,
    CTab,
    CTabs,
    CTabContent,
    CTabList,
    CTabPanel,
    CAlert,
    CFormTextarea,
    CFormInput
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons';
import FeedList from '../../../components/Feedlist';

const GlobalFeed = () => {
    const [activeKey, setActiveKey] = useState('global-feed');
    const [globalFeeds, setGlobalFeeds] = useState([]);
    const [myFeeds, setMyFeeds] = useState([]);
    const [userId, setUserId] = useState(null);
    const [globalMessage, setGlobalMessage] = useState('');
    const [globalMessageType, setGlobalMessageType] = useState('');
    const [myFeedMessage, setMyFeedMessage] = useState('');
    const [myFeedMessageType, setMyFeedMessageType] = useState('');
    const [createFeedMessage, setCreateFeedMessage] = useState('');
    const [createFeedMessageType, setCreateFeedMessageType] = useState('');
    const [newFeedTitle, setNewFeedTitle] = useState('');
    const [newFeedContent, setNewFeedContent] = useState('');
    const [errors, setErrors] = useState({ title: '', content: '' });
    const apiURL = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchGlobalFeeds();
        if (token) {
            const decodedToken = jwtDecode(token);
            const userIdFromToken = decodedToken.id;
            setUserId(userIdFromToken);
            fetchMyFeeds(userIdFromToken, token);

        }
    }, [activeKey]);

    const fetchGlobalFeeds = async (token) => {
        try {
            const response = await fetch(`${apiURL}/feeds`);
            const data = await response.json();
            setGlobalFeeds(data);
        } catch (error) {
            setGlobalMessageType('danger');
            setGlobalMessage('Failed to fetch global feeds.');
        }
    };

    const fetchMyFeeds = async (userId, token) => {
        try {
            const response = await fetch(`${apiURL}/feeds/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                setMyFeeds(data);
            } else {
                setMyFeedMessageType('danger');
                setMyFeedMessage('Failed to fetch your feed.');
            }
        } catch (error) {
            setMyFeedMessageType('danger');
            setMyFeedMessage('An error occurred while fetching your feed.');
        }
    };

    const validateInputs = () => {
        let isValid = true;
        let errors = { title: '', content: '' };

        if (newFeedTitle.length < 15 || newFeedTitle.length > 120) {
            errors.title = 'Title cannot be empty.';
            isValid = false;
        }

        if (newFeedContent.length < 15 || newFeedContent.length > 1500) {
            errors.content = 'Content must be between 15 and 1500 characters.';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handlePublish = async () => {
        if (!validateInputs()) {
            setCreateFeedMessage('Please fix the errors before submitting.');
            setCreateFeedMessageType('danger');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiURL}/feeds`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: newFeedTitle,
                    content: newFeedContent,
                    author_id: userId
                })
            });
            if (response.ok) {
                setNewFeedTitle('');
                setNewFeedContent('');
                setCreateFeedMessageType('success');
                setCreateFeedMessage('Feed published successfully.');
                fetchGlobalFeeds();
                fetchMyFeeds(userId, token);
            } else {
                setCreateFeedMessageType('danger');
                setCreateFeedMessage('Failed to publish feed.');
            }
        } catch (error) {
            setCreateFeedMessageType('danger');
            setCreateFeedMessage('An error occurred while publishing the feed.');
        }
    };

    const handleDeleteFeed = (feedId) => {
        setGlobalFeeds(globalFeeds.filter(feed => feed.id !== feedId));
        setMyFeeds(myFeeds.filter(feed => feed.id !== feedId));
        window.location.reload();
    };

    const handleUpdateFeed = (updatedFeed) => {
        setGlobalFeeds(globalFeeds.map(feed => feed.id === updatedFeed.id ? updatedFeed : feed));
        setMyFeeds(myFeeds.map(feed => feed.id === updatedFeed.id ? updatedFeed : feed));
    };

    const handleLikeChange = (feedId, isLiked, likes) => {
        setGlobalFeeds(prevGlobalFeeds =>
            prevGlobalFeeds.map(feed =>
                feed.id === feedId ? { ...feed, isLiked, likes } : feed
            )
        );
        setMyFeeds(prevMyFeeds =>
            prevMyFeeds.map(feed =>
                feed.id === feedId ? { ...feed, isLiked, likes } : feed
            )
        );
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CTabs activeItemKey={activeKey} onActiveItemChange={setActiveKey}>
                    <CTabList className='mb-2' variant="tabs">
                        <CTab itemKey="global-feed">Global Feed</CTab>
                        <CTab itemKey="my-feed">My Feed</CTab>
                        <CTab itemKey="create-feed">Create Feed</CTab>
                    </CTabList>
                    <CTabContent>
                        <CTabPanel className="p-0" itemKey="global-feed">
                            <div className="panel-content">
                                {globalMessage && (
                                    <CAlert color={globalMessageType}>
                                        {globalMessage}
                                    </CAlert>
                                )}
                                <FeedList
                                    feeds={globalFeeds}
                                    currentUserId={userId}
                                    onDeleteFeed={handleDeleteFeed}
                                    onUpdateFeed={handleUpdateFeed}
                                    onLikeChange={handleLikeChange}
                                />
                            </div>
                        </CTabPanel>
                        <CTabPanel className="p-0" itemKey="my-feed">
                            <div className="panel-content">
                                {myFeedMessage && (
                                    <CAlert color={myFeedMessageType}>
                                        {myFeedMessage}
                                    </CAlert>
                                )}
                                <FeedList
                                    feeds={myFeeds}
                                    currentUserId={userId}
                                    onDeleteFeed={handleDeleteFeed}
                                    onUpdateFeed={handleUpdateFeed}
                                    onLikeChange={handleLikeChange}
                                />
                            </div>
                        </CTabPanel>
                        <CTabPanel className="p-0" itemKey="create-feed">
                            <div className="panel-content">
                                {createFeedMessage && (
                                    <CAlert color={createFeedMessageType}>
                                        {createFeedMessage}
                                    </CAlert>
                                )}
                                <CFormInput
                                    size="lg"
                                    placeholder="Title"
                                    type="text"
                                    value={newFeedTitle}
                                    onChange={(e) => setNewFeedTitle(e.target.value)}
                                    className={`mb-2 ${errors.title ? 'is-invalid' : ''}`}
                                />
                                {errors.title && <div className="invalid-feedback">{errors.title}</div>}

                                <CFormTextarea
                                    className={`mb-2 ${errors.content ? 'is-invalid' : ''}`}
                                    placeholder="Must be 15 - 1500 characters."
                                    value={newFeedContent}
                                    onChange={(e) => setNewFeedContent(e.target.value)}
                                    style={{ height: '100px' }}
                                ></CFormTextarea>
                                {errors.content && <div className="invalid-feedback">{errors.content}</div>}

                                <CButton
                                    size="sm"
                                    color="primary"
                                    onClick={handlePublish}
                                >
                                    <CIcon icon={cilPlus} size="sm" />
                                    {' '}Publish
                                </CButton>
                            </div>
                        </CTabPanel>
                    </CTabContent>
                </CTabs>
            </CCol>
        </CRow>
    );
};

export default GlobalFeed;
