import React, { useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CFormRange,
    CContainer,
    CTooltip
} from '@coreui/react';

const Range = () => {
    // State variables for the different range inputs
    const [volume, setVolume] = useState(50);
    const [textZoom, setTextZoom] = useState(100);
    const [colorValue, setColorValue] = useState(50);
    const [tooltipValue, setTooltipValue] = useState(50);

    // Event handlers for the different range inputs
    const handleRangeChange = (event) => setVolume(event.target.value);
    const handleTextZoomChange = (event) => setTextZoom(event.target.value);
    const handleColorChange = (event) => setColorValue(event.target.value);
    const handleTooltipChange = (event) => setTooltipValue(event.target.value);

    // Determine the background color based on the colorValue
    const getColor = (value) => {
        const red = Math.min(255, Math.max(0, 255 - (value * 2)));
        const green = Math.min(255, Math.max(0, value * 2));
        return `rgb(${red},${green},0)`;
    };

    return (
        <CRow>
            <CCol xs={6}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Example 1</strong><small>{' '}| Simple Range</small>
                    </CCardHeader>
                    <CCardBody>
                        <CContainer>
                            <div className="row justify-content-md-center mb-4">
                                <CCol md="auto"><span>Volume: {volume}</span></CCol>
                            </div>
                            <CRow className="align-items-center">
                                <CCol xs={12}>
                                    <CFormRange
                                        min={0}
                                        max={100}
                                        id="range"
                                        value={volume}
                                        onChange={handleRangeChange}
                                    />
                                </CCol>
                            </CRow>
                        </CContainer>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={6}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Example 2</strong><small>{' '}| Text Zoom</small>
                    </CCardHeader>
                    <CCardBody>
                        <CContainer>
                            <div className="row justify-content-md-center mb-4">
                                <CCol md="auto">
                                    <span style={{ fontSize: `${textZoom}%` }}>TEXT</span>
                                </CCol>
                            </div>
                            <CRow className="align-items-center">
                                <CCol xs={12}>
                                    <CFormRange
                                        min={0}
                                        max={100}
                                        id="range"
                                        step={25}
                                        value={textZoom}
                                        onChange={handleTextZoomChange}
                                    />
                                </CCol>
                            </CRow>
                        </CContainer>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={6}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Example 3</strong><small>{' '}| Range with Color Indicator</small>
                    </CCardHeader>
                    <CCardBody>
                        <CContainer>
                            <div className="row justify-content-md-center mb-4">
                                <CCol md="auto">
                                <span style={{ color: getColor(colorValue), fontWeight: 'bold' }}>Watch Me Change Color!</span>
                                </CCol>
                            </div>
                            <CRow className="align-items-center">
                                <CCol xs={12}>
                                    <CFormRange
                                        min={0}
                                        max={100}
                                        id="color-range"
                                        value={colorValue}
                                        onChange={handleColorChange}
                                    />
                                </CCol>
                            </CRow>
                        </CContainer>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={6}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Example 4</strong><small>{' '}| Range with Tooltip</small>
                    </CCardHeader>
                    <CCardBody>
                        <CContainer>
                            <div className="row justify-content-md-center mb-4">
                                <CCol md="auto">
                                    <CTooltip content={`Value: ${tooltipValue}`} placement="top">
                                        <span>Hover to see value</span>
                                    </CTooltip>
                                </CCol>
                            </div>
                            <CRow className="align-items-center">
                                <CCol xs={12}>
                                    <CFormRange
                                        min={0}
                                        max={100}
                                        id="tooltip-range"
                                        value={tooltipValue}
                                        onChange={handleTooltipChange}
                                    />
                                </CCol>
                            </CRow>
                        </CContainer>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Range;
