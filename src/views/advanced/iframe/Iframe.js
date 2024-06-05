import React, { useState } from 'react';
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
        <CRow>
            <CCol xs={6}>
                <CContainer>
                    {/* Place your iframe here */}
                    <iframe
                        title="NestedIframe"
                        src="#/sample1"
                        width="600"
                        height="400"
                    />
                </CContainer>
            </CCol>

            <CCol xs={6}>
                <CContainer>
                    <OuterIframe />
                </CContainer>
            </CCol>
        </CRow>
        
    );
};

export default IFrame;
