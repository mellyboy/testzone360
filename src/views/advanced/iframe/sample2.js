import React from 'react';
import {
    CCol,
    CRow,
    CImage
} from '@coreui/react';

import spongebob2 from "src/assets/images/img/spongebob2.jpg";

const SamplePage2 = () => {
    return (
        <CRow className="justify-content-center">
            <CCol xs={12} md={6} className="text-center">
                <CImage id='sample2Image' rounded thumbnail src={spongebob2} width={200} height={200} />
            </CCol>
            <CCol xs={12} md={6} className="text-center mt-4">
                <div>
                    <small><a href="https://imgflip.com/memegenerator">from Imgflip Meme Generator</a></small>
                </div>
            </CCol>
        </CRow>
    );
};

export default SamplePage2;
