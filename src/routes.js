import React from 'react'

const Welcome = React.lazy(() => import('./views/pages/welcome/Welcome'))

//beginner
const Textbox = React.lazy(() => import('./views/beginner/textbox/Textbox'))
const Textarea = React.lazy(() => import('./views/beginner/textarea/Textarea'))
const Checkbox = React.lazy(() => import('./views/beginner/checkbox/Checkbox'))

//intermediate
const Datepicker = React.lazy(() => import('./views/intermediate/datepicker/Datepicker'))

//advanced

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/welcome', name: 'Welcome', element: Welcome },
  
  //beginner
  { path: '/textbox', name: 'Textbox', element: Textbox },
  { path: '/datepicker', name: 'Datepicker', element: Datepicker },
  { path: '/textarea', name: 'Textarea', element: Textarea },
  { path: '/checkbox', name: 'Checkbox', element: Checkbox },
]

export default routes
