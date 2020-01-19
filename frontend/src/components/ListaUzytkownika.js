import React, { useContext, useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';

import { AuthContext } from '../utils/Auth';
import fetchData from '../utils/fetchData';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';

import GraEdytujDialog from './GraEdytujDialog';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    header: {
        margin: 15
    }
});

function ListaUzytkownika(props) {
    const { decodedToken } = useContext(AuthContext);

    const classes = useStyles();
    const { id_uzytkownik } = props.match.params;
    const [gry, setGry] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedGra, setSelectedGra] = useState(null);
    
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (gra) => {
        setSelectedGra(gra);
        setOpen(true);
    };

    const handleClose = (nowa_gra) => {
        setOpen(false);
        setGry([
            ...gry.filter(gra => gra.id_gra !== nowa_gra.id_gra),
            nowa_gra
        ])
    };

    const fetchGry = () => {
        setLoading(true);
        fetchData('GET', `uzytkownik/lista/id/${id_uzytkownik}`, (json) => {
            setGry(json);
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchGry();
    }, [])

    const table = loading ? (
        <CircularProgress/>
    ) : (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="center">Tytuł</TableCell>
                    <TableCell align="center">Ocena</TableCell>
                    <TableCell align="center">Data rozpoczęcia</TableCell>
                    <TableCell align="center">Data ukończenia</TableCell>
                    <TableCell align="center">Status</TableCell>
                    { decodedToken.id_uzytkownik === parseInt(id_uzytkownik, 10) && <TableCell align="center">Akcje</TableCell> }
                </TableRow>
            </TableHead>
            <TableBody>
                {gry.map(gra => (
                    <TableRow hover key={gra.id_gra}>
                        <TableCell component="th" scope="row">
                            {gra.id_gra}
                        </TableCell>
                        <TableCell align="center">{gra.tytul}</TableCell>
                        <TableCell align="center">{gra.ocena}</TableCell>
                        <TableCell align="center">{new Date(gra.data_rozpoczecia).toLocaleDateString("pl-PL")}</TableCell>
                        <TableCell align="center">{new Date(gra.data_ukonczenia).toLocaleDateString("pl-PL")}</TableCell>
                        <TableCell align="center">{gra.status}</TableCell>
                        { decodedToken.id_uzytkownik === parseInt(id_uzytkownik, 10) && (
                            <TableCell align="center">
                                <IconButton
                                    color="inherit"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={() => handleClickOpen(gra)}
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                >
                                    <CancelIcon fontSize="small" />
                                </IconButton>
                                </TableCell>
                        )}
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
                    Lista użytkownika
                </Typography>
                {table}
                { selectedGra && <GraEdytujDialog gra={selectedGra ? selectedGra : {}} open={open} onClose={handleClose} /> }
            </Grid>
        </Grid>
    )
}

export default ListaUzytkownika
