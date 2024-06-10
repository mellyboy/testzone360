import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderToggler,
  CFormSwitch,
  useColorModes
} from '@coreui/react'
import { AppBreadcrumb } from './index'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'
import Icon from '@mdi/react'
import { mdiWhiteBalanceSunny, mdiMoonWaxingCrescent } from '@mdi/js'

const AppHeader = () => {
  const headerRef = useRef()

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const handleToggle = () => {
    setColorMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="px-4 d-flex align-items-center justify-content-between" fluid>
        <div className="d-flex align-items-center">
          <CHeaderToggler
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
            style={{ marginInlineStart: '-14px' }}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <AppBreadcrumb />
        </div>

        <div className="d-flex align-items-center">
          <Icon
            path={mdiWhiteBalanceSunny}
            size={1}
            style={{ color: colorMode === 'light' ? '#FFA500' : '#4f5d73' }}
            className="me-2"
          />
          <CFormSwitch
            className={`mx-1 ${colorMode === 'light' ? 'switch-light' : 'switch-dark'}`}
            color="primary"
            size="xl"
            checked={colorMode === 'dark'}
            onChange={handleToggle}
          />
          <Icon
            path={mdiMoonWaxingCrescent}
            size={1}
            style={{ color: colorMode === 'light' ? '#d8dbe0' : '#ffc107' }}
            // className="ms-1"
          />
        </div>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
