import React, { useCallback } from 'react';
import './styles.css'
import { Paper, InputLabel, TextField, Button, LinearProgress, IconButton } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import LinearWithValueLabel from '../../../components/progressBar';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDropzone } from 'react-dropzone'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { createMoment } from '../../../services/moment.service';
import Swal from 'sweetalert2'


export default function AddMoments(props) {
    const [moment, setMoment] = React.useState({userId: sessionStorage.getItem('userId')});

    const onDrop = useCallback((acceptedFiles) => {
        console.log("mango", acceptedFiles);
        moment["image"] = acceptedFiles;
        setMoment(moment)
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setMoment({
            ...moment,
            [name]: value
        })
    }

    const onSubmitClicked = async (event) => {
        event.preventDefault();
        try {
            const response = await createMoment(moment)
            Swal.fire({
                icon: 'success',
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500
            })
            props.history.push('/home/moments')
        } catch (error) {
            const err = { ...error }
            const message = err?.response?.data?.message
            Swal.fire({
                icon: 'error',
                title: message,
                showConfirmButton: false,
                timer: 3000
            })
        }
    }
    return (
        <>
            <h2>Add Moments</h2>
{console.log(moment)}
            <Paper className='addMoment-container' sx={{ width: '100%', overflow: 'hidden' }}>
                <form onSubmit={onSubmitClicked}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Title
                    </InputLabel>
                    <TextField onChange={onChangeHandler} name='title' className='title-inp' required={true} id="input-with-sx" variant="standard" />
                    <div style={{ marginTop: '2em', display: 'flex' }}>
                        <div style={{ width: '100%' }}>
                            <div>
                                <InputLabel htmlFor="input-with-icon-adornment">
                                    Tags
                                </InputLabel>
                                <TextField onChange={onChangeHandler} name='tags' className='tag-inp' id="input-with-sx" variant="standard" />
                            </div>
                            <div style={{ marginTop: '4em' }}>
                                Uploading

                                {

                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                                        <ImageOutlinedIcon fontSize='large' />
                                        <LinearWithValueLabel value={20} />
                                        <IconButton>
                                            <CloseOutlinedIcon />
                                        </IconButton>

                                    </div>

                                }

                            </div>

                        </div>
                        <div style={{ width: '100%' }}>
                            <div {...getRootProps()} >
                                {/* <TextField id="outlined-basic" className="m-1" label="Job designation" variant="outlined" /> */}

                                {/* <div className="m-1">Upload your resume</div> */}

                                <label className="inp-label" for="upload-photo">
                                    <div className="file-upload m-1">
                                        <CloudUploadOutlinedIcon className="uploadlogo" />
                                    </div>
                                </label>
                                <input id="upload-photo" {...getInputProps()} className="file-inp" type="file" multiple />

                                {/* <div className="file-upload m-1">
                        <p>Upload your resume or</p>
                        <CloudUpload className="uploadlogo"/>
                        <p>drag and drop your file here.</p>
                    </div> */}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type='submit' className='add-btn'>Submit</Button>
                    </div>
                </form>
            </Paper>
        </>
    )
}
