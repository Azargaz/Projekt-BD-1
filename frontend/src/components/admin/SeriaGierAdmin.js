import React, { useState, useEffect, useContext } from 'react'

import { makeStyles } from '@material-ui/core';

import { AuthContext } from '../../utils/Auth';
import fetchData from '../../utils/fetchData';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CircularProgress from '@material-ui/core/CircularProgress';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TabPanel from '../input/TabPanel';

import DetaleSelect from '../input/DetaleSelect';

const useStyles = makeStyles(theme => ({
    ...theme.styles
}));


function SeriaGierAdmin() {
    const classes = useStyles();
    const { token } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [serie, setSerie] = useState([]);

    const [seria, setSeria] = useState({
        tytul: ""
    });

    const [editSeria, setEditSeria] = useState({
        id_seria: "",
        tytul: ""
    });

    const [tab, setTab] = useState(0);

    const handleTabChange = (event, newTab) => {
        setTab(newTab);

        if(newTab === 0) 
            fetchTable();
    };

    const fetchTable = () => {
        setLoading(true);
        fetchData('GET', 'admin/seria_gier', (json) => {
            setSerie(json);
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
        setSeria({
            ...seria,
            [event.target.name]: event.target.value
        });
    }

    const clearForm = () => {
        setSeria({
            tytul: ""
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetchData('POST', 'admin/seria_gier', (json) => {
            clearForm();
            handleTabChange(null, 0);
        }, (err) => {}, {
            'Content-Type': 'application/json',
            Authorization: token
        },
        JSON.stringify(seria));
    }

    const handleSelectChange = (event) => {
        const id = event.target.value;
        const selectSeria = serie.filter(seria => seria.id_seria === id)[0];
        if(selectSeria) {
            setEditSeria(selectSeria);
        }
    }

    const handleEditChange = (event) => {
        setEditSeria({
            ...editSeria,
            [event.target.name]: event.target.value
        })
    }

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        fetchData('PUT', 'admin/seria_gier', (json) => {
            handleTabChange(null, 0);
        }, (err) => {}, {
            'Content-Type': 'application/json',
            Authorization: token
        },
        JSON.stringify(editSeria));
    }

    const handleDelete = () => {
        if(editSeria.id_seria === "")
            return;
        
        fetchData('DELETE', `admin/seria_gier/${editSeria.id_seria}`, (json) => {
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
                            <TableCell align="right">Tytuł serii</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {serie.map(seria => (
                            <TableRow hover key={seria.id_seria}>
                                <TableCell component="th" scope="row">
                                    {seria.id_seria}
                                </TableCell>
                                <TableCell align="right">{seria.tytul}</TableCell>
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
                        name="tytul"
                        type="text"
                        label="Tytuł"
                        placeholder="Tytuł"
                        margin="normal"
                        fullWidth
                        required
                        onChange={handleChange}
                        value={seria.tytul}
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
                        label="Seria gier"
                        id_name="id_seria"
                        db_id_name="id_seria"
                        name="tytul"
                        value={editSeria.id_seria}
                        detale={serie}
                        loading={loading}
                        handleChange={handleSelectChange}
                    />
                    <TextField
                        name="tytul"
                        type="text"
                        label="Nowy tytuł"
                        placeholder="tytul"
                        margin="normal"
                        fullWidth
                        required
                        onChange={handleEditChange}
                        value={editSeria.tytul}
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
                    Tabela Seria gier
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

export default SeriaGierAdmin
