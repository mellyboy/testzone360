import React from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormTextarea,
    CRow,
} from '@coreui/react';
import { IMaskMixin } from 'react-imask'

const TextArea = () => {
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Text Area</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CFormTextarea
                            placeholder="Leave a comment here"
                            id="exampleTextArea"
                            style={{ height: '100px' }}
                            text="Must be 15 - 1500 characters."
                        ></CFormTextarea>
                    </CCardBody>
                </CCard>
            </CCol>

        </CRow>
    );
};

export default TextArea