import React, { useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CContainer
} from '@coreui/react';

const Button = () => {
    // State to manage Button 2's disabled status and display message
    const [isButton2Disabled, setIsButton2Disabled] = useState(true);
    const [displayMessage, setDisplayMessage] = useState('');

    // State to manage the displayed number and limit message
    const [number, setNumber] = useState(0);
    const [limitMessage, setLimitMessage] = useState('');

    // Constants for minimum and maximum values
    const MIN_NUMBER = 0;
    const MAX_NUMBER = 10;

    // Click handler for Button 1
    const handleButton1Click = () => {
        const newStatus = !isButton2Disabled;
        setIsButton2Disabled(newStatus);
        if (newStatus) {
            // Clear the display message if Button 2 is disabled
            setDisplayMessage('');
        }
    };

    // Click handler for Button 2
    const handleButton2Click = () => {
        if (!isButton2Disabled) {
            setDisplayMessage('This is to confirm Button 2 is Enabled');
        }
    };

    // Click handlers for Increase and Decrease buttons
    const handleIncreaseClick = () => {
        setNumber((prevNumber) => {
            if (prevNumber < MAX_NUMBER) {
                const newNumber = prevNumber + 1;
                setLimitMessage(newNumber === MAX_NUMBER ? 'Maximum number reached!' : '');
                return newNumber;
            }
            setLimitMessage('Maximum number reached!');
            return prevNumber;
        });
    };

    const handleDecreaseClick = () => {
        setNumber((prevNumber) => {
            if (prevNumber > MIN_NUMBER) {
                const newNumber = prevNumber - 1;
                setLimitMessage(newNumber === MIN_NUMBER ? 'Minimum number reached!' : '');
                return newNumber;
            }
            setLimitMessage('Minimum number reached!');
            return prevNumber;
        });
    };

    return (
        <CContainer>
            <CRow>
            <CCol xs={12} md={6}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Example 1</strong><small>{' '}| Basic Button</small>
                        </CCardHeader>
                        <CCardBody>
                            <CContainer>
                                <CRow>
                                    <CCol xs={6}>
                                        <CRow className="mb-3">
                                            <CCol>
                                                <div className="d-grid gap-2">
                                                    <CButton id='button1' color="primary" onClick={handleButton1Click}>
                                                        Button 1
                                                    </CButton>
                                                </div>
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3">
                                            <CCol>
                                                <div className="d-grid gap-2">
                                                    <CButton id='button2' color="primary" disabled={isButton2Disabled} onClick={handleButton2Click}>
                                                        Button 2
                                                    </CButton>
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                    <CCol xs={6}>
                                        <CRow>
                                            <CCol id="example1Msg">
                                                {displayMessage}
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                </CRow>
                            </CContainer>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol xs={12} md={6}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Example 2</strong><small>{' '}| Button Clicks Counter</small>
                        </CCardHeader>
                        <CCardBody>
                            <CContainer>
                                <CRow>
                                    <CCol xs={6}>
                                        <CRow className="mb-3">
                                            <CCol>
                                                <div className="d-grid gap-2">
                                                    <CButton id='increase' color="primary" onClick={handleIncreaseClick}>
                                                        Increase
                                                    </CButton>
                                                </div>
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3">
                                            <CCol>
                                                <div className="d-grid gap-2">
                                                    <CButton id='decrease' color="primary" onClick={handleDecreaseClick}>
                                                        Decrease
                                                    </CButton>
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                    <CCol xs={6}>
                                        <CRow>
                                            <CCol>
                                                {number}
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol>
                                                {limitMessage}
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                </CRow>
                            </CContainer>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default Button;
