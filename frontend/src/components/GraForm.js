import React, { useState, useEffect } from 'react'

import fetchData from '../utils/fetchData';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

import DetaleCheckboxList from './DetaleCheckboxList';

const useStyles = makeStyles(theme => ({
    form: {
        marginTop: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(2)
    },
    header: {
        margin: 15
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function GraForm() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [gra, setGra] = useState({
        tytul: "",
        opis: "",
        data_wydania: "",
        kategoria_wiekowa: ""
    });
    const [detale, setDetale] = useState({
        gatunki: [],
        wydawcy: [],
        producenci: [],
        platformy: []
    });

    const [fetchedDetails, setFetchedDetails] = useState({
        firmy: [],
        gatunki: [],
        platformy: []
    })
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDetails = () => {
        setLoading(true);
        fetchData('GET', 'gra/detale', (json) => {
            setFetchedDetails(json);
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchDetails();
    }, [])

    const clearForm = () => {
        setGra({
            tytul: "",
            opis: "",
            data_wydania: "",
            kategoria_wiekowa: ""
        })

        setDetale({
            id_gatunek: "",
            id_producent: "",
            id_wydawca: "",
            id_platforma: ""
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetchData('POST', 'gra/', (json) => {
            console.log(json);
            setOpen(true);
            clearForm();
        }, (err) => {
            setErrors([
                ...errors,
                err
            ]);
        }, {
            'Content-Type': 'application/json'
        },
        JSON.stringify({
            gra,
            detale
        }));
    }

    const handleChangeGra = (event) => {
        setGra({
            ...gra,
            [event.target.name]: event.target.value
        })
    }

    const handleChangeDetale = (event) => {
        setDetale({
            ...detale,
            [event.target.name]: event.target.value
        })
    }

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item sm={4}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Typography variant="h3" className={classes.header}>
                        Dodaj grę
                    </Typography>
                    <TextField
                        name="tytul"
                        type="text"
                        label="Tytuł"
                        placeholder="Tytuł"
                        margin="normal"
                        fullWidth
                        required
                        onChange={handleChangeGra}
                        value={gra.tytul}
                    />
                    <TextField
                        name="opis"
                        type="text"
                        label="Opis"
                        placeholder="Opis"
                        margin="normal"
                        fullWidth
                        onChange={handleChangeGra}
                        value={gra.opis}
                    />
                    <TextField
                        name="data_wydania"
                        label="Data wydania"
                        type="date"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        fullWidth
                        required
                        onChange={handleChangeGra}
                        value={gra.data_wydania}
                    />
                    <TextField
                        name="kategoria_wiekowa"
                        type="text"
                        label="Kategoria wiekowa"
                        placeholder="Kategoria wiekowa"
                        margin="normal"
                        fullWidth
                        required
                        onChange={handleChangeGra}
                        value={gra.kategoria_wiekowa}
                    />

                    <Grid container justify="center" alignItems="center" margin="normal">
                        <DetaleCheckboxList name="gatunki" label="Gatunki" onChange={handleChangeDetale} />
                        <DetaleCheckboxList name="wydawcy" label="Wydawcy" />
                        <DetaleCheckboxList name="producenci" label="Producenci" />
                        <DetaleCheckboxList name="platformy" label="Platformy" />
                    </Grid>
                    <br/>

                    <Button variant="contained" color="primary" type="submit" className={classes.button}>
                        Wyślij
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button} onClick={clearForm}>
                        Reset
                    </Button>
                </form>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    message="Dodano gre"
                    action={
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                />
                <Snackbar 
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={errors.length > 0}
                    autoHideDuration={5000}
                    onClose={handleClose}
                >
                    <Alert severity="error">{errors.length > 0 ? errors[errors.length-1] : ""}</Alert>
                </Snackbar>
            </Grid>
        </Grid>
    )
}

export default GraForm;