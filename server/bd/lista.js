const router = require('express').Router()

const db = require('./polaczenie')
const auth = require('../utils/authorization')

router.get('/id/:id_uzytkownik', (req, res) => {
    const { id_uzytkownik } = req.params;

    db.query("SELECT * FROM projekt.lista_uzytkownika($1)", [id_uzytkownik])
        .then(result => {
            res.status(201).json(
                result.rows
            )
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: "error",
                error: err.message
            });
        })
})

router.get('/id/:id_uzytkownik/:id_gra', (req, res) => {
    const { id_uzytkownik, id_gra } = req.params;

    db.query("SELECT * FROM projekt.gra_z_listy_uzytkownika($1, $2)", [id_uzytkownik, id_gra])
        .then(result => {
            if(result.rows.length > 0) {
                res.status(201).json(
                    result.rows[0]
                )
            } else {
                res.status(201).json({});
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: "error",
                error: err.message
            });
        })
})

router.get('/statusy', (req, res) => {
    db.query("SELECT * FROM projekt.status_gry")
        .then(result => {
            res.status(201).json(
                result.rows
            )
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: "error",
                error: err.message
            });
        })
})

router.post('/', auth, (req, res) => {
    const { id_uzytkownik } = req.user;
    const { id_gra, id_status, ocena, data_rozpoczecia, data_ukonczenia } = req.body;

    db.query("SELECT * FROM projekt.dodaj_gre_do_listy($1, $2, $3, $4, $5, $6)", [id_uzytkownik, id_gra, id_status, ocena, data_rozpoczecia, data_ukonczenia])
        .then(result => {
            res.status(201).json(
                result.rows[0]
            )
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: "error",
                error: err.message
            });
        })
})

router.put('/', auth, (req, res) => {
    const { id_uzytkownik } = req.user;
    const { id_gra, id_status, ocena, data_rozpoczecia, data_ukonczenia } = req.body;

    db.query("SELECT * FROM projekt.edytuj_gre_z_listy($1, $2, $3, $4, $5, $6)", [id_uzytkownik, id_gra, id_status, ocena, data_rozpoczecia, data_ukonczenia])
        .then(result => {
            res.status(201).json(
                result.rows[0]
            )
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: "error",
                error: err.message
            });
        })
})

router.delete('/', auth, (req, res) => {
    const { id_uzytkownik } = req.user;
    const { id_gra } = req.body;

    db.query("SELECT * FROM projekt.usun_gre_z_listy($1, $2)", [id_uzytkownik, id_gra])
        .then(result => {
            res.status(201).json(
                result.rows[0]
            )
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: "error",
                error: err.message
            });
        })
})

module.exports = router;