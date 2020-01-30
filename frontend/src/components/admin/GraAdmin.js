import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import TabPanel from '../input/TabPanel';

import GraForm from './GraForm';
import GraTable from './GraTable';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    header: {
        margin: 15
    },
    form: {
        marginTop: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(2)
    },
}));

function GraAdmin() {
    const classes = useStyles();
    const [tab, setTab] = useState(0);

    const handleTabChange = (event, newTab) => {
        setTab(newTab);
    };

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item sm={8}>
                <Typography variant="h3" className={classes.header}>
                    Tabela Gra
                </Typography>
                <Paper>
                    <Tabs value={tab} onChange={handleTabChange} aria-label="table tabs" variant="fullWidth">
                        <Tab label="Wyświetl" />
                        <Tab label="Dodaj" />
                    </Tabs>
                    <TabPanel value={tab} index={0}>
                        <Grid container justify="center" alignItems="center">
                            <Grid item sm={8}>
                                <GraTable />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <Grid container justify="center" alignItems="center">
                            <Grid item sm={8}>
                                <GraForm />
                            </Grid>
                        </Grid>
                    </TabPanel>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default GraAdmin