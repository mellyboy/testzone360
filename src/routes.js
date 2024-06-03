import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//beginner
const Textboxes = React.lazy(() => import('./views/easy/textbox/Textbox'))

//intermediate
const Datepickers = React.lazy(() => import('./views/advanced/datepicker/Datepicker'))

//advanced

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  
  //paths
  { path: '/textbox', name: 'Textboxes', element: Textboxes },
  { path: '/datepicker', name: 'Date Picker', element: Datepickers },
]

export default routes
