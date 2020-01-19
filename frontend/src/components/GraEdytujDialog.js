import React, { useState, useEffect } from 'react'

import fetchData from '../utils/fetchData';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import DetaleSelect from './DetaleSelect';

function GraEdytujDialog(props) {
    const { onClose, open } = props;

    const [statusy, setStatusy] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gra, setGra] = useState(props.gra);

    useEffect(() => {
        setLoading(true);
        fetchData('GET', 'uzytkownik/lista/statusy', (json) => {
            setStatusy(json);
            setLoading(false);
        });
    }, [])

    const handleSubmit = () => {
        fetchData('PUT', 'uzytkownik/lista', (json) => {
            console.log(json);
            handleClose();
        }, (err) => {}, {
            'Content-Type': 'application/json',
            'authorization': localStorage.authToken
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

        console.log(gra);
    }

    const handleClose = () => {
        onClose(gra);
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edytuj gre</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edytuj gre na swojej liście...
                </DialogContentText>  
                <TextField
                    name="ocena"
                    type="text"
                    label="Ocena"
                    placeholder="0-10"
                    margin="normal"
                    fullWidth
                    required
                    onChange={handleChange}
                    value={gra.ocena}
                />  
                <TextField
                    name="data_rozpoczecia"
                    label="Data rozpoczęcia"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    fullWidth
                    required
                    onChange={handleChange}
                    value={gra.data_rozpoczecia}
                />
                <TextField
                    name="data_ukonczenia"
                    label="Data ukończenia"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    fullWidth
                    required
                    onChange={handleChange}
                    value={gra.data_ukonczenia}
                />
                <DetaleSelect 
                    label="Status"
                    id_name="id_status_gry"
                    db_id_name="id_status_gry"
                    name="status"
                    value={gra.id_status_gry}
                    detale={statusy}
                    loading={loading}
                    handleChange={handleChange}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Anuluj
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Edytuj
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default GraEdytujDialog
