import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import fetchData from '../../utils/fetchData';

import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    ...theme.styles
}));

function GraTable() {
    const classes = useStyles();
    const [gry, setGry] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchGry = () => {
        setLoading(true);
        fetchData('GET', 'gra', (json) => {
            setGry(json);
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchGry();
    }, []);

    const table = loading ? (
        <CircularProgress/>
    ) : (
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="right">Tytuł</TableCell>
                    <TableCell align="right">Data wydania</TableCell>
                    <TableCell align="right">Kategoria wiekowa</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {gry.map((gra, index) => (
                    <TableRow hover key={gra.id_gra}>
                        <TableCell component="th" scope="row">{index+1}</TableCell>
                        <TableCell align="right"><Link to={"/gra/" + gra.id_gra} variant="body1" color="inherit" component={RouterLink}>{gra.tytul}</Link></TableCell>
                        <TableCell align="right">{new Date(gra.data_wydania).toLocaleDateString("pl-PL")}</TableCell>
                        <TableCell align="right">{gra.kategoria_wiekowa}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
    )

    return (
        <>
            {table}
        </>
    )
}

export default GraTable;