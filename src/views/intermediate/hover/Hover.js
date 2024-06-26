import React, { useState } from 'react';
import { CContainer, CRow, CCol, CCard, CCardBody, CImage } from '@coreui/react';

import catImg1 from "src/assets/images/img/cat_img1.jpg";
import catImg2 from "src/assets/images/img/cat_img2.jpg";
import catImg3 from "src/assets/images/img/cat_img3.jpg";

const Hover = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [clickedIndex, setClickedIndex] = useState(null);

    const images = [
        { src: catImg1, name: "Mingming" },
        { src: catImg2, name: "Bruno" },
        { src: catImg3, name: "Nana" }
    ];

    return (
        <CContainer id='imageContainer'>
            <CRow>
                <CCol xs={12}>
                    <CCard className='mb-4'>
                        <CCardBody>Show other elements while hovering over the cat image</CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow className="image-row">
                {images.map((image, index) => (
                    <CCol xs={12} sm={6} md={4} className="image-col mb-3" key={index}>
                        <div
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{ position: 'relative', display: 'inline-block', width: '100%' }}
                        >
                            <CImage id={image.name} align="start" rounded src={image.src} width="100%" height="auto" />
                            {hoveredIndex === index && (
                                <div id={image.name+'HoverImage'}
                                    style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        left: '10px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        color: 'white',
                                        padding: '5px',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <a 
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setClickedIndex(index);
                                        }}
                                    >
                                        Show Name
                                    </a>
                                </div>
                            )}
                        </div>
                    </CCol>
                ))}
            </CRow>
            <CRow className="image-row">
                {images.map((image, index) => (
                    <CCol xs={12} sm={6} md={4} key={index}>
                        {clickedIndex === index && (
                            <div id={'display'+image.name} style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>
                                {image.name}
                            </div>
                        )}
                    </CCol>
                ))}
            </CRow>
        </CContainer>
    );
}

export default Hover;
