import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
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
import { cilPlus, cilThumbUp } from '@coreui/icons';
import FeedList from '../../../components/Feedlist';  // Import FeedList

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

    useEffect(() => {
        // Fetch global feeds
        fetch('http://localhost:5000/api/feeds')
            .then(response => response.json())
            .then(data => setGlobalFeeds(data));

        // Decode token and fetch my feeds
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userIdFromToken = decodedToken.id;
            setUserId(userIdFromToken);
            fetchMyFeeds(userIdFromToken, token);
        }
    }, []);

    const fetchMyFeeds = async (userId, token) => {
        try {
            const response = await fetch(`http://localhost:5000/api/feeds/${userId}`, {
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

    const handlePublish = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/feeds', {
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
                // Clear input fields
                setNewFeedTitle('');
                setNewFeedContent('');
                setCreateFeedMessageType('success');
                setCreateFeedMessage('Feed published successfully.');
                // Fetch updated global feeds
                fetch('http://localhost:5000/api/feeds')
                    .then(response => response.json())
                    .then(data => setGlobalFeeds(data));
            } else {
                setCreateFeedMessageType('danger');
                setCreateFeedMessage('Failed to publish feed.');
            }
        } catch (error) {
            setCreateFeedMessageType('danger');
            setCreateFeedMessage('An error occurred while publishing the feed.');
        }
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
                                <FeedList feeds={globalFeeds} />
                            </div>
                        </CTabPanel>
                        <CTabPanel className="p-0" itemKey="my-feed">
                            <div className="panel-content">
                                {myFeedMessage && (
                                    <CAlert color={myFeedMessageType}>
                                        {myFeedMessageType}
                                    </CAlert>
                                )}
                                <FeedList feeds={myFeeds} />
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
                                    size='lg'
                                    placeholder='Title'
                                    type="text"
                                    value={newFeedTitle}
                                    onChange={(e) => setNewFeedTitle(e.target.value)}
                                    className='mb-2'
                                />
                                <CFormTextarea
                                    className='mb-2'
                                    placeholder="Must be 15 - 1500 characters."
                                    value={newFeedContent}
                                    onChange={(e) => setNewFeedContent(e.target.value)}
                                    style={{ height: '100px' }}
                                ></CFormTextarea>
                                <CButton
                                    size='sm'
                                    color='primary'
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
