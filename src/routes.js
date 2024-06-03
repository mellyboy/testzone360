import React from 'react'

const Welcome = React.lazy(() => import('./views/pages/welcome/Welcome'))

//beginner
const Textbox = React.lazy(() => import('./views/beginner/textbox/Textbox'))

//intermediate
const Datepicker = React.lazy(() => import('./views/intermediate/datepicker/Datepicker'))

//advanced

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/welcome', name: 'Welcome', element: Welcome },
  
  //paths
  { path: '/textbox', name: 'Textbox', element: Textbox },
  { path: '/datepicker', name: 'Datepicker', element: Datepicker },
]

export default routes
