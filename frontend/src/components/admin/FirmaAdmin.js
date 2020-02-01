import React, { useState, useEffect, useContext } from 'react'
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core';

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

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TabPanel from '../input/TabPanel';

import DetaleSelect from '../input/DetaleSelect';

const useStyles = makeStyles(theme => ({
    ...theme.styles
}));

function FirmaAdmin() {
    const classes = useStyles();
    const { token } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [firmy, setFirmy] = useState([]);

    const [firma, setFirma] = useState({
        nazwa: "",
        siedziba: "",
        strona_www: ""
    });

    const [editFirma, setEditFirma] = useState({
        id_firma: "",
        nazwa: "",
        siedziba: "",
        strona_www: ""
    });

    const [tab, setTab] = useState(0);

    const handleTabChange = (event, newTab) => {
        setTab(newTab);

        if(newTab === 0) 
            fetchTable();
    };

    const fetchTable = () => {
        setLoading(true);
        fetchData('GET', 'admin/firma', (json) => {
            setFirmy(json);
            setLoading(false);
        }, (err) => {},
        {
            Authorization: token
        });
    }
    
    useEffect(() => {
        fetchTable();
    }, [])

    const handleChange = (event) => {
        setFirma({
            ...firma,
            [event.target.name]: event.target.value
        });
    }

    const clearForm = () => {
        setFirma({
            nazwa: "",
            siedziba: "",
            strona_www: ""
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetchData('POST', 'admin/firma', (json) => {
            clearForm();
            handleTabChange(null, 0);
        }, (err) => {}, {
            'Content-Type': 'application/json',
            Authorization: token
        },
        JSON.stringify(firma));
    }

    const handleSelectChange = (event) => {
        const id = event.target.value;
        const selectFirma = firmy.filter(firma => firma.id_firma === id)[0];
        if(selectFirma) {
            Object.keys(selectFirma).forEach((key) => selectFirma[key] = (selectFirma[key] === null) ? "" : selectFirma[key]);
            setEditFirma(selectFirma);
        }
    }

    const handleEditChange = (event) => {
        setEditFirma({
            ...editFirma,
            [event.target.name]: event.target.value
        })
    }

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        fetchData('PUT', 'admin/firma', (json) => {
            handleTabChange(null, 0);
        }, (err) => {}, {
            'Content-Type': 'application/json',
            Authorization: token
        },
        JSON.stringify(editFirma));
    }

    const handleDelete = () => {
        if(editFirma.id_firma === "")
            return;
        
        fetchData('DELETE', `admin/firma/${editFirma.id_firma}`, (json) => {
            handleTabChange(null, 0);
        }, (err) => {}, {
            Authorization: token
        });
    }

    const table = loading ? (
        <CircularProgress/>
    ) : (
        <Grid container justify="center" alignItems="center">
            <Grid item sm={8}>
                <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Nazwa</TableCell>
                            <TableCell align="right">Siedziba</TableCell>
                            <TableCell align="right">Strona WWW</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {firmy.map(firma => (
                            <TableRow hover key={firma.id_firma}>
                                <TableCell component="th" scope="row">
                                    {firma.id_firma}
                                </TableCell>
                                <TableCell align="right">{firma.nazwa}</TableCell>
                                <TableCell align="right">{firma.siedziba}</TableCell>
                                <TableCell align="right">
                                    <Link href={firma.strona_www} target="_blank" rel="noopener noreferrer" color="secondary">
                                        {firma.strona_www !== null ? firma.strona_www : ""}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )

    const form = (
        <Grid container justify="center" alignItems="center">
            <Grid item sm={8}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        name="nazwa"
                        type="text"
                      label="Nazwa"
                        placeholder="Nazwa"
                        margin="normal"
                        fullWidth
                        required
                        onChange={handleChange}
                        value={firma.nazwa}
                    />
                    <TextField
                        name="siedziba"
                        type="text"
                        label="Siedziba"
                        placeholder="Warszawa, Polska"
                        margin="normal"
                        fullWidth
                        required
                        onChange={handleChange}
                        value={firma.siedziba}
                    />
                    <TextField
                        name="strona_www"
                        type="url"
                        label="Strona WWW"
                        placeholder="https://strona.com.pl"
                        margin="normal"
                        fullWidth
                        onChange={handleChange}
                        value={firma.strona_www !== null ? firma.strona_www : ""}
                    />
                    <Button variant="contained" color="primary" type="submit" className={classes.button}>
                        Wyślij
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button} onClick={clearForm}>
                        Reset
                    </Button>
                </form>
            </Grid>
        </Grid>  
    )

    const edit = (
        <Grid container justify="center" alignItems="center">
            <Grid item sm={8}>
                <form className={classes.form} onSubmit={handleEditSubmit}>
                    <DetaleSelect 
                        label="Wybierz firme *"
                        id_name="id_firma"
                        db_id_name="id_firma"
                        name="nazwa"
                        value={editFirma.id_firma}
                        detale={firmy}
                        loading={loading}
                        handleChange={handleSelectChange}
                    />
                    <TextField
                        name="nazwa"
                        type="text"
                        label="Nowa nazwa"
                        placeholder="Nazwa"
                        margin="normal"
                        fullWidth
                        required
                        onChange={handleEditChange}
                        value={editFirma.nazwa}
                    />
                    <TextField
                        name="siedziba"
                        type="text"
                        label="Nowa siedziba"
                        placeholder="Warszawa, Polska"
                        margin="normal"
                        fullWidth
                        required
                        onChange={handleEditChange}
                        value={editFirma.siedziba}
                    />
                    <TextField
                        name="strona_www"
                        type="url"
                        label="Nowa strona WWW"
                        placeholder="https://strona.com.pl"
                        margin="normal"
                        fullWidth
                        onChange={handleEditChange}
                        value={editFirma.strona_www}
                    />
                    <Button variant="contained" color="primary" type="submit" className={classes.button}>
                        Aktualizuj
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={handleDelete}>
                        Usuń
                    </Button>
                </form>
            </Grid>
        </Grid>  
    )

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item sm={8}>
                <Typography variant="h3" className={classes.header}>
                    Tabela Firma
                </Typography>
                <Paper>
                    <Tabs value={tab} onChange={handleTabChange} aria-label="table tabs" variant="fullWidth">
                        <Tab label="Wyświetl" />
                        <Tab label="Dodaj" />
                        <Tab label="Edytuj" />
                    </Tabs>
                    <TabPanel value={tab} index={0}>
                        {table}
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        {form}
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        {edit}
                    </TabPanel>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default FirmaAdmin
