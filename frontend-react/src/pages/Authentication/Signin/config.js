import {PermIdentity, EmailOutlined} from '@mui/icons-material'

export const formFields = [
    {label: 'Email-ID', key: 'email', type: 'email', required: true, icon: <EmailOutlined/>},
    {label: 'Enter Password', key: 'password', type: 'password', required: true, icon: <PermIdentity/>},

]