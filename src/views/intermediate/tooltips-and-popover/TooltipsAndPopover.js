import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiAccountPlus, mdiDeleteEmpty } from '@mdi/js';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CContainer,
    CTooltip,
    CPopover,
    CFormInput,
    CForm
} from '@coreui/react';

const TooltipsAndPopover = () => {
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [output, setOutput] = useState('');

    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);

    const handleSave = (e) => {
        e.preventDefault();
        if (!firstName.trim() && !lastName.trim()) {
            setOutput("You did not give either First Name or Last Name");
        } else {
            setOutput(`Hi there, ${firstName} ${lastName}!`);
        }
        setPopoverVisible(false); // Hide the popover after saving
    };


    const handleButtonClick = () => setPopoverVisible(!popoverVisible);

    return (
        <CRow className="justify-content-center">
            <CCol xs={12} md={10} lg={8}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Example</strong><small>{' '}| Tooltips and Popover</small>
                    </CCardHeader>
                    <CCardBody>
                        <CContainer>
                            <CRow>
                                <CCol md={6} xs={12}>
                                    <CRow className='mb-3'>

                                        <div className="d-grid gap-2">
                                            <CPopover
                                                content={
                                                    <CForm id='userForm' onSubmit={handleSave}>
                                                        <div className="mb-3">
                                                            <CTooltip
                                                                content="Enter your first name."
                                                                placement="top"
                                                            >
                                                                <CFormInput
                                                                    type="text"
                                                                    id="firstName"
                                                                    placeholder="First Name"
                                                                    value={firstName}
                                                                    onChange={handleFirstNameChange}
                                                                />
                                                            </CTooltip>
                                                        </div>
                                                        <div className="mb-3">
                                                            <CTooltip
                                                                content="Enter your last name."
                                                                placement="bottom"
                                                            >
                                                                <CFormInput
                                                                    type="text"
                                                                    id="lastName"
                                                                    placeholder="Last Name"
                                                                    value={lastName}
                                                                    onChange={handleLastNameChange}
                                                                />
                                                            </CTooltip>
                                                        </div>
                                                        <CTooltip
                                                            content="Click to save your details."
                                                            placement="right"
                                                        >
                                                            <CButton type="submit" color="primary">Save</CButton>
                                                        </CTooltip>
                                                    </CForm>
                                                }
                                                placement="left"
                                                trigger={["focus"]}
                                                visible={popoverVisible}

                                            >
                                                <CTooltip
                                                    content="Click to input user details."
                                                    placement="top"
                                                >
                                                    <CButton id="btnUserInfo" size='sm' color="primary" onClick={handleButtonClick}>
                                                        <Icon path={mdiAccountPlus} size={1} />
                                                        {' '}User Info
                                                    </CButton>
                                                </CTooltip>
                                            </CPopover>
                                        </div>

                                    </CRow>

                                    <CRow>
                                        <div className="d-grid gap-2">
                                            <CTooltip
                                                content="Click to clear the output"
                                                placement="bottom"
                                            >
                                                <CButton className='mb-3' id="btnDeleteOutput" size='sm' color="danger" onClick={() => setOutput('')}>
                                                    <Icon path={mdiDeleteEmpty} size={1} />
                                                    {' '}Delete Output
                                                </CButton>
                                            </CTooltip>
                                        </div>
                                    </CRow>
                                </CCol>

                                <CCol md={6} xs={12}>
                                    <CRow>
                                        <CCol id='displayOutput' xs={12}>
                                            Output:
                                            <p>
                                                {output}
                                            </p>

                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>

                        </CContainer>

                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default TooltipsAndPopover;
