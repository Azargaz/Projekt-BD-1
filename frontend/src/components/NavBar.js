import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { withRouter } from "react-router";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import MenuIcon from '@material-ui/icons/Menu';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import CategoryIcon from '@material-ui/icons/Category';
import GamepadIcon from '@material-ui/icons/Gamepad';
import ListIcon from '@material-ui/icons/List';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CommentIcon from '@material-ui/icons/Comment';
import DarknessIcon from '@material-ui/icons/Brightness4';
import BrightnessIcon from '@material-ui/icons/Brightness5';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SearchIcon from '@material-ui/icons/Search';
import PollIcon from '@material-ui/icons/Poll';
import AlbumIcon from '@material-ui/icons/Album';

import { AuthContext } from '../utils/Auth';

const useStyles = makeStyles(theme => ({
    ...theme.styles,
    textField: {
        color: theme.palette.primary.contrastText
    }
}));

function NavBar(props) {
    const classes = useStyles();
    const { darkmode, handleDarkmodeChange, history } = props;
    const { authenticated, unauthenticate, decodedToken } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const [szukanaGra, setSzukanaGra] = useState("");

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = (event) => {
        setSzukanaGra(event.target.value);
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault(); 

        if(!szukanaGra || szukanaGra === "")
            return;

        history.push("/gry/szukaj/" + btoa(szukanaGra));
    }

    const adminBar = (
        (decodedToken && decodedToken.admin === true) && (
            <>
                <Tooltip title="Akcje administratora">
                    <IconButton
                        color="inherit"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                </Tooltip>
                <Drawer open={open} onClose={handleClose} anchor="right">
                    <List>
                        <ListItem component="h2">Zarządzaj tabelami</ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button component={RouterLink} to="/admin/gra" onClick={handleClose}>
                            <ListItemIcon><VideogameAssetIcon/></ListItemIcon>
                            <ListItemText primary="Tabela Gra" />
                        </ListItem>
                        <ListItem button component={RouterLink} to="/admin/firma" onClick={handleClose}>
                            <ListItemIcon><BusinessCenterIcon/></ListItemIcon>
                            <ListItemText primary="Tabela Firma" />
                        </ListItem>
                        <ListItem button component={RouterLink} to="/admin/gatunek" onClick={handleClose}>
                            <ListItemIcon><CategoryIcon/></ListItemIcon>
                            <ListItemText primary="Tabela Gatunek" />
                        </ListItem>
                        <ListItem button component={RouterLink} to="/admin/platforma" onClick={handleClose}>
                            <ListItemIcon><GamepadIcon/></ListItemIcon>
                            <ListItemText primary="Tabela Platforma" />
                        </ListItem>
                        <ListItem button component={RouterLink} to="/admin/seria_gier" onClick={handleClose}>
                            <ListItemIcon><ListIcon/></ListItemIcon>
                            <ListItemText primary="Tabela Seria gier" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button component={RouterLink} to="/admin/recenzja" onClick={handleClose}>
                            <ListItemIcon><CommentIcon/></ListItemIcon>
                            <ListItemText primary="Tabela Recenzja" />
                        </ListItem>
                        <ListItem button component={RouterLink} to="/admin/uzytkownik" onClick={handleClose}>
                            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                            <ListItemText primary="Tabela Użytkownik" />
                        </ListItem>
                    </List>
                </Drawer>
            </>
        )
    );

    const authBar = (
        authenticated ? (
            <>
                {decodedToken && (
                <Tooltip title="Twoja lista">
                    <IconButton aria-label="gamelist" color="inherit" component={RouterLink} to={`/uzytkownik/lista/${decodedToken.id_uzytkownik}`}>
                        <ListAltIcon />
                    </IconButton>
                </Tooltip>
                )}
            </>    
        ) : ""
    )

    const login = (
        authenticated ?
        (<Tooltip title="Wyloguj się">
            <IconButton aria-label="logout" color="inherit" onClick={unauthenticate} component={RouterLink} to="/">
                <KeyboardReturnIcon />
            </IconButton>
        </Tooltip>) :
        (<Tooltip title="Zaloguj się">
            <IconButton aria-label="login" color="inherit" component={RouterLink} to={"/login"}>
                <AccountCircleIcon />
            </IconButton>
        </Tooltip>)
    )

    return (
        <AppBar position="static">
            <Toolbar>
                <Box className={classes.title}>
                    <Grid container justift="center" alignItems="center">
                        <Grid item>
                            <Button color="inherit" to="/" component={RouterLink} startIcon={<AlbumIcon />} >
                            {decodedToken && decodedToken.imie ? `Witaj w GRAWEB, ${decodedToken.imie}` : "GRAWEB"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box mx={2}>
                    <Tooltip title="Gry">
                        <IconButton aria-label="games" color="inherit" component={RouterLink} to={"/gry"}>
                            <SportsEsportsIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Top 10 gier">
                        <IconButton aria-label="topgames" color="inherit" component={RouterLink} to={"/gry/top/10"}>
                            <PollIcon />
                        </IconButton>
                    </Tooltip>
                    {authBar}
                </Box>
                <Box mx={3}>
                    <form onSubmit={handleSearchSubmit}>
                        <Grid container justift="center" alignItems="center">
                                <Grid item sm={9}>
                                    <TextField
                                        name="tytul"
                                        type="text"
                                        placeholder="Szukaj..."
                                        fullWidth
                                        value={szukanaGra}
                                        onChange={handleChange}
                                        InputProps={{
                                            className: classes.textField
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Szukaj gier">
                                        <span>
                                        <IconButton aria-label="search" type="submit" color="inherit" disabled={!szukanaGra || szukanaGra === ""}>
                                            <SearchIcon />
                                        </IconButton>
                                        </span>
                                    </Tooltip>
                                </Grid>
                        </Grid>
                    </form>
                </Box>
                <Box mx={2}>
                    {login}
                </Box>
                <Box>
                    <Tooltip title={darkmode ? "Włącz tryb jasny" : "Włącz tryb ciemny"}>
                        <IconButton
                            color="inherit"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleDarkmodeChange}
                        >
                            {darkmode ? <DarknessIcon /> : <BrightnessIcon />}
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box ml={2}>
                    {adminBar}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default withRouter(NavBar);