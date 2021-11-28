import React from 'react'
import "../styles.css"
import { Button, Box, Grid, Container, TextField, InputLabel, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { formFields } from './config'


export default function Signin(props) {

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const signIn = () => {
        props.history.push('/home/moments')
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

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

            {
                formFields.map((item, idx) =>
                    <div>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            {item.label}
                        </InputLabel>
                        <div style={{ display: 'flex' }}>
                            {item?.icon && <div className='inp-icon'>{item.icon}</div>}

                            <TextField autoComplete={'abc'} style={{ width: item.icon ? 250 : 100 }} type={item.type} id="input-with-sx" variant="standard"
                                InputProps={item.type === 'password' && {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                    </div>
                )
            }
            <Button className='btn' onClick={signIn} className='auth-btn'>Sign in</Button>

            <div>
                <span>Not a member?</span>
                <span style={{marginLeft: 5, cursor: 'pointer'}} onClick={() => props.history.push('/auth/signup')}>Sign up</span>
            </div>


        </div>
    )
}
