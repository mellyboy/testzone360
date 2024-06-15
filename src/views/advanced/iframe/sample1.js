import React from 'react';
import {
    CCol,
    CRow,
    CImage
} from '@coreui/react';

import spongebob from "src/assets/images/img/spongebob.jpg";

const SamplePage1 = () => {
    return (
        <CRow className="justify-content-center">
            <CCol xs={12} md={6} className="text-center">
                <CImage id='sample1Img' rounded thumbnail src={spongebob} width={200} height={200} />
            </CCol>
            <CCol xs={12} md={6} className="text-center mt-4">
                <div>
                    <small><a href="https://imgflip.com/memegenerator">from Imgflip Meme Generator</a></small>
                </div>
            </CCol>
        </CRow>
    );
};

export default SamplePage1;
