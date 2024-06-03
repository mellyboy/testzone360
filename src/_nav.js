import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilStar,
  cilCircle,
  cilBadge,
  cilGamepad
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Elements & Components',
  },
  {
    component: CNavGroup,
    name: 'Beginner',
    icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Checkbox',
        to: '/checkbox',
      },
      {
        component: CNavItem,
        name: 'Textboxes',
        to: '/textbox',
      },
      {
        component: CNavItem,
        name: 'Text Area',
        to: '/textarea',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Intermediate',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Date Pickers',
        to: '/datepicker',
      },
      {
        component: CNavItem,
        name: 'File Upload',
        to: '/#',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Welcome',
    to: '/welcome',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
]

export default _nav
