import React, { useState, useContext } from 'react'

import { AuthContext } from '../utils/Auth';
import { Link } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    ...theme.styles
}));

function Login() {
    const classes = useStyles();
    const [loginData, setLoginData] = useState({
        login: "",
        haslo: ""
    });
    const { authenticate, errors, clearErrors } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        clearErrors();
        authenticate(loginData);
    }

    const handleChange = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        });
    }

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item sm={4}>
            <form onSubmit={handleSubmit} className={classes.form}>
                <Typography variant="h3" className={classes.header}>
                    Logowanie
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
                    value={loginData.login}
                    error={errors.authError ? true : false}
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
                    value={loginData.haslo}
                    helperText={errors.authError}
                    error={errors.authError ? true : false}
                />
                <br />
                <Typography variant="body2">Nie posiadasz konta? <Link to="/rejestruj" style={{color: "inherit"}} tabIndex="-1">Zarejestruj się tutaj.</Link></Typography>
                <br />
                <Button variant="contained" color="primary" type="submit" className={classes.button}>
                    Zaloguj się
                </Button>
            </form>
            </Grid>
        </Grid>
    )
}

export default Login
