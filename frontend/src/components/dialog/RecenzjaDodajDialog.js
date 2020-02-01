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

function RecenzjaDodajDialog(props) {
    const { recenzowanaGra, onClose, onCancel, open } = props;
    const { token } = useContext(AuthContext);

    const [recenzja, setRecenzja] = useState({
        tekst: "",
        ocena: ""
    });

    useEffect(() => {
        setRecenzja({
            ...recenzja,
            ocena: recenzowanaGra.ocena
        })
    }, [recenzowanaGra]);

    const handleSubmit = () => {

        fetchData('POST', 'recenzje/gra/' + recenzowanaGra.id_gra, (json) => {
            onClose(recenzja);
        }, (err) => {}, {
            'Content-Type': 'application/json',
            'authorization': token
        }, JSON.stringify({
            ...recenzja,
            data: new Date()
        }));
    }

    const handleChange = (event) => {
        setRecenzja({
            ...recenzja,
            [event.target.name]: event.target.value
        });
    }

    return (
        <Dialog open={open} onClose={onCancel} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
            <DialogTitle id="form-dialog-title">{recenzowanaGra.tytul}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Napisz recenzje gry
                </DialogContentText>  
                <TextField
                    name="ocena"
                    type="text"
                    label="Ocena"
                    placeholder="0-10"
                    margin="normal"
                    fullWidth
                    onChange={handleChange}
                    value={recenzja.ocena ? recenzja.ocena : ""}
                />
                <TextField
                    name="tekst"
                    type="text"
                    label="Recenzja"
                    placeholder="Tutaj wpisz tekst recenzji..."
                    margin="normal"
                    fullWidth
                    multiline
                    rows={3}
                    onChange={handleChange}
                    value={recenzja.tekst}
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

export default RecenzjaDodajDialog
