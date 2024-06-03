import React, { useState } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CFormCheck
} from '@coreui/react';

const RadioButton = () => {
    const [selectedBasicRadio, setSelectedBasicRadio] = useState('Option 2');
    const [selectedDisabledRadio, setSelectedDisabledRadio] = useState('Option 3');
    const [selectedToggleButton, setSelectedToggleButton] = useState('Paid');

    const handleBasicRadioChange = (e) => {
        setSelectedBasicRadio(e.target.value);
    };

    const handleDisabledRadioChange = (e) => {
        setSelectedDisabledRadio(e.target.value);
    };

    const handleToggleButtonChange = (e) => {
        setSelectedToggleButton(e.target.value);
    };

    return (
        <CRow className="d-flex align-items-stretch">
            <CCol xs={4} className="d-flex flex-grow-1">
                <CCard className="d-flex flex-column mb-4 flex-grow-1">
                    <CCardHeader>
                        <strong>Example 1</strong><small>{' '}| Basic Radio Button</small>
                    </CCardHeader>
                    <CCardBody>
                        <CFormCheck
                            type="radio"
                            name="basicRadioButton"
                            id="radioButton1"
                            value="Option 1"
                            label="Option 1"
                            checked={selectedBasicRadio === 'Option 1'}
                            onChange={handleBasicRadioChange}
                            className="mb-4"
                        />
                        <CFormCheck
                            type="radio"
                            name="basicRadioButton"
                            id="radioButton2Default"
                            value="Option 2"
                            label="Option 2"
                            checked={selectedBasicRadio === 'Option 2'}
                            onChange={handleBasicRadioChange}
                            className="mb-4"
                        />
                        <CFormCheck
                            type="radio"
                            name="basicRadioButton"
                            id="radioButton3"
                            value="Option 3"
                            label="Option 3"
                            checked={selectedBasicRadio === 'Option 3'}
                            onChange={handleBasicRadioChange}
                            className="mb-4"
                        />
                        <div className="output-box mt-4">Selected: {selectedBasicRadio}</div>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={4} className="d-flex flex-grow-1">
                <CCard className="d-flex flex-column mb-4 flex-grow-1">
                    <CCardHeader>
                        <strong>Example 2</strong><small>{' '}| Disabled Radio Button</small>
                    </CCardHeader>
                    <CCardBody>
                        <CFormCheck
                            type="radio"
                            name="withDisabledButton"
                            id="activeRadioBtn"
                            value="Option 1"
                            label="Option 1"
                            checked={selectedDisabledRadio === 'Option 1'}
                            onChange={handleDisabledRadioChange}
                            className="mb-4"
                        />
                        <CFormCheck
                            type="radio"
                            name="withDisabledButton"
                            id="disabledRadioBtn"
                            value="Option 2"
                            label="Option 2"
                            disabled
                            className="mb-4"
                        />
                        <CFormCheck
                            type="radio"
                            name="withDisabledButton"
                            id="defaultRadioBtn"
                            value="Option 3"
                            label="Option 3"
                            checked={selectedDisabledRadio === 'Option 3'}
                            onChange={handleDisabledRadioChange}
                            className="mb-4"
                        />
                        <div className="output-box mt-4">Selected: {selectedDisabledRadio}</div>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={4} className="d-flex flex-grow-1">
                <CCard className="d-flex flex-column mb-4 flex-grow-1">
                    <CCardHeader>
                        <strong>Example 3</strong><small>{' '}| Radio as Toggle Button</small>
                    </CCardHeader>
                    <CCardBody className="d-flex flex-column">
                        <div className="d-flex justify-content-around mb-5">
                            <CFormCheck
                                button={{ color: 'success', variant: 'outline' }}
                                type="radio"
                                name="options-outlined"
                                id="option1"
                                value="Paid"
                                autoComplete="off"
                                label="Paid"
                                checked={selectedToggleButton === 'Paid'}
                                onChange={handleToggleButtonChange}
                            />
                            <CFormCheck
                                button={{ color: 'warning', variant: 'outline' }}
                                type="radio"
                                name="options-outlined"
                                id="option2"
                                value="Pending"
                                autoComplete="off"
                                label="Pending"
                                checked={selectedToggleButton === 'Pending'}
                                onChange={handleToggleButtonChange}
                            />
                            <CFormCheck
                                button={{ color: 'danger', variant: 'outline' }}
                                type="radio"
                                name="options-outlined"
                                id="option3"
                                value="Overdue"
                                autoComplete="off"
                                label="Overdue"
                                checked={selectedToggleButton === 'Overdue'}
                                onChange={handleToggleButtonChange}
                            />
                        </div>
                        <div className="output-box">Selected: {selectedToggleButton}</div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default RadioButton;
