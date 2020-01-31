import React, { useState, useEffect } from 'react'

import fetchData from '../utils/fetchData';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function Gra(props) {
    const { id_gra } = props.match.params;
    const [gra, setGra] = useState({});
    const [detale, setDetale] = useState({
        wydawcy: "",
        producenci: "",
        gatunki: "",
        platformy: ""
    })

    useEffect(() => {
        fetchData('GET', `gra/${id_gra}`, (json) => {
            setGra(json);

            fetchData('GET', `gra/detale/${id_gra}`, (json) => {
                setDetale(json);
            });
        });
    }, [id_gra])

    return (
        <Grid container justify="center" alignItems="baseline" spacing={3}>
            <Grid item sm={2}>
                <Grid container direction="column" alignItems="stretch" spacing={1}>
                    <Grid item>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {gra.tytul}
                                </Typography>
                                <Typography color="textSecondary">
                                    Data wydania: {new Date(gra.data_wydania).toLocaleDateString()}
                                </Typography>
                                <Typography color="textSecondary">
                                    Kategoria wiekowa: {gra.kategoria_wiekowa}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary">
                                    Producenci:<br/>{detale.producenci.producenci_gry}
                                </Typography>
                                <br/>
                                <Typography color="textSecondary">
                                    Wydawcy:<br/>{detale.wydawcy.wydawcy_gry}
                                </Typography>
                                <br/>
                                <Typography color="textSecondary">
                                    Gatunki:<br/>{detale.gatunki.gatunki_gry}
                                </Typography>
                                <br/>
                                <Typography color="textSecondary">
                                    Platformy:<br/>{detale.platformy.platformy_gry}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="h2">
                                    Twoja lista
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton
                                    color="inherit"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                >
                                    <AddIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={6}>
                <Typography variant="h5" component="h2">
                    Opis gry
                </Typography>
                <Typography variant="body1" align="justify">
                    {gra.opis && gra.opis !== "" ? gra.opis : "Brak opisu..."}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Gra
