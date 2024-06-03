import React from 'react'

const Welcome = React.lazy(() => import('./views/pages/welcome/Welcome'))

//beginner
const Button = React.lazy(() => import('./views/beginner/button/Button'))
const Checkbox = React.lazy(() => import('./views/beginner/checkbox/Checkbox'))
const Textbox = React.lazy(() => import('./views/beginner/textbox/Textbox'))
const Textarea = React.lazy(() => import('./views/beginner/textarea/Textarea'))

//intermediate
const Datepicker = React.lazy(() => import('./views/intermediate/datepicker/Datepicker'))

//advanced

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/welcome', name: 'Welcome', element: Welcome },
  
  //beginner
  { path: '/button', name: 'Button', element: Button },
  { path: '/checkbox', name: 'Checkbox', element: Checkbox },
  { path: '/textbox', name: 'Textbox', element: Textbox },
  { path: '/textarea', name: 'Textarea', element: Textarea },

  { path: '/datepicker', name: 'Datepicker', element: Datepicker },
]

export default routes
