import React from 'react';
import { CContainer, CRow, CCol, CCard, CCardBody, CImage } from '@coreui/react';

import catImg1 from 'src/assets/images/img/cat_img1.jpg';
import catImg2 from 'src/assets/images/img/cat_img2.jpg';
import catImg3 from 'src/assets/images/img/cat_img3.jpg';
import catImg4 from 'src/assets/images/img/cat_img4.jpg';

const getRandomVisibility = () => Math.random() > 0.5; // 50% chance to show the image

const ImageGallery = () => {
    const images = [
        {
            tag: "catimg1",
            src: catImg1,
            attribution: <small><a href="https://www.freepik.com/free-vector/hand-drawn-cat-cartoon-illustration">Image by freepik</a></small>
        },
        {
            tag: "brokenimg1",
            src: "cat_img.jpg",
            attribution: ""
        },
        {
            tag: "catimg2",
            src: catImg2,
            attribution: <small><a href="https://www.freepik.com/free-vector/hand-drawn-cat-cartoon-illustration">Image by freepik</a></small>
        },
        {
            tag: "catimg3",
            src: catImg3,
            attribution: <small><a href="https://www.freepik.com/free-vector/hand-drawn-cat-cartoon-illustration">Image by freepik</a></small>
        },
        {
            tag: "brokenimg2",
            src: "cat_img.jpg",
            attribution: ""
        },
        {
            tag: "catimg4",
            src: catImg4,
            attribution: <small><a href="https://www.freepik.com/free-vector/hand-drawn-cat-cartoon-illustration">Image by freepik</a></small>
        }
    ];

    return (
        <CContainer>
            <CRow>
                <CCol xs={12}>
                    <CCard id='card1' className='mb-4'>
                        <CCardBody>Some images are visible, some are broken, and some may disappear every refresh</CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow className="image-row">
                {images.slice(0, 3).map((image, index) => (
                    <CCol xs={12} sm={6} md={4} className="image-col" key={index}>
                        {getRandomVisibility() ? (
                            <div id={image.tag}>
                                <CImage rounded src={image.src} width={150} height={150} className="image" />
                                <div>{image.attribution}</div>
                            </div>
                        ) : (
                            <div style={{ width: 150, height: 150 }}></div>
                        )}
                    </CCol>
                ))}
            </CRow>
            <CRow className="image-row">
                {images.slice(3).map((image, index) => (
                    <CCol xs={12} sm={6} md={4} className="image-col" key={index + 3}>
                        {getRandomVisibility() ? (
                            <div id={image.tag}>
                                <CImage rounded src={image.src} width={150} height={150} className="image" />
                                <div>{image.attribution}</div>
                            </div>
                        ) : (
                            <div style={{ width: 150, height: 150 }}></div>
                        )}
                    </CCol>
                ))}
            </CRow>

            <CRow>
                <CCol xs={12}>
                    <CCard id='card2' className='mb-4 mt-5'>
                        <CCardBody>These images below will always be visible</CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow className='mb-5'>
                <CCol id='alwaysVisibleImg1' xs={12} md={6} className="d-flex justify-content-center align-items-center">
                    <CImage rounded src={catImg1} width={200} height={200} />
                </CCol>
                <CCol id='alwaysVisibleImg2' xs={12} md={6} className="d-flex justify-content-center align-items-center">
                    <CImage rounded src={catImg2} width={200} height={200} />
                </CCol>
            </CRow>
        </CContainer>
    );
}

export default ImageGallery;
