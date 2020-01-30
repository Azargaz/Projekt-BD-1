import React from 'react'

import Grid from '@material-ui/core/Grid';

import GraTable from './admin/GraTable';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    header: {
        margin: 15
    }
});

function Gry() {
    const classes = useStyles();

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item sm={8}>
                <Typography variant="h3" className={classes.header}>
                    Gry
                </Typography>
                <GraTable />
            </Grid>
        </Grid>
    )
}

export default Gry
