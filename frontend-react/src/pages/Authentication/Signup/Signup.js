import React from 'react'
import "../styles.css"
import { Button, Box, Grid, Container, TextField, InputLabel, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { formFields } from './config'

export default function Signup(props) {

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const signUp = () => {
        props.history.push('/auth/signin')
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

    const formUiBuilder = () => {
        let row = [];
        let col = [];
        formFields.forEach((item, idx) => {
            col.push(
                <Grid display='flex' item xs={6}>
                    <div>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            {item.label}
                        </InputLabel>
                        <div style={{ display: 'flex' }}>
                            {item?.icon && <div className='inp-icon'>{item.icon}</div>}

                            <TextField required={true} autoComplete={'abc'} style={{ width: item.icon ? 250 : 100 }} type={item.type} id="input-with-sx" variant="standard"
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

                </Grid>
            )
            if (idx % 2 !== 0) {
                row.push(
                    <Box sx={{ width: '100%', marginBottom: 2 }}>
                        <Grid container rowSpacing={1} justifyContent="center" direction={{ xs: 'column', sm: 'row' }}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {col}
                        </Grid>
                    </Box>
                )
                col = []
            }
        })
        return row
    }
    return (
        <div className='sub-container'>
            <div className='heading'>
                <h1>
                    Sign Up
                </h1>
                <span>To be a member</span>
            </div>

            <form>
                {formUiBuilder()}
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button type='submit' onClick={signUp} className='auth-btn'>Submit</Button>
                </div>
            </form>
            <div>
                <span>To be a member?</span>
                <span style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => props.history.push('/auth/signin')}>Sign in</span>
            </div>

        </div>
    )
}
