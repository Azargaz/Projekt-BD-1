import React, { useState, useEffect, useContext } from 'react'
import fetchData from '../../utils/fetchData';
import { AuthContext } from '../../utils/Auth';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../Alert';

const useStyles = makeStyles(theme => ({
    ...theme.styles
}))

function UzytkownikAdmin() {
    const { decodedToken, token } = useContext(AuthContext);
    const classes = useStyles();

    const [uzytkownicy, setUzytkownicy] = useState([]);
    const [loading, setLoading] = useState(true);

    const [errors, setErrors] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if(reason === "clickaway") {
            return;
        }

        setOpen(false);
    }

    const handleError = () => {
        setOpen(true);
    }

    const fetchUzytkownicy = () => {
        fetchData('GET', 'admin/uzytkownik', (json) => {
            setUzytkownicy(json);
            setLoading(false);
        }, (err) => {},
        {
            Authorization: token
        })
    }

    useEffect(() => {
        setLoading(true);
        fetchUzytkownicy();
    }, [])

    const handleDelete = (id) => {
        if(id === decodedToken.id_uzytkownik) {
            setErrors({
                msg: "Nie możesz usunąc swojego konta użytkownika."
            })
            handleError();
            return;
        }

        fetchData('DELETE', `admin/uzytkownik/${id}`, (json) => {
            fetchUzytkownicy();
        }, (err) => {},
        {
            Authorization: token
        })
    }

    const table = loading ? (
        <CircularProgress/>
    ) : (
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right">Login</TableCell>
                    <TableCell align="right">Imie</TableCell>
                    <TableCell align="right">Nazwisko</TableCell>
                    <TableCell align="right">E-mail</TableCell>
                    <TableCell align="center">Akcje</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {uzytkownicy.map((uzytkownik) => (
                    <TableRow hover key={uzytkownik.id_uzytkownik}>
                        <TableCell component="th" scope="row">{uzytkownik.id_uzytkownik}</TableCell>
                        <TableCell align="right">{uzytkownik.login}</TableCell>
                        <TableCell align="right">{uzytkownik.imie ? uzytkownik.imie : "-"}</TableCell>
                        <TableCell align="right">{uzytkownik.nazwisko ? uzytkownik.nazwisko : "-"}</TableCell>
                        <TableCell align="right">{uzytkownik.email}</TableCell>
                        <TableCell align="center">
                        <Tooltip title="Usuń">
                            <IconButton 
                                variant="contained"
                                color="inherit"
                                onClick={() => handleDelete(uzytkownik.id_uzytkownik)}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
    )

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item sm={8}>
                <Typography variant="h3" className={classes.header}>
                    Tabela Użytkownik
                </Typography>
                {table}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}>
                    <Alert severity="error">
                        {errors ? errors.msg : ''}
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>
    )
}

export default UzytkownikAdmin
