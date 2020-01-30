import React from 'react'

import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

function DetaleCheckboxList(props) {
    const { nazwa, id_name, nazwa_name, wszystkieDetale, zaznaczoneDetale, handleChange, label } = props;
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid item>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {label}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {wszystkieDetale && wszystkieDetale.map(detal => (
                    <MenuItem key={detal[id_name]} onClick={() => handleChange(detal[id_name], nazwa)}>
                        <ListItemIcon>
                            <Checkbox disableRipple checked={zaznaczoneDetale.indexOf(detal[id_name]) !== -1} />
                        </ListItemIcon>
                        <ListItemText primary={detal[nazwa_name]} />
                    </MenuItem>
                ))}
            </Menu>
        </Grid>
    );
}

export default DetaleCheckboxList;