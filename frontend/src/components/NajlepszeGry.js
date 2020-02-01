import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import fetchData from '../utils/fetchData';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    ...theme.styles
}));

function NajlepszeGry(props) {
    const classes = useStyles();

    const { top } = props.match.params;
    const [najlepszeGry, setNajlepszeGry] = useState([]);

    const [loading, setLoading] = useState(true);

    const [ilosc, setIlosc] = useState(0);

    useEffect(() => { setIlosc(top) }, [top])

    useEffect(() => {
        setLoading(true);
        fetchData('GET', `gra/top/${ilosc}`, (json) => {
            setNajlepszeGry(json);
            setLoading(false);
        });
    }, [ilosc])

    const table = loading ? (
        <CircularProgress/>
    ) : (
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="right">Tytuł</TableCell>
                    <TableCell align="right">Średnia ocen</TableCell>
                    <TableCell align="right">Data wydania</TableCell>
                    <TableCell align="right">Kategoria wiekowa</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {najlepszeGry.map((gra, index) => (
                    <TableRow hover key={gra.id_gra}>
                        <TableCell component="th" scope="row">{index+1}</TableCell>
                        <TableCell align="right"><Link to={"/gra/" + gra.id_gra} variant="body1" color="inherit" component={RouterLink}>{gra.tytul}</Link></TableCell>
                        <TableCell align="right">{Number(gra.srednia_ocen).toFixed(2)}</TableCell>
                        <TableCell align="right">{new Date(gra.data_wydania).toLocaleDateString("pl-PL")}</TableCell>
                        <TableCell align="right">{gra.kategoria_wiekowa}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
    )

    return (
        <Grid container justify="center">
            <Grid item sm={8}>
                {loading ? <CircularProgress /> : (
                    <>
                        <Typography variant="h3" className={classes.header}>
                            Top {ilosc} najlepszych gier
                        </Typography>
                        {table}
                    </>
                )}
            </Grid>
        </Grid>
    )
}

export default NajlepszeGry
