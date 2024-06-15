import React, { useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CRow,
    CImage,
    CFormRange,
    CFormSelect,
    CAlert
} from '@coreui/react';

import maleImg from "src/assets/images/img/male.png";
import femaleImg from "src/assets/images/img/female.png";

const BMI = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [weight, setWeight] = useState(50);
    const [height, setHeight] = useState(150);
    const [ageGroup, setAgeGroup] = useState('');
    const [bmiResult, setBmiResult] = useState(null);
    const [bmiCategory, setBmiCategory] = useState('');
    const [error, setError] = useState('');

    const handleWeightChange = (event) => setWeight(event.target.value);
    const handleHeightChange = (event) => setHeight(event.target.value);
    const handleImageClick = (image) => setSelectedImage(image);
    const handleAgeGroupChange = (event) => {
        setAgeGroup(event.target.value);
        setSelectedImage(null);
    };

    const validateInputs = () => {
        if (ageGroup === '') {
            setError('Please select an age group.');
            return false;
        }
        if (weight <= 0) {
            setError('Weight must be greater than 0.');
            return false;
        }
        if (height <= 0) {
            setError('Height must be greater than 0.');
            return false;
        }
        if (ageGroup === '1' && selectedImage === null) {
            setError('Please select a gender.');
            return false;
        }
        setError('');
        return true;
    };

    const calculateBMI = () => {
        if (!validateInputs()) {
            return;
        }
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        setBmiResult(bmi);
        interpretBMI(bmi);
    };

    const interpretBMI = (bmi) => {
        let category = '';
        if (ageGroup === '1') {
            // For children (2-19 years)
            if (selectedImage === 1) {
                // Male
                if (bmi < 14.5) {
                    category = 'Underweight';
                } else if (bmi >= 14.5 && bmi < 22) {
                    category = 'Healthy weight';
                } else if (bmi >= 22 && bmi < 25) {
                    category = 'Overweight';
                } else {
                    category = 'Obese';
                }
            } else if (selectedImage === 2) {
                // Female
                if (bmi < 14) {
                    category = 'Underweight';
                } else if (bmi >= 14 && bmi < 21.5) {
                    category = 'Healthy weight';
                } else if (bmi >= 21.5 && bmi < 24.5) {
                    category = 'Overweight';
                } else {
                    category = 'Obese';
                }
            }
        } else if (ageGroup === '2') {
            // For adults (20+ years)
            if (bmi < 18.5) {
                category = 'Underweight';
            } else if (bmi >= 18.5 && bmi < 25) {
                category = 'Normal weight';
            } else if (bmi >= 25 && bmi < 40) {
                category = 'Overweight';
            } else {
                category = 'Obese';
            }
        }
        setBmiCategory(category);
    };

    return (
        <CContainer>
            <CRow className="justify-content-center">
                <CCol xs={12} md={6}>
                    <CCard id='bmi'>
                        <CCardHeader>
                            <strong>BMI Calculator</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CFormSelect
                                id='ageGroupSelector'
                                aria-label="Select Age Group"
                                value={ageGroup}
                                onChange={handleAgeGroupChange}
                            >
                                <option value="">Select Age Group</option>
                                <option value="1">Age 2-19</option>
                                <option value="2">Age 20+</option>
                            </CFormSelect>
                            {ageGroup && (
                                <CRow className="mt-3 justify-content-center align-items-center">
                                    <CCol xs={6} className="text-center">
                                        <CButton onClick={() => handleImageClick(1)}>
                                            <CImage
                                                id='maleImg'
                                                rounded
                                                thumbnail
                                                src={maleImg}
                                                width={200}
                                                height={200}
                                                style={{ border: selectedImage === 1 ? '2px solid blue' : 'none' }}
                                            />
                                        </CButton>
                                        <div className="mt-2">Male</div>
                                    </CCol>
                                    <CCol xs={6} className="text-center">
                                        <CButton onClick={() => handleImageClick(2)}>
                                            <CImage
                                            id='femaleImg'
                                                rounded
                                                thumbnail
                                                src={femaleImg}
                                                width={200}
                                                height={200}
                                                style={{ border: selectedImage === 2 ? '2px solid blue' : 'none' }}
                                            />
                                        </CButton>
                                        <div className="mt-2">Female</div>
                                    </CCol>
                                </CRow>
                            )}
                            <CRow className="mt-4">
                                <CCol xs={12}>
                                    <div id='displayWeight' className="text-center mb-2">
                                        <span>Weight: {weight} kg</span>
                                    </div>
                                    <CFormRange
                                        min={0}
                                        max={300}
                                        id="weight"
                                        value={weight}
                                        onChange={handleWeightChange}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mt-4">
                                <CCol xs={12}>
                                    <div id='displayHeight' className="text-center mb-2">
                                        <span>Height: {height} cm</span>
                                    </div>
                                    <CFormRange
                                        min={0}
                                        max={250}
                                        id="height"
                                        value={height}
                                        onChange={handleHeightChange}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mt-4">
                                <CCol xs={12}>
                                    <div className="d-grid gap-2">
                                        <CButton id='calculateBtn' color="primary" onClick={calculateBMI}>Calculate BMI</CButton>
                                    </div>
                                </CCol>
                            </CRow>
                            {error && (
                                <CRow className="mt-4">
                                    <CCol xs={12}>
                                        <CAlert color="danger">{error}</CAlert>
                                    </CCol>
                                </CRow>
                            )}
                            {bmiResult && (
                                <CRow className="mt-4">
                                    <CCol xs={12}>
                                        <div className="text-center">
                                            <h4 id='computedBMI'>BMI: {bmiResult}</h4>
                                            <h5 id='category'>Category: {bmiCategory}</h5>
                                        </div>
                                    </CCol>
                                </CRow>
                            )}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default BMI;
