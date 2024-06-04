import React from 'react';
import { CContainer, CRow, CCol, CCard, CCardBody, CImage } from '@coreui/react';

const getRandomVisibility = () => Math.random() > 0.5; // 50% chance to show the image

const ImageGallery = () => {
    const images = [
        {
            src: "src/views/beginner/image/img/cat_img1.jpg",
            attribution: <small><a href="https://www.freepik.com/free-vector/hand-drawn-cat-cartoon-illustration">Image by freepik</a></small>
        },
        {
            src: "cat_img.jpg",
            attribution: ""

        },
        {
            src: "src/views/beginner/image/img/cat_img2.jpg",
            attribution: <small><a href="https://www.freepik.com/free-vector/hand-drawn-cat-cartoon-illustration">Image by freepik</a></small>
        },
        {
            src: "src/views/beginner/image/img/cat_img3.jpg",
            attribution: <small><a href="https://www.freepik.com/free-vector/hand-drawn-cat-cartoon-illustration">Image by freepik</a></small>
        },
        {
            src: "cat_img.jpg",
            attribution: ""
        },
        {
            src: "src/views/beginner/image/img/cat_img4.jpg",
            attribution: <small><a href="https://www.freepik.com/free-vector/hand-drawn-cat-cartoon-illustration">Image by freepik</a></small>
        }
    ];

    return (
        <CContainer>
            <CRow>
                <CCol xs={12}>
                    <CCard className='mb-4'>
                        <CCardBody>Some images are visible, some are broken, and some may disappear every refresh</CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow className="image-row">
                {images.slice(0, 3).map((image, index) => (
                    <CCol xs={4} className="image-col" key={index}>
                        {getRandomVisibility() ? (
                            <div>
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
                    <CCol xs={4} className="image-col" key={index + 3}>
                        {getRandomVisibility() ? (
                            <div>
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
                    <CCard className='mb-4 mt-5'>
                        <CCardBody>These images below will always be visible</CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow className='mb-5'>
                <div className="clearfix">
                    <CImage align="start" rounded src="src/views/beginner/image/img/cat_img1.jpg" width={200} height={200} />
                    <CImage align="end" rounded src="src/views/beginner/image/img/cat_img2.jpg" width={200} height={200} />
                </div>
            </CRow>
        </CContainer>
    );
}

export default ImageGallery;
