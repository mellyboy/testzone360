import React from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CRow,
} from '@coreui/react';
import { IMaskMixin } from 'react-imask'

const Textbox = () => {
    const CFormInputWithMask = IMaskMixin(({ inputRef, ...props }) => (
        <CFormInput {...props} ref={inputRef} />
    ))

    const CFormInputCard = IMaskMixin(({ inputRef, ...props }) => (
        <CFormInput {...props} ref={inputRef} />
    ))

    const CFormInputMobile = IMaskMixin(({ inputRef, ...props }) => (
        <CFormInput {...props} ref={inputRef} />
    ))

    return (
        <CRow>

            <CCol xs={6}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Example 1</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm>
                            <div className="mb-3">
                                <CFormInput label="Basic Input" type="text" id="basicInput" aria-label="default input example" />
                            </div>
                            <div className="mb-3">
                                <CFormInput label="Email Address" type="email" id="inputEmail" placeholder="example@email.com" aria-label="default input example" />
                            </div>
                            <div className="mb-3">
                                <CFormInput label="Password" type="password" id="inputPassword" aria-label="default input example" />
                            </div>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol xs={6}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Example 2</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm>
                            <div className="mb-3">
                                <CFormInput label="Disabled Input:" type="text" aria-label="Disabled input example" disabled />
                            </div>
                            <div className="mb-3">
                                <CFormInput label="Disabled Readonly Input:" type="text" aria-label="Disabled input example" disabled />
                            </div>
                            <div className="mb-3">
                                <CFormInput label="Readonly Input Plain Text:" type="text" id="staticEmail" defaultValue="email@example.com" readOnly plainText />
                            </div>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Example 3</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm>
                            <div className="mb-3">
                                <CFormInput type="email" floatingClassName="mb-3" floatingLabel="Email address" placeholder="name@example.com" />
                            </div>
                            <div className="mb-3">
                                <CFormInput type="password" floatingLabel="Password" placeholder="Password" />
                            </div>
                            <div className="mb-3">
                                <CFormInput
                                    type="text"
                                    id="textboxWithDefaultValue"
                                    floatingLabel="Text Here:"
                                    placeholder="Default"
                                    defaultValue="I am default value..."
                                />
                            </div>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Example 4</strong><small>{' '}| Input with mask</small>
                    </CCardHeader>
                    <CCardBody>
                        <CForm>
                            <div className="mb-3">
                                <CFormInputWithMask
                                    mask={Date}
                                    min={new Date(1800, 0, 1)}
                                    max={new Date(3024, 0, 1)}
                                    lazy={false}
                                    label="Date (dd-mm-yyyy):"
                                    id="maskInputDate"
                                />
                            </div>
                            <div className="mb-3">
                                <CFormInputCard
                                    id="maskInputCard"
                                    label="Credit Card Number"
                                    placeholder="0000 0000 0000 0000"
                                    mask="0000 0000 0000 0000" />
                            </div>
                            <div className="mb-3">
                                <CFormInputWithMask
                                    id="maskInputNumber"
                                    label="Phone Number"
                                    placeholder="+{63}(00)0000-0000"
                                    mask="+{63}(00)0000-0000" />
                            </div>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Textbox