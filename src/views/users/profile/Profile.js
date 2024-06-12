import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Icon from '@mdi/react';
import { mdiRefresh } from '@mdi/js';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CRow,
    CAlert,
    CFormFeedback
} from '@coreui/react';

const UserProfile = () => {
    const [formDisabled, setFormDisabled] = useState(true);
    const [countries, setCountries] = useState([]);
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        addressLine2: '',
        city: '',
        region: '',
        zipCode: '',
        country: '',
        gender: '',
        accountNumber: '',
        email: '',
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [errors, setErrors] = useState({});
    const apiURL = import.meta.env.VITE_APP_API_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            fetchUserProfile(userId, token);
        }

        fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code")
            .then((response) => response.json())
            .then((data) => {
                setCountries(data.countries);
            });
    }, []);

    const fetchUserProfile = async (userId, token) => {
        try {
            const response = await fetch(`${apiURL}/user/userprofile?id=${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setProfileData(data);
            } else {
                setMessageType('danger');
                setMessage('Failed to fetch user profile.');
            }
        } catch (error) {
            setMessageType('danger');
            setMessage('An error occurred while fetching the profile.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const strictEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        // Validation logic
        if (profileData.firstName.length > 50) {
            newErrors.firstName = 'First Name must be 50 characters or less';
        }
        if (profileData.lastName.length > 50) {
            newErrors.lastName = 'Last Name must be 50 characters or less';
        }
        if (profileData.address.length > 100) {
            newErrors.address = 'Address must be 100 characters or less';
        }
        if (profileData.addressLine2.length > 100) {
            newErrors.addressLine2 = 'Address Line 2 must be 100 characters or less';
        }
        if (profileData.city.length > 100) {
            newErrors.city = 'City must be 100 characters or less';
        }
        if (profileData.region.length > 100) {
            newErrors.region = 'Region must be 100 characters or less';
        }
        if (profileData.zipCode.length > 10) {
            newErrors.zipCode = 'Zip Code must be 10 characters or less';
        }
        if (profileData.accountNumber.length > 20) {
            newErrors.accountNumber = 'Account Number must be 20 characters or less';
        }
        if (profileData.email.length > 254) {
            newErrors.email = 'Email must be 254 characters or less';
        } else if (!strictEmailRegex.test(profileData.email)) {
            newErrors.email = 'Email format is invalid';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        } else {
            setErrors({});
        }

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${apiURL}/user/userprofile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profileData)
            });

            const data = await response.json();
            if (response.ok) {
                setMessageType('success');
                setMessage('Profile updated successfully!');
                setFormDisabled(true);

                setTimeout(() => {
                    window.location.reload();
                }, 1300);

            } else {
                setMessageType('danger');
                setMessage(data.message || 'An error occurred while updating the profile.');
            }
        } catch (error) {
            setMessageType('danger');
            setMessage('An error occurred while updating the profile.');
        }
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Profile Information</strong>
                        <CButton color="link" onClick={() => setFormDisabled(false)}>
                            <Icon path={mdiRefresh} size={1} />
                            Update Profile
                        </CButton>
                    </CCardHeader>
                    <CCardBody>
                        {message && (
                            <CAlert color={messageType}>
                                {message}
                            </CAlert>
                        )}
                        <fieldset disabled={formDisabled}>
                            <CForm className="row g-3" onSubmit={handleSubmit}>
                                <CCol md={6}>
                                    <CFormLabel>First Name</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="profileFirstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={profileData.firstName || ''}
                                        onChange={handleChange}
                                        invalid={!!errors.firstName}
                                    />
                                    {errors.firstName && <CFormFeedback invalid>{errors.firstName}</CFormFeedback>}
                                </CCol>

                                <CCol md={6}>
                                    <CFormLabel>Last Name</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="profileLastName"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={profileData.lastName || ''}
                                        onChange={handleChange}
                                        invalid={!!errors.lastName}
                                    />
                                    {errors.lastName && <CFormFeedback invalid>{errors.lastName}</CFormFeedback>}
                                </CCol>

                                <CCol xs={12}>
                                    <CFormLabel>Address</CFormLabel>
                                    <CFormInput
                                        id="address"
                                        name="address"
                                        placeholder="Street Address Line 1"
                                        value={profileData.address || ''}
                                        onChange={handleChange}
                                        invalid={!!errors.address}
                                    />
                                    {errors.address && <CFormFeedback invalid>{errors.address}</CFormFeedback>}
                                </CCol>

                                <CCol xs={12}>
                                    <CFormInput
                                        id="addressLine2"
                                        name="addressLine2"
                                        placeholder="Street Address Line 2"
                                        value={profileData.addressLine2 || ''}
                                        onChange={handleChange}
                                        invalid={!!errors.addressLine2}
                                    />
                                    {errors.addressLine2 && <CFormFeedback invalid>{errors.addressLine2}</CFormFeedback>}
                                </CCol>

                                <CCol xs={6}>
                                    <CFormInput
                                        id="city"
                                        name="city"
                                        placeholder="City"
                                        value={profileData.city || ''}
                                        onChange={handleChange}
                                        invalid={!!errors.city}
                                    />
                                    {errors.city && <CFormFeedback invalid>{errors.city}</CFormFeedback>}
                                </CCol>

                                <CCol xs={6}>
                                    <CFormInput
                                        id="region"
                                        name="region"
                                        placeholder="Region"
                                        value={profileData.region || ''}
                                        onChange={handleChange}
                                        invalid={!!errors.region}
                                    />
                                    {errors.region && <CFormFeedback invalid>{errors.region}</CFormFeedback>}
                                </CCol>
                                <CCol xs={6}>
                                    <CFormInput
                                        id="zipCode"
                                        name="zipCode"
                                        placeholder="Zip Code"
                                        value={profileData.zipCode || ''}
                                        onChange={handleChange}
                                        invalid={!!errors.zipCode}
                                    />
                                    {errors.zipCode && <CFormFeedback invalid>{errors.zipCode}</CFormFeedback>}
                                </CCol>

                                <CCol xs={6}>
                                    <CFormSelect
                                        id="country"
                                        name="country"
                                        options={countries}
                                        value={profileData.country || ''}
                                        onChange={handleChange}
                                    />
                                </CCol>

                                <CCol xs={12}>
                                    <CFormLabel>Gender</CFormLabel>
                                    <CFormCheck
                                        type="radio"
                                        name="gender"
                                        id="genderOpt1"
                                        label="Male"
                                        value="Male"
                                        checked={profileData.gender === 'Male'}
                                        onChange={handleChange}
                                    />
                                    <CFormCheck
                                        type="radio"
                                        name="gender"
                                        id="genderOpt2"
                                        label="Female"
                                        value="Female"
                                        checked={profileData.gender === 'Female'}
                                        onChange={handleChange}
                                    />
                                    <CFormCheck
                                        type="radio"
                                        name="gender"
                                        id="genderOpt3"
                                        label="Prefer not to say"
                                        value="Prefer not to say"
                                        checked={profileData.gender === 'Prefer not to say'}
                                        onChange={handleChange}
                                    />
                                </CCol>

                                <CCol xs={12}>
                                    <CFormLabel>Email</CFormLabel>
                                    <CFormInput
                                        type="email"
                                        id="inputEmail"
                                        name="email"
                                        placeholder="Email Address"
                                        value={profileData.email || ''}
                                        onChange={handleChange}
                                        invalid={!!errors.email}
                                    />
                                    {errors.email && <CFormFeedback invalid>{errors.email}</CFormFeedback>}
                                </CCol>

                                <CCol xs={12}>
                                    <CFormLabel>Account Number</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="accountNumber"
                                        name="accountNumber"
                                        placeholder="Account Number"
                                        value={profileData.accountNumber || ''}
                                        onChange={handleChange}
                                        invalid={!!errors.accountNumber}
                                    />
                                    {errors.accountNumber && <CFormFeedback invalid>{errors.accountNumber}</CFormFeedback>}
                                </CCol>

                                <CCol xs={12}>
                                    <CButton color="primary" type="submit">
                                        Save
                                    </CButton>
                                </CCol>
                            </CForm>
                        </fieldset>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default UserProfile;
