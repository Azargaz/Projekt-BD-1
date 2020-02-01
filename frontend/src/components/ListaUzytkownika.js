import React, { useContext, useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import GraEdytujDialog from './dialog/GraEdytujDialog';
import GraUsunDialog from './dialog/GraUsunDialog';

const useStyles = makeStyles(theme => ({
    ...theme.styles
}));

function ListaUzytkownika(props) {
    const { decodedToken } = useContext(AuthContext);

    const classes = useStyles();
    const { id_uzytkownik } = props.match.params;
    const [gry, setGry] = useState([]);
    const [statusy, setStatusy] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedGra, setSelectedGra] = useState(null);
    
    const [open, setOpen] = useState({
        edytuj: false,
        usun: false
    });

    const handleClickOpen = (name, gra) => {
        setSelectedGra(gra);
        setOpen({
            ...open,
            [name]: true
        });
    };

    const handleClose = (name, nowaGra) => {
        setOpen({
            ...open,
            [name]: false
        });
        const graIndex = gry.findIndex(gra => nowaGra.id_gra === gra.id_gra);
        setGry([
            ...gry.slice(0, graIndex),
            nowaGra,
            ...gry.slice(graIndex + 1)
        ]);
    };

    const handleDelete = () => {
        const graIndex = gry.findIndex(gra => selectedGra.id_gra === gra.id_gra);
        setGry([
            ...gry.slice(0, graIndex),
            ...gry.slice(graIndex + 1)
        ]);
    }

    const handleCancel = (name) => {
        setOpen({
            ...open,
            [name]: false
        });
    };

    const fetchGry = () => {
        setLoading(true);
        fetchData('GET', `uzytkownik/lista/id/${id_uzytkownik}`, (json) => {
            setGry(json);
            fetchData('GET', 'uzytkownik/lista/statusy', (json) => {
                setStatusy(json);
                setLoading(false);
            });
        });
    }

    useEffect(() => {
        fetchGry();
    }, [id_uzytkownik])

    const statusGry = (id_status) => {
        const status = statusy.filter(status => status.id_status_gry === id_status)[0];
        if(status)
            return status.status;
        else
            return "";
    }

    const table = loading ? (
        <CircularProgress/>
    ) : (
        statusy.map(status => {
            const gryStatusu = gry.filter(gra => gra.id_status_gry === status.id_status_gry);

            return gryStatusu.length > 0 ? (
                <div key={status.id_status_gry}>
                <Typography variant="h5" className={classes.header}>
                    {status.status}
                </Typography>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="right">Tytuł</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Ocena</TableCell>
                                <TableCell align="right">Data rozpoczęcia</TableCell>
                                <TableCell align="right">Data ukończenia</TableCell>
                                { decodedToken.id_uzytkownik === parseInt(id_uzytkownik, 10) && <TableCell align="center">Akcje</TableCell> }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gryStatusu.map((gra, index) => (
                                <TableRow hover key={gra.id_gra}>
                                    <TableCell component="th" scope="row">{index+1}</TableCell>
                                    <TableCell align="right"><Link to={"/gra/" + gra.id_gra} variant="body2" color="inherit" component={RouterLink}>{gra.tytul}</Link></TableCell>
                                    <TableCell align="right">{statusGry(gra.id_status_gry)}</TableCell>
                                    <TableCell align="right">{gra.ocena}</TableCell>
                                    <TableCell align="right">{gra.data_rozpoczecia ? new Date(gra.data_rozpoczecia).toLocaleDateString("pl-PL") : ""}</TableCell>
                                    <TableCell align="right">{gra.data_ukonczenia ? new Date(gra.data_ukonczenia).toLocaleDateString("pl-PL") : ""}</TableCell>
                                    { decodedToken.id_uzytkownik === parseInt(id_uzytkownik, 10) && (
                                        <TableCell align="center">
                                            <IconButton
                                                color="inherit"
                                                aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                onClick={() => handleClickOpen("edytuj", gra)}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                color="inherit"
                                                aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                onClick={() => handleClickOpen("usun", gra)}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
            ) : ""
        })
    );

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item sm={8}>
                <Typography variant="h3" className={classes.header}>
                    {parseInt(id_uzytkownik, 10) === decodedToken.id_uzytkownik ? "Twoja lista gier" : "Lista gier użytkownika " + id_uzytkownik}
                </Typography>
                {!loading && gry.length <= 0 ? (<Typography variant="caption" className={classes.header}>Brak gier na liście użytkownika...</Typography>)
                : table}
                {selectedGra && (
                    <>
                        <GraEdytujDialog edytowanaGra={selectedGra} statusy={statusy} open={open.edytuj} onClose={(nowaGra) => handleClose("edytuj", nowaGra)} onCancel={() => handleCancel("edytuj")} />
                        <GraUsunDialog usuwanaGra={selectedGra} usunGre={handleDelete} open={open.usun} onClose={() => handleCancel("usun")} onCancel={() => handleCancel("usun")} />
                    </>
                )}
            </Grid>
        </Grid>
    )
}

export default ListaUzytkownika
