import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilStar,
  cilCircle,
  cilBadge,
  cilGamepad,
  cilApplications,
  cilVideogame,
  cilWeightlifitng
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
        name: 'Accordion',
        to: '/accordion',
      },
      {
        component: CNavItem,
        name: 'Button',
        to: '/button',
      },
      {
        component: CNavItem,
        name: 'Checkbox',
        to: '/checkbox',
      },
      {
        component: CNavItem,
        name: 'Dropdown',
        to: '/dropdown',
      },
      {
        component: CNavItem,
        name: 'Image',
        to: '/image',
      },
      {
        component: CNavItem,
        name: 'Radio Button',
        to: '/radio',
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
        name: 'Autocomplete',
        to: '/autocomplete',
      },
      {
        component: CNavItem,
        name: 'Date Pickers',
        to: '/datepicker',
      },
      {
        component: CNavItem,
        name: 'Hover',
        to: '/hover',
      },
      {
        component: CNavItem,
        name: 'File Upload',
        to: '/file-upload',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/modal',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/range',
      },
      {
        component: CNavItem,
        name: 'Tooltips and Popover',
        to: '/tooltips-and-popover',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Advanced',
    icon: <CIcon icon={cilBadge} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Dialogs',
        to: '/dialog',
      },
      {
        component: CNavItem,
        name: 'Drag-n-Drop',
        to: '/drag-n-drop',
      },
      {
        component: CNavItem,
        name: 'Dynamic Table',
        to: '/dynamic-table',
      },
      {
        component: CNavItem,
        name: 'IFrame',
        to: '/iframe',
      },
      {
        component: CNavItem,
        name: 'Toast',
        to: '/toast',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Practice Here',
  },
  {
    component: CNavGroup,
    name: 'Exercises',
    icon: <CIcon icon={cilWeightlifitng} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'BMI Calculator',
        to: '/bmi',
      },
      {
        component: CNavItem,
        name: 'Global Feed',
        to: '/global-feed',
      },
      {
        component: CNavItem,
        name: 'To Do',
        to: '/to-do',
      },
      {
        component: CNavItem,
        name: 'Update Profile',
        to: '/profile',
      },
      {
        component: CNavItem,
        name: 'Dasboard',
        to: '/#',
        badge: {
          color: 'info',
          text: 'SOON',
        },
        disabled: true
      },
      {
        component: CNavItem,
        name: 'Send Message',
        to: '/#',
        badge: {
          color: 'info',
          text: 'SOON',
        },
        disabled: true
      },
      {
        component: CNavItem,
        name: 'Money Transfer',
        to: '/#',
        badge: {
          color: 'info',
          text: 'SOON',
          size: 'sm'
        },
        disabled: true
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Welcome',
  //   to: '/welcome',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
]

export default _nav
