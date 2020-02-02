import React, { useState, useContext } from 'react'

import { setApiURL } from '../utils/fetchData';
import { AuthContext } from '../utils/Auth';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PollIcon from '@material-ui/icons/Poll';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    ...theme.styles
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function StronaGlowna() {
    const classes = useStyles();
    const { authenticated, decodedToken } = useContext(AuthContext);

    const [url, setUrl] = useState("http://localhost:3001/");

    const handleChange = (event) => {
        setUrl(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setApiURL(url);
    }

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item sm={8}>
                <Typography variant="h3" className={classes.header}>
                    GRAWEB
                </Typography>
                <Box>
                    <Typography variant="body1" className={classes.header} align="justify">
                        Witaj w serwisie GRAWEB, encyklopedii gier komputerowych z możliwością prowadzenia listy gier.
                        <br/><br/>
                        <List component="nav">
                            <ListItemLink href="#/gry">
                                <ListItemIcon>
                                    <SportsEsportsIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Wszystkie gry." />
                            </ListItemLink>
                            <ListItemLink href="#/gry/top/10">
                                <ListItemIcon>
                                    <PollIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Top 10 gier." />
                            </ListItemLink>
                            { authenticated && decodedToken ? (
                                <ListItemLink href={"#/uzytkownik/lista/" + decodedToken.id_uzytkownik}>
                                    <ListItemIcon>
                                        <ListAltIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Twoja lista gier." />
                                </ListItemLink>
                            ) : (
                                <>
                                <ListItemLink href="#/login">
                                    <ListItemIcon>
                                        <AccountCircleIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Masz konto? Zaloguj się." />
                                </ListItemLink>
                                <ListItemLink href="#/rejestruj">
                                    <ListItemIcon>
                                        <AccountCircleIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Nie masz konta? Zarejestruj się." />
                                </ListItemLink>
                                </>
                            )}
                        </List>
                        { decodedToken && decodedToken.admin && (
                            <>
                            <Divider />
                            <List component="nav">
                                <ListItem>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Naciśnij taką ikonę w prawym górnym aby otworzyć panel zarządzania tabelami." />
                                </ListItem>
                            </List>
                            </>
                        )}
                    </Typography>
                    <Box mx={2} mt={5}>
                        <Typography variant="body1" color="textSecondary" align="justify">
                            Jeśli zajdzie taka potrzeba, URL do RESTowego API można zmienić poniżej:
                        </Typography>
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <TextField
                                name="url"
                                label="Nowe API URL"
                                placeholder="http://localhost:3001/"
                                value={url}
                                onChange={handleChange}
                                required
                                margin="normal"
                            />
                            <br/>
                            <Button variant="contained" type="submit" color="primary" className={classes.button}>
                                Zmień
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default StronaGlowna
