import React, { useState, useEffect, useContext } from 'react'

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

function GatunekAdmin() {
    const classes = useStyles();
    const { token } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [gatunki, setGatunki] = useState([]);

    const [gatunek, setGatunek] = useState({
        nazwa: ""
    });

    const [editGatunek, setEditGatunek] = useState({
        id_gatunek: "",
        nazwa: ""
    });

    const [tab, setTab] = useState(0);

    const handleTabChange = (event, newTab) => {
        setTab(newTab);

        if(newTab === 0) 
            fetchTable();
    };

    const fetchTable = () => {
        setLoading(true);
        fetchData('GET', 'admin/gatunek', (json) => {
            setGatunki(json);
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
        setGatunek({
            ...gatunek,
            [event.target.name]: event.target.value
        });
    }

    const clearForm = () => {
        setGatunek({
            nazwa: ""
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetchData('POST', 'admin/gatunek', (json) => {
            clearForm();
            handleTabChange(null, 0);
        }, (err) => {}, {
            'Content-Type': 'application/json',
            Authorization: token
        },
        JSON.stringify(gatunek));
    }

    const handleSelectChange = (event) => {
        const id = event.target.value;
        const selectGatunek = gatunki.filter(gatunek => gatunek.id_gatunek === id)[0];
        if(selectGatunek) {
            setEditGatunek(selectGatunek);
        }
    }

    const handleEditChange = (event) => {
        setEditGatunek({
            ...editGatunek,
            [event.target.name]: event.target.value
        })
    }

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        fetchData('PUT', 'admin/gatunek', (json) => {
            handleTabChange(null, 0);
        }, (err) => {}, {
            'Content-Type': 'application/json',
            Authorization: token
        },
        JSON.stringify(editGatunek));
    }

    const handleDelete = () => {
        if(editGatunek.id_gatunek === "")
            return;
        
        fetchData('DELETE', `admin/gatunek/${editGatunek.id_gatunek}`, (json) => {
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gatunki.map(gatunek => (
                            <TableRow hover key={gatunek.id_gatunek}>
                                <TableCell component="th" scope="row">
                                    {gatunek.id_gatunek}
                                </TableCell>
                                <TableCell align="right">{gatunek.nazwa}</TableCell>
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
                        value={gatunek.nazwa}
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
                        label="Wybierz gatunek *"
                        id_name="id_gatunek"
                        db_id_name="id_gatunek"
                        name="nazwa"
                        value={editGatunek.id_gatunek}
                        detale={gatunki}
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
                        value={editGatunek.nazwa}
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
                    Tabela Gatunek
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

export default GatunekAdmin
