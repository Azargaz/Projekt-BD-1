import React from 'react'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    ...theme.styles
}));

function StronaGlowna() {
    const classes = useStyles();

    return (
        <Grid container justify="center">
            <Grid item sm={8}>
                <Typography variant="h3" className={classes.header}>
                    Strona główna
                </Typography>
                <Paper>
                    
                </Paper>
            </Grid>
        </Grid>
    )
}

export default StronaGlowna
