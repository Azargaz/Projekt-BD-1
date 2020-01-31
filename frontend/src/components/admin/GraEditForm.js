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

function GraEditForm() {
    const classes = useStyles();
    const { token } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [platformy, setGry] = useState([]);

    const [editPlatforma, setEditPlatforma] = useState({
        id_platforma: "",
        nazwa: ""
    });

    const fetchTable = () => {
        setLoading(true);
        fetchData('GET', 'admin/gra', (json) => {
            setGry(json);
            setLoading(false);
        }, (err) => {},
        {
            Authorization: token
        });
    }
    
    useEffect(() => {
        fetchTable();
    }, [])

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
            
        }, (err) => {}, {
            Authorization: token
        });
    }

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
        <>
            {edit}
        </>
    )
}

export default GraEditForm
