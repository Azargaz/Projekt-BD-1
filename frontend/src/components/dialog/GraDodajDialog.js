import React, { useState, useEffect, useContext } from 'react'

import fetchData from '../../utils/fetchData';
import { AuthContext } from '../../utils/Auth';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import DetaleSelect from '../input/DetaleSelect';
import MuiDatePicker from '../input/MuiDatePicker';

function GraDodajDialog(props) {
    const { onClose, onCancel, open, dodawanaGra, statusy } = props;
    const { token } = useContext(AuthContext);

    const [gra, setGra] = useState(dodawanaGra);

    useEffect(() => {
        setGra(dodawanaGra);
    }, [dodawanaGra])

    const handleSubmit = () => {
        fetchData('POST', 'uzytkownik/lista', (json) => {
            onClose(gra);
        }, (err) => {}, {
            'Content-Type': 'application/json',
            'authorization': token
        }, JSON.stringify({
            id_gra: gra.id_gra,
            id_status: gra.id_status_gry,
            ocena: gra.ocena,
            data_rozpoczecia: gra.data_rozpoczecia,
            data_ukonczenia: gra.data_ukonczenia
        }));
    }

    const handleChange = (event) => {
        setGra({
            ...gra,
            [event.target.name]: event.target.value
        });
    }

    const handleDateChange = (date, name) => {
        setGra({
            ...gra,
            [name]: date
        });
    }

    return (
        <Dialog open={open} onClose={onCancel} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{gra.tytul}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Dodaj gre do swojej listy...
                </DialogContentText>  
                <TextField
                    name="ocena"
                    type="text"
                    label="Ocena"
                    placeholder="0-10"
                    margin="normal"
                    fullWidth
                    onChange={handleChange}
                    value={gra.ocena ? gra.ocena : ""}
                />  
                <MuiDatePicker
                    name="data_rozpoczecia"
                    label="Data rozpoczęcia"
                    onChange={handleDateChange}
                    value={gra.data_rozpoczecia}
                />
                <MuiDatePicker
                    name="data_ukonczenia"
                    label="Data ukończenia"
                    onChange={handleDateChange}
                    value={gra.data_ukonczenia}
                />
                <DetaleSelect 
                    label="Status"
                    id_name="id_status_gry"
                    db_id_name="id_status_gry"
                    name="status"
                    value={gra.id_status_gry ? gra.id_status_gry : ""}
                    detale={statusy}
                    handleChange={handleChange}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Anuluj
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Dodaj
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default GraDodajDialog
