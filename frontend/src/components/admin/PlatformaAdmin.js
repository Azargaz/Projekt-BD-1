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

function PlatformaAdmin() {
    const classes = useStyles();
    const { token } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [platformy, setPlatformy] = useState([]);

    const [platforma, setPlatforma] = useState({
        nazwa: ""
    });

    const [editPlatforma, setEditPlatforma] = useState({
        id_platforma: "",
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
        fetchData('GET', 'admin/platforma', (json) => {
            setPlatformy(json);
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
        setPlatforma({
            ...platforma,
            [event.target.name]: event.target.value
        });
    }

    const clearForm = () => {
        setPlatforma({
            nazwa: ""
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetchData('POST', 'admin/platforma', (json) => {
            clearForm();
            handleTabChange(null, 0);
        }, (err) => {}, {
            'Content-Type': 'application/json',
            Authorization: token
        },
        JSON.stringify(platforma));
    }

    const handleSelectChange = (event) => {
        const id = event.target.value;
        const selectPlatforma = platformy.filter(platforma => platforma.id_platforma === id)[0];
        if(selectPlatforma) {
            setEditPlatforma(selectPlatforma);
        }
    }

    const handleEditChange = (event) => {
        setEditPlatforma({
            ...editPlatforma,
            [event.target.name]: event.target.value
        })
    }

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        fetchData('PUT', 'admin/platforma', (json) => {
            handleTabChange(null, 0);
        }, (err) => {}, {
            'Content-Type': 'application/json',
            Authorization: token
        },
        JSON.stringify(editPlatforma));
    }

    const handleDelete = () => {
        if(editPlatforma.id_platforma === "")
            return;
        
        fetchData('DELETE', `admin/platforma/${editPlatforma.id_platforma}`, (json) => {
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
                        {platformy.map(platforma => (
                            <TableRow hover key={platforma.id_platforma}>
                                <TableCell component="th" scope="row">
                                    {platforma.id_platforma}
                                </TableCell>
                                <TableCell align="right">{platforma.nazwa}</TableCell>
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
                        value={platforma.nazwa}
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
                        label="Platforma"
                        id_name="id_platforma"
                        db_id_name="id_platforma"
                        name="nazwa"
                        value={editPlatforma.id_platforma}
                        detale={platformy}
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
                        value={editPlatforma.nazwa}
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
                    Tabela Platforma
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

export default PlatformaAdmin
