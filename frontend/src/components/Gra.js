import React, { useState, useEffect, useContext } from 'react'

import fetchData from '../utils/fetchData';
import { AuthContext } from '../utils/Auth';

import GraEdytujDialog from './dialog/GraEdytujDialog';
import GraDodajDialog from './dialog/GraDodajDialog';
import GraUsunDialog from './dialog/GraUsunDialog';
import RecenzjaDodajDialog from './dialog/RecenzjaDodajDialog';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CommentIcon from '@material-ui/icons/Comment';

import Tooltip from '@material-ui/core/Tooltip';

function Gra(props) {
    const { id_gra } = props.match.params;
    const { decodedToken, authenticated, token } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const [gra, setGra] = useState({});
    const [graNaLiscie, setGraNaLiscie] = useState({
        id_gra: "",
        id_status_gry: "",
        ocena: "",
        data_rozpoczecia: "",
        data_ukonczenia: ""
    });
    const [detale, setDetale] = useState({
        wydawcy: "",
        producenci: "",
        gatunki: "",
        platformy: ""
    })
    
    const [statusy, setStatusy] = useState([]);

    const [zrecenzowana, setZrecenzowana] = useState(true);

    const [open, setOpen] = useState({
        edytuj: false,
        dodaj: false,
        usun: false,
        recenzja: false
    });

    const statusGry = (id_status) => {
        const status = statusy.filter(status => status.id_status_gry === id_status)[0];
        if(status)
            return status.status;
        else
            return "";
    }

    const fetchGraNaLiscie = () => {
        fetchData('GET', `uzytkownik/lista/id/${decodedToken.id_uzytkownik}/${id_gra}`, (json) => {
            setGraNaLiscie(json);
        });
    }

    useEffect(() => {
        setLoading(true);
        fetchData('GET', `gra/${id_gra}`, (json) => {
            setGra(json);

            fetchData('GET', `gra/detale/string/${id_gra}`, (json) => {
                setDetale(json);

                if(authenticated) {
                    fetchGraNaLiscie();
                } 
                setLoading(false);
            });

            fetchData('GET', 'uzytkownik/lista/statusy', (json) => {
                setStatusy(json);
            });

            fetchData('GET', `recenzje/uzytkownik/${id_gra}`, (json) => {
                if(json.length > 0) 
                    setZrecenzowana(true);
                else
                    setZrecenzowana(false);
            }, (err) => {},
            {
                Authorization: token
            })
        });
    }, [id_gra])

    const handleClickOpen = (name) => {
        setOpen({
            ...open,
            [name]: true
        });
    };

    const handleClose = (name) => {
        setOpen({
            ...open,
            [name]: false
        });
        fetchGraNaLiscie();
    };

    const handleDelete = () => {
        setGraNaLiscie({
            id_gra: "",
            id_status_gry: "",
            ocena: "",
            data_rozpoczecia: "",
            data_ukonczenia: ""
        });
    }

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
                                <br/>
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
                                {gra.seria ? (
                                    <>
                                        <br/>
                                        <Typography color="textSecondary">
                                            Seria gier:<br/>{gra.seria}
                                        </Typography>
                                    </>
                                ) : ""}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card>
                            <CardContent>
                                {authenticated ? (
                                    <>
                                        <Typography variant="h6" component="h2">
                                            Twoja lista
                                        </Typography>
                                        {loading ? "Ładowanie..." : graNaLiscie.id_gra && graNaLiscie.id_gra !== "" ? (
                                            <>
                                                <Typography color="textSecondary">
                                                    Status: {statusGry(graNaLiscie.id_status_gry)}
                                                </Typography>
                                                <Typography color="textSecondary">
                                                    Ocena: {!graNaLiscie.ocena || graNaLiscie.ocena === "" ? "Brak oceny" : graNaLiscie.ocena}
                                                </Typography>
                                            </>
                                        ) : (
                                            <Typography variant="body2">
                                                Nie posiadasz tej gry na swojej liście.
                                            </Typography>
                                        )}
                                    </>
                                ) : (
                                    <Typography variant="body1">
                                        Zaloguj się, aby dodać gre do listy.
                                    </Typography>
                                )}
                            </CardContent>
                            <CardActions>
                                {!authenticated || loading ? "" : graNaLiscie.id_gra ? 
                                    (<>
                                        <Tooltip title="Edytuj na swojej liście">
                                        <IconButton
                                            color="inherit"
                                            onClick={() => handleClickOpen("edytuj")}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        </Tooltip>
                                        
                                        <Tooltip title="Usuń ze swojej listy">
                                        <IconButton
                                            color="inherit"
                                            onClick={() => handleClickOpen("usun")}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                        </Tooltip>
                                        
                                        {!zrecenzowana && (
                                        <Tooltip title="Napisz recenzje">
                                        <IconButton
                                            color="inherit"
                                            onClick={() => handleClickOpen("recenzja")}
                                        >
                                            <CommentIcon fontSize="small" />
                                        </IconButton>
                                        </Tooltip>)}
                                    </>) : (
                                    <Tooltip title="Dodaj do swojej listy">
                                    <IconButton
                                        color="inherit"
                                        onClick={() => handleClickOpen("dodaj")}
                                    >
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                    </Tooltip>
                                )}
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

                <RecenzjaDodajDialog recenzowanaGra={graNaLiscie} open={open.recenzja} onClose={() => handleClose("recenzja")} onCancel={() => handleClose("recenzja")} />

                <GraEdytujDialog edytowanaGra={graNaLiscie} statusy={statusy} open={open.edytuj} onClose={() => handleClose("edytuj")} onCancel={() => handleClose("edytuj")} />
                <GraDodajDialog dodawanaGra={gra} statusy={statusy} open={open.dodaj} onClose={() => handleClose("dodaj")} onCancel={() => handleClose("dodaj")} />
                <GraUsunDialog usuwanaGra={gra} usunGre={handleDelete} open={open.usun} onClose={() => handleClose("usun")} onCancel={() => handleClose("usun")} />
            </Grid>
        </Grid>
    )
}

export default Gra
