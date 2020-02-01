import React, { useState } from 'react'

import fetchData from '../utils/fetchData';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    ...theme.styles
}));

function Rejestracja() {
    const classes = useStyles();
    const [rejestrujData, setRejestrujData] = useState({
        login: "",
        haslo: "",
        email: "",
        imie: "",
        nazwisko: ""
    });

    const [errors, setErrors] = useState(null);

    const clearErrors = () => {
        setErrors(null)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData('POST', 'uzytkownik', (json) => {
            console.log(json);
            clearForm();
        }, (err) => {
            setErrors(err);
        },
        {
            "Content-Type": "application/json"
        },
        JSON.stringify(rejestrujData));
    }

    const handleChange = (event) => {
        setRejestrujData({
            ...rejestrujData,
            [event.target.name]: event.target.value
        });
    }

    const clearForm = () => {
        setRejestrujData({
            login: "",
            haslo: "",
            email: "",
            imie: "",
            nazwisko: ""
        })
        clearErrors();
    }

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item sm={4}>
            <form onSubmit={handleSubmit} className={classes.form}>
                <Typography variant="h3" className={classes.header}>
                    Rejestracja
                </Typography>
                <TextField
                    name="login"
                    type="text"
                    label="Login"
                    placeholder="Login"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    required
                    onChange={handleChange}
                    value={rejestrujData.login}
                    error={errors ? true : false}
                    helperText={errors ? errors.message : ""}
                />
                <TextField
                    name="haslo"
                    type="password"
                    label="Hasło"
                    placeholder="Hasło"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    required
                    onChange={handleChange}
                    value={rejestrujData.haslo}
                />
                <TextField
                    name="email"
                    type="email"
                    label="E-mail"
                    placeholder="mail@mail.com"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    required
                    onChange={handleChange}
                    value={rejestrujData.email}
                />
                <TextField
                    name="imie"
                    type="text"
                    label="Imie"
                    placeholder="Imie"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    value={rejestrujData.imie}
                />
                <TextField
                    name="nazwisko"
                    type="text"
                    label="Nazwisko"
                    placeholder="Nazwisko"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    value={rejestrujData.nazwisko}
                />
                <Button variant="contained" color="primary" type="submit" className={classes.button}>
                    Zarejestruj się
                </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={clearForm}>
                    Reset
                </Button>
            </form>
            </Grid>
        </Grid>
    )
}

export default Rejestracja