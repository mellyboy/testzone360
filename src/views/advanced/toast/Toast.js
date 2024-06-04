import React, { useState, useRef } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CToast,
    CToastBody,
    CToastHeader,
    CToastClose,
    CToaster,
    CImage
} from '@coreui/react';

import catImg from "src/assets/images/img/cat_img2.jpg"

const Toast = () => {

    //example 1
    const [toast, addToast] = useState(0)

    const toaster = useRef()
    const exampleToast = (
        <CToast>
            <CToastHeader closeButton>
                <svg
                    className="rounded me-2"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    role="img"
                >
                    <rect width="100%" height="100%" fill="#bddaff"></rect>
                </svg>
                <div className="fw-bold me-auto">Hello there!</div>
            </CToastHeader>
            <CToastBody>I am a toast message. I will automatically disappear!</CToastBody>
        </CToast>
    );

    //example 2
    const [example2Toast, addExample2Toast] = useState(0)
    const example2Toaster = useRef()

    const [buttonPressCount, setButtonPressCount] = useState(0);

    const example2ToastMsg = (
        <CToast autohide={false} visible={true} className="w-75"> {/* Adjust width here */}
            <CToastBody>
                <CRow>
                    <CCol xs={12} className="text-center mb-2">
                        Hello there! I will not automatically disappear!
                    </CCol>
                </CRow>
                <CRow className="justify-content-center">
                    <CCol xs={12} className="text-center">
                        <CImage rounded thumbnail src={catImg} width={100} height={100} />
                    </CCol>
                </CRow>
                <div className="mt-2 pt-2 border-top">
                    <CToastClose as={CButton} color="secondary" size="sm" className="ms-1">
                        Close
                    </CToastClose>
                </div>
            </CToastBody>
        </CToast>
    );

    return (
        <CRow>
            <CCol xs={6}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Example 1</strong><small>{' '}| Simple Toast</small>
                    </CCardHeader>
                    <CCardBody>
                        <CButton id='example1SendToast' color="primary" onClick={() => addToast(exampleToast)}>Send a toast</CButton>
                        <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={6}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Example 2</strong><small>{' '}| Components Inside a Toast</small>
                    </CCardHeader>
                    <CCardBody>
                        <CButton id='example2SendToast' color="primary" onClick={() => addExample2Toast(example2ToastMsg)}>Send a toast</CButton>
                        <CToaster className="p-3" placement="bottom" push={example2Toast} ref={example2Toaster} />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Toast