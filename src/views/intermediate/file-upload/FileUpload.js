import React, { useState } from 'react';
import Icon from '@mdi/react';
import {
    mdiFileUpload,
    mdiAlertOutline,
    mdiInformationVariantCircleOutline
} from '@mdi/js';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CContainer,
    CButton,
    CFormInput,
    CAlert
} from '@coreui/react';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 0.5 * 1024 * 1024;

        if (!file) {
            setSelectedFile(null);
            setUploadStatus('');
            setErrorMessage('');
            setImagePreview('');
            return;
        }

        if (!allowedTypes.includes(file.type)) {
            setSelectedFile(null);
            setUploadStatus('');
            setErrorMessage('Only image files (JPEG, PNG, GIF) are allowed.');
            setImagePreview('');
            return;
        }

        if (file.size > maxSize) {
            setSelectedFile(null);
            setUploadStatus('');
            setErrorMessage('File size exceeds the limit of 500 KB.');
            setImagePreview('');
            return;
        }

        setSelectedFile(file);
        setUploadStatus('');
        setErrorMessage('');

        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleFileUpload = () => {
        if (!selectedFile) {
            alert('Please select a file first.');
            return;
        }

        //simulation of file upload process
        setUploadStatus('Uploading...');
        setTimeout(() => {
            const isSuccess = Math.random() > 0.2; //80% success rate
            if (isSuccess) {
                setUploadStatus('File uploaded successfully!');
            } else {
                setUploadStatus('File upload failed.');
            }
        }, 2000); //delay of 2 seconds
    };

    return (
        <CRow className="justify-content-center">
            <CCol lg={6} md={6} sm={12}>
                <div className="alert alert-info text-center mb-2" role="alert">
                <Icon path={mdiInformationVariantCircleOutline} size={1} />{' '}
                    <small>Simulation of file upload scenario only.</small>
                </div>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Example</strong><small>{' '}| File Upload</small>
                    </CCardHeader>
                    <CCardBody>
                        <CContainer>
                            {errorMessage && (
                                <CAlert color="danger">
                                    <Icon path={mdiAlertOutline} size={1} />
                                    {' '}{errorMessage}
                                </CAlert>
                            )}
                            {imagePreview && (
                                <CContainer sm className='mt-2 mb-3'>
                                    <h6>Image Preview:</h6>
                                    <img id='imagePreview' src={imagePreview} alt="Image Preview" style={{ maxWidth: '100%' }} />
                                </CContainer>
                            )}
                            <div className="d-grid gap-2">
                                <CFormInput
                                    type="file"
                                    id="formFile"
                                    onChange={handleFileChange}
                                    text="JPEG, PNG, GIF only. Max 500 KB."
                                />
                                <CButton
                                    id="btnUploadFile"
                                    size='sm'
                                    color="primary"
                                    onClick={handleFileUpload}
                                    disabled={!selectedFile || errorMessage !== ''}
                                >
                                    <Icon path={mdiFileUpload} size={1} />
                                    {' '}Upload File
                                </CButton>
                                {uploadStatus && (
                                    <div className="mt-3">
                                        <h6>{uploadStatus}</h6>
                                    </div>
                                )}
                            </div>
                        </CContainer>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default FileUpload;
