import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

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
}));

function NavBar() {
    const classes = useStyles();
    const { authenticated, unauthenticate, decodedToken } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const adminBar = (
        (decodedToken && decodedToken.admin === true) && (
            <React.Fragment>
                <IconButton
                    color="inherit"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem component={Link} to="/admin/gra" onClick={handleClose}>Tabela Gra</MenuItem>
                </Menu>
            </React.Fragment>
        )
    );

    const authBar = (
        authenticated ? (
            <React.Fragment>
                {decodedToken.id_uzytkownik && (<Button color="inherit" component={Link} to={`/uzytkownik/${decodedToken.id_uzytkownik}/lista`}>Lista gier</Button>)}
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