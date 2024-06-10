import React from 'react'

const Welcome = React.lazy(() => import('./views/pages/welcome/Welcome'))

//beginner
const Accordion = React.lazy(() => import('./views/beginner/accordion/Accordion'))
const Button = React.lazy(() => import('./views/beginner/button/Button'))
const Checkbox = React.lazy(() => import('./views/beginner/checkbox/Checkbox'))
const Dropdown = React.lazy(() => import('./views/beginner/dropdown/Dropdown'))
const Radio = React.lazy(() => import('./views/beginner/radio/Radio'))
const Textbox = React.lazy(() => import('./views/beginner/textbox/Textbox'))
const Textarea = React.lazy(() => import('./views/beginner/textarea/Textarea'))
const Image = React.lazy(() => import('./views/beginner/image/Image'))

//intermediate
const Autocomplete = React.lazy(() => import('./views/intermediate/autocomplete/Autocomplete'))
const Datepicker = React.lazy(() => import('./views/intermediate/datepicker/Datepicker'))
const FileUpload = React.lazy(() => import('./views/intermediate/file-upload/FileUpload'))
const Hover = React.lazy(() => import('./views/intermediate/hover/Hover'))
const Modal = React.lazy(() => import('./views/intermediate/modals/Modal'))
const Range = React.lazy(() => import('./views/intermediate/range/Range'))
const TooltipsAndPopover = React.lazy(() => import('./views/intermediate/tooltips-and-popover/TooltipsAndPopover'))

//advanced
const Dialog = React.lazy(() => import('./views/advanced/dialog/Dialog'))
const Draggable = React.lazy(() => import('./views/advanced/draggable/Draggable'))
const DynamicTable = React.lazy(() => import('./views/advanced/dynamic-table/DynamicTable'))
const IFrame = React.lazy(() => import('./views/advanced/iframe/Iframe'))
const Toast = React.lazy(() => import('./views/advanced/toast/Toast'))

//practice
const BMI = React.lazy(() => import('./views/practice/bmi/BMI'))
const GlobalFeed = React.lazy(() => import('./views/practice/global-feed/GlobalFeed'))
const ToDo = React.lazy(() => import('./views/practice/to-do/ToDo'))

//others
const UserProfile = React.lazy(() => import('./views/users/profile/Profile'))
const SamplePage1 = React.lazy(() => import('./views/advanced/iframe/sample1'))
const SamplePage2 = React.lazy(() => import('./views/advanced/iframe/sample2'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/welcome', name: 'Welcome', element: Welcome },

  //beginner
  { path: '/accordion', name: 'Accordion', element: Accordion },
  { path: '/button', name: 'Button', element: Button },
  { path: '/checkbox', name: 'Checkbox', element: Checkbox },
  { path: '/dropdown', name: 'Dropdown', element: Dropdown },
  { path: '/image', name: 'Image', element: Image },
  { path: '/radio', name: 'Radio Button', element: Radio },
  { path: '/textbox', name: 'Textbox', element: Textbox },
  { path: '/textarea', name: 'Textarea', element: Textarea },

  //intermediate
  { path: '/autocomplete', name: 'Autocomplete', element: Autocomplete },
  { path: '/datepicker', name: 'Datepicker', element: Datepicker },
  { path: '/file-upload', name: 'File Upload', element: FileUpload },
  { path: '/hover', name: 'Hover', element: Hover },
  { path: '/modal', name: 'Modal', element: Modal },
  { path: '/range', name: 'Range', element: Range },
  { path: '/tooltips-and-popover', name: 'Tooltips And Popover', element: TooltipsAndPopover },

  //advanced
  { path: '/dialog', name: 'Dialog', element: Dialog },
  { path: '/drag-n-drop', name: 'Drag-n-Drop', element: Draggable },
  { path: '/dynamic-table', name: 'Dynamic Table', element: DynamicTable },
  { path: '/iframe', name: 'IFrame', element: IFrame },
  { path: '/toast', name: 'Toast', element: Toast },

  //practice
  { path: '/bmi', name: 'BMI', element: BMI },
  { path: '/global-feed', name: 'Global Feed', element: GlobalFeed },
  { path: '/to-do', name: 'To Do', element: ToDo },

  //others
  { path: '/profile', name: 'Profile', element: UserProfile },
  { path: '/sample1', name: 'Sample Page 1', element: SamplePage1 },
  { path: '/sample2', name: 'Sample Page 2', element: SamplePage2 },
]

export default routes
