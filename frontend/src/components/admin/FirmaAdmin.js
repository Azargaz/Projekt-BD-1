import React, { useState, useEffect, useContext } from 'react'

import { makeStyles } from '@material-ui/core';

import { AuthContext } from '../../utils/Auth';
import fetchData from '../../utils/fetchData';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
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
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TabPanel from '../input/TabPanel';

const useStyles = makeStyles(theme => ({
    header: {
        margin: 15
    },
    form: {
        marginTop: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(2)
    },
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
                                <TableCell align="right">{firma.strona_www}</TableCell>
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
                        value={firma.strona_www}
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
                    </Tabs>
                    <TabPanel value={tab} index={0}>
                        {table}
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        {form}
                    </TabPanel>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default FirmaAdmin
