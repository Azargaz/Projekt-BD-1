import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

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

import { AuthContext } from '../utils/Auth';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    horizontalRuler: {
        border: "1px solid rgba(0, 0, 0, 0.2)",
    },
}));

function NavBar() {
    const classes = useStyles();
    const { authenticated, unauthenticate, decodedToken } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const adminBar = (
        (decodedToken && decodedToken.admin === true) && (
            <React.Fragment>
                <IconButton
                    color="inherit"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpen}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer open={open} onClose={handleClose} anchor="right">
                    <List>
                        <ListItem component="h2">Akcje administratora</ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button component={Link} to="/admin/gra" onClick={handleClose}>
                            <ListItemIcon><VideogameAssetIcon/></ListItemIcon>
                            <ListItemText primary="Tabela Gra" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/firma" onClick={handleClose}>
                            <ListItemIcon><BusinessCenterIcon/></ListItemIcon>
                            <ListItemText primary="Tabela Firma" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/gatunek" onClick={handleClose}>
                            <ListItemIcon><CategoryIcon/></ListItemIcon>
                            <ListItemText primary="Tabela Gatunek" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/platforma" onClick={handleClose}>
                            <ListItemIcon><GamepadIcon/></ListItemIcon>
                            <ListItemText primary="Tabela Platforma" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/seria" onClick={handleClose}>
                            <ListItemIcon><ListIcon/></ListItemIcon>
                            <ListItemText primary="Tabela Seria gier" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button component={Link} to="/admin/recenzja" onClick={handleClose}>
                            <ListItemIcon><CommentIcon/></ListItemIcon>
                            <ListItemText primary="Tabela Recenzje" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/uzytkownik" onClick={handleClose}>
                            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                            <ListItemText primary="Tabela Użytkownicy" />
                        </ListItem>
                    </List>
                </Drawer>
            </React.Fragment>
        )
    );

    const authBar = (
        authenticated ? (
            <React.Fragment>
                {decodedToken && (<Button color="inherit" component={Link} to={`/uzytkownik/lista/${decodedToken.id_uzytkownik}`}>Lista gier</Button>)}
                <Button color="inherit" onClick={unauthenticate} component={Link} to="/">Wyloguj się</Button>
            </React.Fragment>    
        ) : (
            <Button color="inherit" component={Link} to={"/login"}>Login</Button>
        )
    )

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                {
                    decodedToken && decodedToken.imie ? `Witaj w encyklopedii gier, ${decodedToken.imie}`
                    : "Encyklopedia gier komputerowych"
                }
                </Typography>
                <Button color="inherit" component={Link} to={"/gry"}>Gry</Button>
                {authBar}
                {adminBar}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;