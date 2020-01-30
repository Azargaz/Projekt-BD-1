import React, { useState, useEffect, useContext } from 'react';

import fetchData from '../../utils/fetchData';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

import MuiDatePicker from '../input/MuiDatePicker';
import DetaleCheckboxList from '../input/DetaleCheckboxList';
import DetaleSelect from '../input/DetaleSelect';

import { AuthContext } from '../../utils/Auth';

const useStyles = makeStyles(theme => ({
	form: {
		marginTop: theme.spacing(1)
	},
	button: {
		margin: theme.spacing(2)
	},
	header: {
		margin: 15
	}
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function GraForm() {
    const classes = useStyles();
    const { token } = useContext(AuthContext);
	const [open, setOpen] = useState(false);
	const [gra, setGra] = useState({
		tytul: '',
		opis: '',
		data_wydania: null,
		kategoria_wiekowa: '',
		id_seria: ''
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
	const [loading, setLoading] = useState(false);

	const fetchDetails = () => {
		setLoading(true);
		fetchData('GET', 'gra/detale', json => {
			setFetchedDetails(json);
			setLoading(false);
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
			id_seria: ''
		});

		setDetale({
            gatunki: [],
            wydawcy: [],
            producenci: [],
            platformy: []
		});
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleSubmit = async event => {
		event.preventDefault();

		Object.keys(detale).forEach(key => {
			if(detale[key].length <= 0) return;
		})

		fetchData(
			'POST',
			'admin/gra',
			json => {
				console.log(json);
				setOpen(true);
				clearForm();
			},
			err => {
				setErrors([...errors, err]);
			},
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

				<Grid
					container
					justify="center"
					alignItems="center"
				>
					<Grid item sm={3}>
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
					<Grid item sm={3}>
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
					<Grid item sm={3}>
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
					<Grid item sm={3}>
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
					color="secondary"
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
				autoHideDuration={5000}
				onClose={handleClose}
				message="Dodano gre"
				action={
					<IconButton
						size="small"
						aria-label="close"
						color="inherit"
						onClick={handleClose}>
						<CloseIcon fontSize="small" />
					</IconButton>
				}
			/>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				open={errors.length > 0}
				autoHideDuration={5000}
				onClose={handleClose}>
				<Alert severity="error">
					{/* {errors.length > 0 ? errors[errors.length - 1] : ''} */}
				</Alert>
			</Snackbar>
		</>
	);
}

export default GraForm;
