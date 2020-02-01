import React, { useState, useEffect, useContext } from 'react';

import fetchData from '../../utils/fetchData';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import MuiDatePicker from '../input/MuiDatePicker';
import DetaleCheckboxList from '../input/DetaleCheckboxList';
import DetaleSelect from '../input/DetaleSelect';
import Alert from '../Alert';

import { AuthContext } from '../../utils/Auth';

const useStyles = makeStyles(theme => ({
	...theme.styles
}));

function GraForm(props) {
	const { onSubmit } = props;

    const classes = useStyles();
    const { token } = useContext(AuthContext);
	const [open, setOpen] = useState(false);
	const [gra, setGra] = useState({
		tytul: '',
		opis: '',
		data_wydania: null,
		kategoria_wiekowa: '',
		id_seria: null
	});
	const [detale, setDetale] = useState({
		gatunki: [],
		wydawcy: [],
		producenci: [],
		platformy: []
	});

	const [fetchedDetails, setFetchedDetails] = useState({
		firmy: [],
		gatunki: [],
		platformy: [],
		serie: []
    });
    
	const [errors, setErrors] = useState([]);

	const fetchDetails = () => {
		fetchData('GET', 'gra/detale', json => {
			setFetchedDetails(json);
		});
	};

	useEffect(() => {
		fetchDetails();
	}, []);

	const clearForm = () => {
		setGra({
			tytul: '',
			opis: '',
			data_wydania: null,
			kategoria_wiekowa: '',
			id_seria: null
		});

		setDetale({
            gatunki: [],
            wydawcy: [],
            producenci: [],
            platformy: []
		});
	};

	const handleErrors = () => {
		if(errors)
			setOpen(true);
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleSubmit = async event => {
		event.preventDefault();

		const walidacjaDetali = Object.keys(detale).filter(key => {
			return detale[key].length > 0;
		})

		if(walidacjaDetali.length < 4) {
			setErrors({
				msg: "Proszę wybrać wszystkie detale gry."
			});
			handleErrors();
			return;
		}

		fetchData('POST', 'admin/gra', json => {
				setOpen(true);
				clearForm();
				onSubmit();
			},
			err => {},
			{
                'Content-Type': 'application/json',
                Authorization: token
			},
			JSON.stringify({
				gra,
				detale
			})
		);
	};

	const handleChangeGra = event => {
		setGra({
			...gra,
			[event.target.name]: event.target.value
		});
    };
    
    const handleDateChange = (date, name) => {
        setGra({
            ...gra,
            [name]: date
        });
    }

	const handleChangeDetale = (id, nazwa) => {
        const index = detale[nazwa].indexOf(id);
        if(index !== -1) {
            setDetale({
                ...detale,
                [nazwa]: [
                    ...detale[nazwa].slice(0, index),
                    ...detale[nazwa].slice(index+1)
                ]
            })
        } else {
            setDetale({
                ...detale,
                [nazwa]: [
                    ...detale[nazwa],
                    id
                ]
            })
        }
	};

	return (
		<>
			<form className={classes.form} onSubmit={handleSubmit}>
				<TextField
					name="tytul"
					type="text"
					label="Tytuł"
					placeholder="Tytuł"
					margin="normal"
					fullWidth
					required
					onChange={handleChangeGra}
					value={gra.tytul}
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
					onChange={handleChangeGra}
					value={gra.opis}
				/>
				<MuiDatePicker 
					name="data_wydania"
					label="Data wydania"
					onChange={handleDateChange}
					value={gra.data_wydania}
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
					onChange={handleChangeGra}
					value={gra.kategoria_wiekowa}
				/>
                <DetaleSelect 
                    label="Seria gier"
                    id_name="id_seria"
                    db_id_name="id_seria"
                    name="tytul"
                    value={gra.id_seria ? gra.id_seria : ""}
                    detale={fetchedDetails.serie}
                    handleChange={handleChangeGra}
                    required
                />

				<br />
				<br />
				<Typography variant="caption" color="textSecondary">
					Detale gry *
				</Typography>
				<Grid container justify="center">
					<Grid item>
						<DetaleCheckboxList
							nazwa="gatunki"
							label="Gatunki"
							id_name="id_gatunek"
							nazwa_name="nazwa"
							wszystkieDetale={fetchedDetails.gatunki}
							zaznaczoneDetale={detale.gatunki}
							handleChange={handleChangeDetale}
						/>
					</Grid>
					<Grid item>
						<DetaleCheckboxList
							nazwa="wydawcy"
							label="Wydawcy"
							id_name="id_firma"
							nazwa_name="nazwa"
							wszystkieDetale={fetchedDetails.firmy}
							zaznaczoneDetale={detale.wydawcy}
							handleChange={handleChangeDetale}
						/>
					</Grid>
					<Grid item>
						<DetaleCheckboxList
							nazwa="producenci"
							label="Producenci"
							id_name="id_firma"
							nazwa_name="nazwa"
							wszystkieDetale={fetchedDetails.firmy}
							zaznaczoneDetale={detale.producenci}
							handleChange={handleChangeDetale}
						/>
					</Grid>
					<Grid item>
						<DetaleCheckboxList
							nazwa="platformy"
							label="Platformy"
							id_name="id_platforma"
							nazwa_name="nazwa"
							wszystkieDetale={fetchedDetails.platformy}
							zaznaczoneDetale={detale.platformy}
							handleChange={handleChangeDetale}
						/>
					</Grid>
				</Grid>
				<br />

				<Button
					variant="contained"
					color="primary"
					type="submit"
					className={classes.button}>
					Wyślij
				</Button>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={clearForm}>
					Reset
				</Button>
			</form>
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
	);
}

export default GraForm;
