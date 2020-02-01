import React, { useState, useEffect, useContext } from 'react'

import fetchData from '../../utils/fetchData';
import { AuthContext } from '../../utils/Auth';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

function GraUsunDialog(props) {
    const { usunGre, onClose, onCancel, open, usuwanaGra } = props;
    const { token } = useContext(AuthContext);

    const [gra, setGra] = useState({});

    useEffect(() => {
        setGra(usuwanaGra);
    }, [usuwanaGra])

    const handleSubmit = () => {
        fetchData('DELETE', 'uzytkownik/lista', (json) => {
            onClose(gra);
            usunGre();
        }, (err) => {}, {
            'Content-Type': 'application/json',
            'authorization': token
        }, JSON.stringify({
            id_gra: gra.id_gra
        }));
    }

    return (
        <Dialog open={open} onClose={onCancel} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{gra.tytul}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Czy jesteś pewny że chcesz usunąć gre ze swojej listy?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Anuluj
                </Button>
                <Button onClick={handleSubmit} color="secondary">
                    Usuń
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default GraUsunDialog
