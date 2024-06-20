import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
  CFormFeedback
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked } from '@coreui/icons';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateInputs = () => {
    const newErrors = {};
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Email format is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const newErrors = validateInputs();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
    }

    try {
      const apiURL = import.meta.env.VITE_APP_API_URL;
      const response = await fetch(`${apiURL}/user/login`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        login(data.token);
        navigate('/welcome');
      } else {
        setServerError(data.message || 'Login failed');
      }
    } catch (error) {
      setServerError('An error occurred while logging in');
    }
  };

  const handleCreateAcctLink = () => {
    navigate('/register');
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xs={12} sm={10} md={8} lg={6} xl={5}>
            <div className="alert alert-warning text-center mb-4" role="alert">
              This is a demo site. Please do not use personal data. You can use:
              dummy@demo.xyz / password
            </div>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>

                    {serverError && (
                      <CAlert color="danger">
                        {serverError}
                      </CAlert>
                    )}

                    <CInputGroup className="mb-4">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        placeholder="Password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        invalid={!!errors.password}
                      />
                      {errors.password && <CFormFeedback invalid>{errors.password}</CFormFeedback>}
                    </CInputGroup>

                    <CRow className="mb-5">
                      <CCol className="text-center">
                        <CButton id='btnLogin' color="primary" className="px-0 w-100" type="submit">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol className="text-center">
                        Don't have an account?
                        <CButton id='createAccount' color="link" onClick={handleCreateAcctLink}>
                          Create Account
                        </CButton>
                      </CCol>
                    </CRow>

                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
