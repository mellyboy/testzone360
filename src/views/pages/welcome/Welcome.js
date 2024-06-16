import React from 'react';
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CCardText,
    CCardLink
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const CustomCard = ({ title, text, link }) => {
    const navigate = useNavigate();

    const handleCardClick = (e) => {
        e.preventDefault();
        navigate(link);
    };

    const cardStyle = {
        width: '14rem',
        margin: '0.5rem'
    };

    const linkStyle = {
        textDecoration: 'none',
        color: 'primary',
        cursor: 'pointer'
    };

    return (
        <CCard style={cardStyle}>
            <CCardBody>
                <CCardLink href={link} onClick={handleCardClick} style={linkStyle}>
                    <h5>{title}</h5>
                </CCardLink>
                <CCardText>
                    {text}
                </CCardText>
            </CCardBody>
        </CCard>
    );
};

const Welcome = () => {
    const cardData = [
        { title: 'Accordion', text: 'A collapsible list that expands to show hidden content.', link: '/accordion' },
        { title: 'Button', text: 'A clickable element to trigger actions.', link: '/button' },
        { title: 'Checkbox', text: 'A square box that can be checked or unchecked to select options.', link: '/checkbox' },
        { title: 'Dropdown', text: 'A menu that allows selection from a list of options.', link: '/dropdown' },
        { title: 'Image', text: 'Displays an image. Also contains broken images', link: '/image' },
        { title: 'Radio Button', text: 'Circular buttons for selecting one option from a group.', link: '/radio' },
        { title: 'Textboxes', text: 'Input fields for entering single-line text.', link: '/textbox' },
        { title: 'Text Area', text: 'Input fields for entering multi-line text.', link: '/textarea' },

        { title: 'Autocomplete', text: 'Suggests options as the user types in a text field.', link: '/autocomplete' },
        { title: 'Date Pickers:', text: 'Allows users to select dates from a calendar.', link: '/datepicker' },
        { title: 'Hover', text: 'Elements that respond to mouse hover actions.', link: '/hover' },
        { title: 'File Upload', text: 'Allows users to upload files from their device.', link: '/file-upload' },
        { title: 'Modal', text: 'A dialog box that overlays the main content.', link: '/modal' },
        { title: 'Range', text: 'Allows users to select a value from a range by sliding a handle.', link: '/range' },
        { title: 'Tooltips and Popover', text: 'Displays informational text when users hover over or click an element.', link: '/tooltips-and-popover' },

        { title: 'Dialogs', text: 'Pop-up windows for user interaction or alerts.', link: '/dialog' },
        { title: 'Drag-n-Drop', text: 'Allows users to move elements around the interface.', link: '/drag-n-drop' },
        { title: 'Dynamic Table', text: 'Tables that can be dynamically updated with data.', link: '/dynamic-table' },
        { title: 'IFrame', text: 'Embeds another webpage within the current page.', link: '/iframe' },
        { title: 'Toast', text: 'Small notification messages.', link: '/toast' },

        { title: 'BMI Calculator', text: 'A tool to calculate Body Mass Index based on user input.', link: '/bmi' },
        { title: 'Global Feed', text: 'A newsfeed-like feature where users can post, like, and comment.', link: '/global-feed' },
        { title: 'To Do', text: 'Draggable cards for managing tasks in To Do, Doing, and Done lanes.', link: '/to-do' },
        { title: 'Update Profile', text: 'A form with various input fields for updating user profile information.', link: '/profile' },
    ];

    return (
        <div>
            <h1>Welcome to the QA and Automation Practice Playground!</h1>
            <p>This web app offers a variety of components and practice scenarios to enhance your QA and automation skills. Explore the features below:</p>
            <CRow style={{ justifyContent: 'space-between', margin: '0' }}>
                {cardData.map((card, index) => (
                    <CustomCard key={index} title={card.title} text={card.text} link={card.link} />
                ))}
            </CRow>
        </div>
    );
};

export default Welcome;
