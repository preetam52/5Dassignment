import React from 'react'
import "../styles.css"
import { Button, Box, Grid, Container, TextField, InputLabel, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { formFields } from './config'
import { signup } from '../../../services/user.service';
import Swal from 'sweetalert2'

export default function Signup(props) {

    const schema = {};
    formFields.forEach((item) => {
        schema[item.key] = ''
    })

    const [users, setUsers] = React.useState({
        ...schema
    });

    const signUpClicked = async (event) => {
        event.preventDefault();
        try {
            const response = await signup(users)
            Swal.fire({
                icon: 'success',
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500
            })
            props.history.push('/auth/signin')
        } catch (error) {
            const err = {...error}
            const {message} = err?.response?.data
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
        // setUsers({
        //     ...users,
        //     showPassword: !users.showPassword,
        // });
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setUsers({
            ...users,
            [name]: value
        })
    }

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

                            <TextField onChange={onChangeHandler} name={item.key} required={item.required} autoComplete={`new-${item.key}`} style={{ width: item.icon ? 250 : 100 }} type={item.type} id="input-with-sx" variant="standard"
                                InputProps={item.type === 'password' && {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {users.showPassword ? <VisibilityOff /> : <Visibility />}
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
                {console.log(users)}
                <h1>
                    Sign Up
                </h1>
                <span>To be a member</span>
            </div>

            <form onSubmit={signUpClicked}>
                {formUiBuilder()}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type='submit' className='auth-btn'>Submit</Button>
                </div>
            </form>
            <div>
                <span>To be a member?</span>
                <span style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => props.history.push('/auth/signin')}>Sign in</span>
            </div>

        </div>
    )
}
