import React from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react';

const Welcome = () => {

    return (
        <CRow>

            <CCol xs={6}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Welcome</strong>
                    </CCardHeader>
                    <CCardBody>
                        Welcome!
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Welcome