import React from 'react'
import "../styles.css"
import { Button, Box, Grid, Container, TextField, InputLabel, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { formFields } from './config'
import { signin } from '../../../services/user.service'
import Swal from 'sweetalert2'


export default function Signin(props) {

    const schema = {};
    formFields.forEach((item) => {
        schema[item.key] = ''
    })

    const [credentials, setCredentials] = React.useState({
        ...schema
    });
    const signinClicked = async (event) => {
        event.preventDefault();
        try {
            const response = await signin(credentials)
            Swal.fire({
                icon: 'success',
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500
            })
            sessionStorage.setItem('userId', response.data.userId)
            props.history.push('/home/moments')
        } catch (error) {
            const err = { ...error }
            const message = err?.response?.data?.message
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: message,
                showConfirmButton: false,
                timer: 3000
            })
        }
    }

    const handleClickShowPassword = () => {
        setCredentials({
            ...credentials,
            showPassword: !credentials.showPassword,
        });
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div className='sub-container'>
            <div className='heading'>
                <h1>
                    Sign In
                </h1>
                <span>To start using the app</span>
            </div>
            <form onSubmit={signinClicked}>
                {
                    formFields.map((item, idx) =>
                        <div key={idx}>
                            <InputLabel htmlFor="input-with-icon-adornment">
                                {item.label}
                            </InputLabel>
                            <div style={{ display: 'flex' }}>
                                {item?.icon && <div className='inp-icon'>{item.icon}</div>}

                                <TextField onChange={onChangeHandler}  style={{ width: item.icon ? 250 : 100 }} name={item.key} autoComplete={`new-${item.key}`} type={item.type} required={item.required} id="input-with-sx" variant="standard"
                                    InputProps={item.type === 'password' && {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {credentials.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}

                                />
                            </div>
                        </div>
                    )
                }
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type='submit' className='auth-btn'>Sign in</Button>
                </div>
            </form>


            <div>
                <span>Not a member?</span>
                <span style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => props.history.push('/auth/signup')}>Sign up</span>
            </div>


        </div>
    )
}
