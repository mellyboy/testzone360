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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        body: JSON.stringify({ 
          email, 
          password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        login(data.token);
        navigate('/dashboard');
      } else {
        // Login failed, display error message
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>

                    <CRow className="mb-3">
                      <CCol className="text-center">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>

                    <CRow className="mb-5">
                      <CCol className="text-center">
                        <CButton color="primary" className="px-0 w-100" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol className="text-center">
                          Don't have an account? Create Account
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