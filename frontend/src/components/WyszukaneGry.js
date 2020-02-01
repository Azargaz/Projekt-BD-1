import React, { useEffect, useState } from 'react'
import fetchData from '../utils/fetchData';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    ...theme.styles
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function WyszukaneGry(props) {
    const classes = useStyles();
    const { tytul } = props.match.params;

    const [loading, setLoading] = useState(true);
    const [wyszukaneGry, setWyszukaneGry] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetchData('POST', 'gra/tytul', (json) => {
            setWyszukaneGry(json);
            setLoading(false);
        }, (err) => {setLoading(false);},
        {
            'Content-Type': 'application/json'
        },
        JSON.stringify({
            tytul: atob(tytul)
        }))
    }, [tytul]);

    const licznikGier = (liczba) => {
        if(liczba === 1) return 'gre'
        else if([2, 3, 4].includes(liczba)) return 'gry'
        else return 'gier'
    }

    const znalezioneGry = wyszukaneGry.length > 0 ? 
        (
            <div>
                <Typography variant="h3" className={classes.header}>
                    Znaleziono {wyszukaneGry.length} {licznikGier(wyszukaneGry.length)}
                </Typography>
                <Paper>
                    <List>
                        {wyszukaneGry.map(gra => (
                            <ListItemLink key={gra.id_gra} href={`#/gra/${gra.id_gra}`}>
                                {gra.tytul}
                            </ListItemLink>
                        ))}
                    </List>
                </Paper>
            </div>
        ) : (
            <Typography variant="h4" className={classes.header}>
                Nie znaleziono gier...
            </Typography>
        )

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item sm={6}>
                {loading ? <CircularProgress /> : znalezioneGry}
            </Grid>
        </Grid>
    )
}

export default WyszukaneGry
