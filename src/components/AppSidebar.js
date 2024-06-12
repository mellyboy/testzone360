import React, { useEffect, useRef, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CDropdown,
  CDropdownToggle,
  CDropdownHeader,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CAvatar,
  CBadge,
  useColorModes
} from '@coreui/react'
import {
  cilSettings,
  cilUser,
  cilAccountLogout,
  cilEnvelopeOpen,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'
import avatar from '../assets/images/avatars/duck.png'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  
  const [colorMode, setColorMode] = useState('light');
  const [userData, setUserData] = useState(null);

  const handleProfileClick = () => {
    navigate('/profile');
  }

  const { logout } = useAuth();
  const navigate = useNavigate()

  const headerRef = useRef()

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  const token = localStorage.getItem('token');

  useEffect(() => {
    
    if (token) {
      const decodedToken = jwtDecode(token);
      const userIdFromToken = decodedToken.id;
      fetchUserProfile(userIdFromToken);
  }
    
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const apiURL = import.meta.env.VITE_APP_API_URL;
      const response = await axios.get(`${apiURL}/user/userprofile`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile', error);
    }
  };

  return (
    <CSidebar
      className={`border-end ${colorMode === 'dark' ? 'sidebar-dark' : ''}`}
      colorScheme={colorMode}
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      <div className="d-flex flex-column align-items-start mt-3 px-3">
        <CDropdown variant="dropdown" direction='dropend' className="w-100">
          <CDropdownToggle
            placement="bottom-end"
            className="w-100 d-flex align-items-center py-0 pe-0 custom-dropdown-toggle"
            caret={false}
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            <CAvatar src={avatar} size="md" />
            <div className="ms-3">{userData ? userData.firstName : 'USER'}</div>
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="body-bg-rgb fw-semibold my-2">Account</CDropdownHeader>

            <CDropdownItem as="button" onClick={handleProfileClick}>
              <CIcon icon={cilUser} className="me-2" />
              Profile
            </CDropdownItem>

            <CDropdownItem href="#" disabled>
              <CIcon icon={cilEnvelopeOpen} className="me-2" />
              Messages
              <CBadge color="info" className="ms-2">
                SOON
              </CBadge>
            </CDropdownItem>

            <CDropdownItem href="#">
              <CIcon icon={cilSettings} className="me-2" />
              Settings
            </CDropdownItem>
            <CDropdownDivider />
            <CDropdownItem as="button" onClick={logout}>
              <CIcon icon={cilAccountLogout} className="me-2" />
              Logout
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </div>

      <AppSidebarNav items={navigation} />
      
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
