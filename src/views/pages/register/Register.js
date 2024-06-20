import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
  CFormFeedback
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHome, cilLockLocked, cilUser } from '@coreui/icons'

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    password: '',
  });

  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginLink = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strictEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Validation logic
    if (formData.firstName.length > 50) {
      newErrors.firstName = 'First Name must be 50 characters or less';
    }
    if (formData.lastName.length > 50) {
      newErrors.lastName = 'Last Name must be 50 characters or less';
    }
    if (formData.address.length > 100) {
      newErrors.address = 'Address must be 100 characters or less';
    }
    if (formData.email.length > 254) {
      newErrors.email = 'Email must be 254 characters or less';
    } else if (!strictEmailRegex.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (formData.password.length > 100) {
      newErrors.password = 'Password must be 100 characters or less';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
    }

    try {
      const apiURL = import.meta.env.VITE_APP_API_URL;
      const response = await axios.post(`${apiURL}/user/register`, formData);
      setShowToast(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Error registering user:', error.response.data);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xs={12} sm={10} md={8} lg={6} xl={5}>
            <div className="alert alert-warning text-center mb-4" role="alert">
              This is a demo site. Please do not use personal data.
            </div>
            <CCard className="p-4">
              <CCardBody>
                <CForm
                  onSubmit={handleSubmit}
                >
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      invalid={!!errors.firstName}
                    />
                    {errors.firstName && <CFormFeedback invalid>{errors.firstName}</CFormFeedback>}
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      invalid={!!errors.lastName}
                    />
                    {errors.lastName && <CFormFeedback invalid>{errors.lastName}</CFormFeedback>}
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilHome} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="address"
                      placeholder="Address"
                      autoComplete="address-line1"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      invalid={!!errors.address}
                    />
                    {errors.address && <CFormFeedback invalid>{errors.address}</CFormFeedback>}
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="email"
                      name="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      invalid={!!errors.email}
                    />
                    {errors.email && <CFormFeedback invalid>{errors.email}</CFormFeedback>}
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      invalid={!!errors.password}
                    />
                    {errors.password && <CFormFeedback invalid>{errors.password}</CFormFeedback>}
                  </CInputGroup>

                  <div className="d-grid mb-5">
                    <CButton id='btnCreateAccount' type="submit" color="primary">
                      Create Account
                    </CButton>
                  </div>

                  <CRow>
                    <CCol className="text-center">Already have an account?
                      <CButton id='navigateLogin' color='link' onClick={handleLoginLink}>
                        Login Account
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>

      <CToaster className="p-3" placement="top-end">
        <CToast id='toastMessage' autohide={false} visible={showToast} className="align-items-center">
          <div className="d-flex">
            <CToastBody id='toastBody'>Registration Successful. You will be redirected to the Login Form in 2 seconds</CToastBody>
            <CToastClose onClick={() => setShowToast(false)} className="me-2 m-auto" />
          </div>
        </CToast>
      </CToaster>
    </div>
  );
};

export default Register;
