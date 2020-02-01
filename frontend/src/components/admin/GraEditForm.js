import React, { useState, useEffect, useContext } from 'react'

import { makeStyles } from '@material-ui/core';

import { AuthContext } from '../../utils/Auth';
import fetchData from '../../utils/fetchData';

import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import MuiDatePicker from '../input/MuiDatePicker';
import DetaleSelect from '../input/DetaleSelect';
import DetaleCheckboxList from '../input/DetaleCheckboxList';
import Alert from '../Alert';

const useStyles = makeStyles(theme => ({
    ...theme.styles
}));

function GraEditForm(props) {
    const { onSubmit } = props;

    const classes = useStyles();
    const { token } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [gry, setGry] = useState([]);
    const [errors, setErrors] = useState(null);
	const [open, setOpen] = useState(false);

    const [editGra, setEditGra] = useState({
        id_gra: "",
        tytul: "",
        opis: "",
        data_wydania: null,
        kategoria_wiekowa: "",
        id_seria: ""
    });
    
	const [detaleGry, setDetaleGry] = useState({
		gatunki: [],
		wydawcy: [],
		producenci: [],
		platformy: []
	});

	const [wszystkieDetale, setWszystkieDetale] = useState({
		firmy: [],
		gatunki: [],
		platformy: [],
		serie: []
    });

	const handleErrors = () => {
		if(errors)
			setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    const fetchDetale = () => {
		fetchData('GET', 'gra/detale', json => {
			setWszystkieDetale(json);
		});
    };
    
    const fetchDetaleGry = () => {
		fetchData('GET', 'gra/detale/json/' + editGra.id_gra, json => {
            Object.entries(json).map(([key, value]) => json[key] = value.map(detal => Object.entries(detal)[0][1]));
            setDetaleGry(json);
		});
	};

    const fetchGry = () => {
        setLoading(true);
        fetchData('GET', 'gra', (json) => {
            setGry(json);
            setLoading(false);
        }, (err) => {},
        {
            Authorization: token
        });
    }
    
    useEffect(() => {
        fetchGry();
        fetchDetale();
    }, [])

    useEffect(() => {
        if(editGra.id_gra !== "")
            fetchDetaleGry();
    }, [editGra])

    const handleSelectChange = (event) => {
        const id = event.target.value;
        const selectGra = gry.filter(gra => gra.id_gra === id)[0];
        if(selectGra) {
            setEditGra(selectGra);
        }
    }

    const handleEditChange = (event) => {
        setEditGra({
            ...editGra,
            [event.target.name]: event.target.value
        })
    }

    const handleEditSubmit = (event) => {
        event.preventDefault();

        const walidacjaDetali = Object.keys(detaleGry).filter(key => {
			return detaleGry[key].length > 0;
        })
        
        if(editGra.id_gra === "") {
            setErrors({
				msg: "Proszę wybrać grę do edytowania."
			});
			handleErrors();
			return;
        }

		if(walidacjaDetali.length < 4 || editGra.id_gra === "") {
			setErrors({
				msg: "Proszę wybrać wszystkie detale gry."
			});
			handleErrors();
			return;
        }
        
        fetchData('PUT', 'admin/gra', (json) => {
            onSubmit();
        }, (err) => {}, {
            'Content-Type': 'application/json',
            Authorization: token
        },
        JSON.stringify({
            gra: editGra,
            detale: detaleGry
        }));
    }

    const handleDelete = () => {
        if(editGra.id_gra === "")
            return;
        
        fetchData('DELETE', `admin/gra/${editGra.id_gra}`, (json) => {
            onSubmit();
        }, (err) => {}, {
            Authorization: token
        });
    }

    const handleDateChange = (date, name) => {
        setEditGra({
            ...editGra,
            [name]: date
        });
    }

    const handleChangeDetale = (id, nazwa) => {
        const index = detaleGry[nazwa].indexOf(id);
        if(index !== -1) {
            setDetaleGry({
                ...detaleGry,
                [nazwa]: [
                    ...detaleGry[nazwa].slice(0, index),
                    ...detaleGry[nazwa].slice(index+1)
                ]
            })
        } else {
            setDetaleGry({
                ...detaleGry,
                [nazwa]: [
                    ...detaleGry[nazwa],
                    id
                ]
            })
        }
	};

    const edit = (
        <form className={classes.form} onSubmit={handleEditSubmit}>
            <DetaleSelect 
                label="Wybierz gre *"
                id_name="id_gra"
                db_id_name="id_gra"
                name="tytul"
                value={editGra.id_gra}
                detale={gry}
                loading={loading}
                handleChange={handleSelectChange}
            />
            <TextField
                name="tytul"
                type="text"
                label="Tytuł"
                placeholder="Tytuł"
                margin="normal"
                fullWidth
                required
                onChange={handleEditChange}
                value={editGra.tytul}
            />
            <TextField
                name="opis"
                type="text"
                label="Opis"
                placeholder="Opis"
                margin="normal"
                fullWidth
                multiline
                rows={3}
                onChange={handleEditChange}
                value={editGra.opis ? editGra.opis : ""}
            />
            <MuiDatePicker 
                name="data_wydania"
                label="Data wydania"
                onChange={handleDateChange}
                value={editGra.data_wydania}
                required
            />
            <TextField
                name="kategoria_wiekowa"
                type="text"
                label="Kategoria wiekowa"
                placeholder="Kategoria wiekowa"
                margin="normal"
                fullWidth
                required
                onChange={handleEditChange}
                value={editGra.kategoria_wiekowa}
            />

            <DetaleSelect 
                label="Seria gier"
                id_name="id_seria"
                db_id_name="id_seria"
                name="tytul"
                value={editGra.id_seria ? editGra.id_seria : ""}
                detale={wszystkieDetale.serie}
                handleChange={handleEditChange}
                required
            />

            <br />
            <br />
            <Typography variant="caption" color="textSecondary">
                Detale gry *
            </Typography>
            <Grid
                container
                justify="center"
                alignItems="center"
            >
                <Grid item>
                    <DetaleCheckboxList
                        nazwa="gatunki"
                        label="Gatunki"
                        id_name="id_gatunek"
                        nazwa_name="nazwa"
                        wszystkieDetale={wszystkieDetale.gatunki}
                        zaznaczoneDetale={detaleGry.gatunki}
                        handleChange={handleChangeDetale}
                    />
                </Grid>
                <Grid item>
                    <DetaleCheckboxList
                        nazwa="wydawcy"
                        label="Wydawcy"
                        id_name="id_firma"
                        nazwa_name="nazwa"
                        wszystkieDetale={wszystkieDetale.firmy}
                        zaznaczoneDetale={detaleGry.wydawcy}
                        handleChange={handleChangeDetale}
                    />
                </Grid>
                <Grid item>
                    <DetaleCheckboxList
                        nazwa="producenci"
                        label="Producenci"
                        id_name="id_firma"
                        nazwa_name="nazwa"
                        wszystkieDetale={wszystkieDetale.firmy}
                        zaznaczoneDetale={detaleGry.producenci}
                        handleChange={handleChangeDetale}
                    />
                </Grid>
                <Grid item>
                    <DetaleCheckboxList
                        nazwa="platformy"
                        label="Platformy"
                        id_name="id_platforma"
                        nazwa_name="nazwa"
                        wszystkieDetale={wszystkieDetale.platformy}
                        zaznaczoneDetale={detaleGry.platformy}
                        handleChange={handleChangeDetale}
                    />
                </Grid>
            </Grid>
            <br />

            <Button variant="contained" color="primary" type="submit" className={classes.button}>
                Aktualizuj
            </Button>
            <Button variant="contained" color="secondary" className={classes.button} onClick={handleDelete}>
                Usuń
            </Button>
        </form>
    )

    return (
        <>
            {edit}
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}>
				<Alert severity="error">
					{errors ? errors.msg : ''}
				</Alert>
			</Snackbar>
        </>
    )
}

export default GraEditForm
