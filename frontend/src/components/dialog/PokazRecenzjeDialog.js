import React, { useEffect, useState, useContext } from 'react'
import fetchData from '../../utils/fetchData';
import { AuthContext } from '../../utils/Auth';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function PokazRecenzjeDialog(props) {
    const { recenzja, onCancel, open } = props;

    const { token } = useContext(AuthContext);

    const [daneRecenzji, setDaneRecenzji] = useState({
        tytul: "",
        login: ""
    })

    useEffect(() => {
        if(recenzja) {
            fetchData('GET', `recenzje/recenzja/${recenzja.id_uzytkownik}/${recenzja.id_gra}`, (json) => {
                setDaneRecenzji(json);
            }, (err) => {},
            {
                Authorization: token
            })
        }
    }, [recenzja]);

    return (
        <Dialog open={open} onClose={onCancel} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth>
            <DialogTitle id="form-dialog-title">Recenzja gry '{daneRecenzji.tytul}'</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Autor: {daneRecenzji.login}
                    <br/>
                    <br/>
                    {recenzja.tekst}
                </DialogContentText>  
            </DialogContent>
        </Dialog>
    )
}

export default PokazRecenzjeDialog