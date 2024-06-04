import React from 'react'

const Welcome = React.lazy(() => import('./views/pages/welcome/Welcome'))

//beginner
const Button = React.lazy(() => import('./views/beginner/button/Button'))
const Checkbox = React.lazy(() => import('./views/beginner/checkbox/Checkbox'))
const Dropdown = React.lazy(() => import('./views/beginner/dropdown/Dropdown'))
const Radio = React.lazy(() => import('./views/beginner/radio/Radio'))
const Textbox = React.lazy(() => import('./views/beginner/textbox/Textbox'))
const Textarea = React.lazy(() => import('./views/beginner/textarea/Textarea'))

//intermediate
const Datepicker = React.lazy(() => import('./views/intermediate/datepicker/Datepicker'))
const Modal = React.lazy(() => import('./views/intermediate/modals/Modal'))

//advanced

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/welcome', name: 'Welcome', element: Welcome },
  
  //beginner
  { path: '/button', name: 'Button', element: Button },
  { path: '/checkbox', name: 'Checkbox', element: Checkbox },
  { path: '/dropdown', name: 'Dropdown', element: Dropdown },
  { path: '/radio', name: 'Radio Button', element: Radio },
  { path: '/textbox', name: 'Textbox', element: Textbox },
  { path: '/textarea', name: 'Textarea', element: Textarea },

  //intermediate
  { path: '/datepicker', name: 'Datepicker', element: Datepicker },
  { path: '/modal', name: 'Modal', element: Modal },
]

export default routes
