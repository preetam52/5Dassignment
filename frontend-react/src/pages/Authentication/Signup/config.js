import {PermIdentity, EmailOutlined} from '@mui/icons-material'

export const formFields = [
    {label: 'First Name', key: 'firstName', type: 'text', icon: <PermIdentity fontSize='medium'/>},
    {label: 'Last Name', key: 'lastName', type: 'text', icon: <PermIdentity/>},
    {label: 'Mobile No.', key: 'mobile', type: 'number', icon: <PermIdentity/>},
    {label: 'Email-ID', key: 'email', type: 'email', icon: <EmailOutlined/>},
    {label: 'City', key: 'city', type: 'text'},
    {label: 'Enter Password', key: 'password', type: 'password', icon: <PermIdentity/>},

]