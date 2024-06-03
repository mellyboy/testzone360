import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

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
  cilBell,
  cilEnvelopeOpen,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'
import avatar8 from '../assets/images/avatars/cat.png'
// import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const handleProfileClick = () => {
    navigate('/profile');
  }
//   const { logout } = useAuth();
  const navigate = useNavigate()

  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
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
          {/* <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} /> */}
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
            <CAvatar src={avatar8} size="md" />
            <div className="ms-3">USER</div>
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="body-bg-rgb fw-semibold my-2">Account</CDropdownHeader>

            <CDropdownItem as="button" onClick={handleProfileClick}>
              <CIcon icon={cilUser} className="me-2" />
              Profile
            </CDropdownItem>

            <CDropdownItem href="#">
              <CIcon icon={cilBell} className="me-2" />
              Updates
              <CBadge color="info" className="ms-2">
                42
              </CBadge>
            </CDropdownItem>
            <CDropdownItem href="#">
              <CIcon icon={cilEnvelopeOpen} className="me-2" />
              Messages
              <CBadge color="success" className="ms-2">
                42
              </CBadge>
            </CDropdownItem>

            <CDropdownItem href="#">
              <CIcon icon={cilSettings} className="me-2" />
              Settings
            </CDropdownItem>

            <CDropdownDivider />
            <CDropdownHeader className="body-bg-rgb fw-semibold my-2">Theme Settings</CDropdownHeader>
            <CDropdownItem
              active={colorMode === 'light'}
              className="d-flex align-items-center"
              as="button"
              type="button"
              onClick={() => setColorMode('light')}
            >
              <CIcon className="me-2" icon={cilSun} size="lg" /> Light
            </CDropdownItem>
            <CDropdownItem
              active={colorMode === 'dark'}
              className="d-flex align-items-center"
              as="button"
              type="button"
              onClick={() => setColorMode('dark')}
            >
              <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
            </CDropdownItem>

            <CDropdownDivider />
            {/* <CDropdownItem as="button" onClick={logout}>
              <CIcon icon={cilAccountLogout} className="me-2" />
              Logout
            </CDropdownItem> */}
          </CDropdownMenu>
        </CDropdown>
      </div>
      {/* --INSERT END-- */}

      <AppSidebarNav items={navigation} />

      <CSidebarFooter className="border-top d-none d-lg-flex">

      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
