import React, { useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react';

const Dialog = () => {
    const [output, setOutput] = useState("");

    const handleAlert = () => {
        window.alert("This is an alert box!");
        setOutput("Alert: User clicked OK.");
    }

    const handleConfirm = () => {
        const result = window.confirm("This is a confirm box. Do you want to proceed?");
        if (result) {
            setOutput("Confirm: User clicked OK.");
        } else {
            setOutput("Confirm: User clicked Cancel.");
        }
    }

    const handlePrompt = () => {
        const result = window.prompt("This is a prompt box. Please enter something:");
        if (result !== null) {
            setOutput("User entered: " + result);
        } else {
            setOutput("User clicked Cancel.");
        }
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Examples</strong><small>{' '}| JavaScript Dialog Boxes</small>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol xs={6}>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <CButton color="danger" onClick={handleAlert}>Alert</CButton>
                                    <CButton color="primary" onClick={handleConfirm}>Confirm</CButton>
                                    <CButton color="info" onClick={handlePrompt}>Prompt</CButton>
                                </div>
                            </CCol>
                            <CCol xs={6}>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    {output && <p>{output}</p>}
                                </div>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Dialog;
