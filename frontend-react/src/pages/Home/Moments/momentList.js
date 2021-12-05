import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { deleteMoment, getMoments } from '../../../services/moment.service';
import { Chip, IconButton } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import { base_url } from '../../../apis/endPoints';
import Swal from 'sweetalert2'




export default function StickyHeadTable(props) {
    const columns = [
        { id: 'srNo', label: 'Sr.No', minWidth: 170 },
        {
            id: 'image',
            label: 'Image',
            minWidth: 100,
            format: (value) => <img style={{ width: 40, height: 40, borderRadius: 100 }} src={`${base_url}/${value}`} />,
        },
        {
            id: 'title',
            label: 'Title',
            minWidth: 170,
            align: 'left',
    
        },
        {
            id: 'tags',
            label: 'Tags',
            minWidth: 170,
            align: 'left',
            format: (value) => value?.length ? value.map((e, i) => <Chip label={e} />) : [],
    
        },
        {
            id: 'action',
            label: 'Action',
            minWidth: 170,
            align: 'center',
            format: (value) => <div>
                <IconButton aria-label="delete" size="small">
                    <EditOutlined fontSize="inherit" />
                </IconButton>
                <IconButton onClick={() => deleteMomentClicked(value)} aria-label="delete" size="small">
                    <DeleteOutline fontSize="inherit" />
                </IconButton></div>
        },
    ];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([])

    React.useEffect(() => {
        getAllMoments()
        return () => {

        }
    }, [page])

    const getAllMoments = async () => {
        const userId = sessionStorage.getItem('userId');
        console.log(userId);
        if (userId) {
            const momentsFromdb = await getMoments(userId, page, rowsPerPage);
            setRows(momentsFromdb.map((e, i) => createData(i + 1, e.image, e.title, e.tags, e._id)))
        }
    }

    const createData = (srNo, image, title, tags, action) => {
        return { srNo, image, title, tags, action };
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteMomentClicked = async (momentId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteMoment(momentId);
                    getAllMoments()
                    Swal.fire({
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
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
          })
        
    }

    return (
        <>
            <h2>Moments</h2>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {/* <TableSortLabel
                                        // active={orderBy === column.id}
                                        // direction={orderBy === column.id ? order : 'asc'}
                                        onClick={createSortHandler(column.id)}
                                    > */}
                                        {column.label}
                                        {/* {orderBy === headCell.id ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel> */}

                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {console.log("=====>", column)}
                                                        {
                                                            column.format ? column.id === 'action' ? column.format( row[column.id]) : column.format(value) : value
                                                        }
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}
