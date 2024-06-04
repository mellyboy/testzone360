import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiFileUpload, mdiAlertOutline } from '@mdi/js';
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
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add more allowed types if needed
        const maxSize = 10 * 1024 * 1024; // 10MB (in bytes)

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
            setErrorMessage('File size exceeds the limit of 10MB.');
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

        const formData = new FormData();
        formData.append('file', selectedFile);

        fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setUploadStatus('File uploaded successfully!');
                } else {
                    setUploadStatus('File upload failed.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setUploadStatus('Error uploading file.');
            });
    };

    return (
        <CRow>
            <CCol xs={6}>
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
                                    text="JPEG, PNG, GIF only. Max 10MB."
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
