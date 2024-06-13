import React from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CRow,
} from '@coreui/react';
import OuterIframe from './OuterFrame';

const IFrame = () => {
    return (
        <CContainer>
            <CRow>
                <CCol xs={12} md={6} className="mb-4">
                    <CContainer>
                        {/* Place your iframe here */}
                        <iframe
                            title="NestedIframe"
                            src="#/sample1"
                            style={{ width: '100%', height: '400px', border: 'none' }}
                        />
                    </CContainer>
                </CCol>

                <CCol xs={12} md={6} className="mb-4">
                    <CContainer>
                        <OuterIframe />
                    </CContainer>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default IFrame;
