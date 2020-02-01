import React, { useState, useEffect, useContext } from 'react'
import Link from '@material-ui/core/Link';

import { makeStyles, Tooltip } from '@material-ui/core';

import { AuthContext } from '../../utils/Auth';
import fetchData from '../../utils/fetchData';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CircularProgress from '@material-ui/core/CircularProgress';

import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CommentIcon from '@material-ui/icons/Comment';

import PokazRecenzjeDialog from '../dialog/PokazRecenzjeDialog';

const useStyles = makeStyles(theme => ({
    ...theme.styles
}));

function RecenzjeAdmin() {
    const classes = useStyles();
    const { token } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [recenzje, setRecenzje] = useState([]);
    const [selectedRecenzja, setSelectedRecenzja] = useState(null);

    const [open, setOpen] = useState(false);

    const handleClickOpen = (recenzja) => {
        setSelectedRecenzja(recenzja);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchTable = () => {
        setLoading(true);
        fetchData('GET', 'admin/recenzja', (json) => {
            setRecenzje(json);
            setLoading(false);
        }, (err) => {},
        {
            Authorization: token
        });
    }
    
    useEffect(() => {
        fetchTable();
    }, [])

    const handleDelete = (id_uzyt, id_gra) => {
        fetchData('DELETE', `admin/recenzja/${id_uzyt}/${id_gra}`, (json) => {
            fetchTable();
        }, (err) => {}, {
            Authorization: token
        });
    }

    const table = loading ? (
        <CircularProgress/>
    ) : (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Id użytkownika</TableCell>
                    <TableCell>Id gry</TableCell>
                    <TableCell align="right">Ocena</TableCell>
                    <TableCell align="right">Data utworzenia</TableCell>
                    <TableCell align="center">Akcje</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {recenzje.map(recenzja => (
                    <TableRow hover key={recenzja.id_uzytkownik+recenzja.id_gra}>
                        <TableCell component="th" scope="row">
                            {recenzja.id_uzytkownik}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {recenzja.id_gra}
                        </TableCell>
                        <TableCell align="right">{recenzja.ocena}</TableCell>
                        <TableCell align="right">{new Date(recenzja.data).toLocaleDateString("pl-PL")}</TableCell>
                        <TableCell align="center">
                            <Tooltip title="Usuń">
                            <IconButton 
                                variant="contained"
                                color="inherit"
                                onClick={() => handleDelete(recenzja.id_uzytkownik, recenzja.id_gra)}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            </Tooltip>
                            <Tooltip title="Pokaż recenzje">
                            <IconButton 
                                variant="contained"
                                color="inherit"
                                onClick={() => handleClickOpen(recenzja)}
                            >
                                <CommentIcon fontSize="small" />
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
                    Tabela Recenzja
                </Typography>
                {table}
                {selectedRecenzja && <PokazRecenzjeDialog recenzja={selectedRecenzja} open={open} onClose={handleClose} onCancel={handleClose} />}
            </Grid>
        </Grid>
    )
}

export default RecenzjeAdmin