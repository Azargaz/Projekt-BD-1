import React, { useState, useEffect } from 'react';

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
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    header: {
        margin: 15
    }
});

function GraTable() {
    const classes = useStyles();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchData = () => {
        setLoading(true);
        fetch('http://localhost:3001/gra')
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                setGames(jsonData);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const table = loading ? (
        <CircularProgress/>
    ) : (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right">Tytuł</TableCell>
                    <TableCell align="right">Opis</TableCell>
                    <TableCell align="right">Data wydania</TableCell>
                    <TableCell align="right">Kat wiekowa</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {games.map(game => (
                    <TableRow hover key={game.id_gra}>
                        <TableCell component="th" scope="row">
                            {game.id_gra}
                        </TableCell>
                        <TableCell align="right">{game.tytul}</TableCell>
                        <TableCell align="right">{game.opis}</TableCell>
                        <TableCell align="right">{new Date(game.data_wydania).toLocaleDateString("pl-PL")}</TableCell>
                        <TableCell align="right">{game.kategoria_wiekowa}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
    )

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item sm={8}>
                <Typography variant="h3" className={classes.header}>
                    Gry
                </Typography>
                {table}
            </Grid>
        </Grid>
    )
}

export default GraTable;