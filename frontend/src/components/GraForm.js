import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

import DetailsSelect from './DetailsSelect';

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
    const [game, setGame] = useState({
        tytul: "",
        opis: "",
        data_wydania: "",
        kategoria_wiekowa: ""
    });
    const [details, setDetails] = useState({
        id_gatunek: "",
        id_producent: "",
        id_wydawca: "",
        id_platforma: ""
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
        fetch('http://localhost:3001/detale')
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                setFetchedDetails(jsonData);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchDetails();
    }, [])

    const clearForm = () => {
        setGame({
            tytul: "",
            opis: "",
            data_wydania: "",
            kategoria_wiekowa: ""
        })

        setDetails({
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

        fetch("http://localhost:3001/gra/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gra: game,
                    detale: details
                })
            })
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                console.log(jsonData);
                if(jsonData.err) throw new Error(jsonData.err);
                setOpen(true);
                clearForm();
            })
            .catch(err => {
                console.error(err);
                setErrors([
                    ...errors,
                    err
                ])
            });
    }

    const handleGameChange = (event) => {
        setGame({
            ...game,
            [event.target.name]: event.target.value
        })
    }

    const handleDetailsChange = (event) => {
        setDetails({
            ...details,
            [event.target.name]: event.target.value
        })

        console.log(details);
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
                        variant="outlined"
                        required
                        onChange={handleGameChange}
                        value={game.tytul}
                    />
                    <TextField
                        name="opis"
                        type="text"
                        label="Opis"
                        placeholder="Opis"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        onChange={handleGameChange}
                        value={game.opis}
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
                        variant="outlined"
                        required
                        onChange={handleGameChange}
                        value={game.data_wydania}
                    />
                    <TextField
                        name="kategoria_wiekowa"
                        type="text"
                        label="Kategoria wiekowa"
                        placeholder="Kategoria wiekowa"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        required
                        onChange={handleGameChange}
                        value={game.kategoria_wiekowa}
                    />

                    <DetailsSelect 
                        label="Gatunek"
                        id_name="id_gatunek"
                        db_id_name="id_gatunek"
                        value={details.id_gatunek}
                        details={fetchedDetails.gatunki}
                        loading={loading}
                        handleChange={handleDetailsChange}
                    />
                    <DetailsSelect 
                        label="Producent"
                        id_name="id_producent"
                        db_id_name="id_firma"
                        value={details.id_producent}
                        details={fetchedDetails.firmy}
                        loading={loading}
                        handleChange={handleDetailsChange}
                    />
                    <DetailsSelect 
                        label="Wydawca"
                        id_name="id_wydawca"
                        db_id_name="id_firma"
                        value={details.id_wydawca}
                        details={fetchedDetails.firmy}
                        loading={loading}
                        handleChange={handleDetailsChange}
                    />
                    <DetailsSelect 
                        label="Platforma"
                        id_name="id_platforma"
                        db_id_name="id_platforma"
                        value={details.id_platforma}
                        details={fetchedDetails.platformy}
                        loading={loading}
                        handleChange={handleDetailsChange}
                    />
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