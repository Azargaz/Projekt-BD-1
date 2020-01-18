const router = require('express').Router()

const db = require('./polaczenie')
const auth = require('../utils/authorization')

router.get('/', (req, res) => {
    db.query('SELECT * FROM projekt.recenzja')
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

router.get('/ostatnie', (req, res) => {

})

router.get('/uzytkownik/:id_uzytkownik', (req, res) => {
    const { id_uzytkownik } = req.params;

    db.query("SELECT * FROM recenzje_uzytkownicy WHERE id_uzytkownik = $1", [id_uzytkownik])
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

router.get('/gra/:id_gra', (req, res) => {
    const { id_gra } = req.params;

    db.query("SELECT * FROM recenzje_gry WHERE id_gra = $1", [id_gra])
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

router.post('/gra/:id_gra', auth, (req, res) => {
    const { id_uzytkownik } = req.user;
    const { id_gra } = req.params;
    const { tekst, data, ocena } = req.body;
    
    db.query('INSERT INTO projekt.recenzja VALUES ($1, $2, $3, $4, $5)', [id_uzytkownik, id_gra, tekst, data, ocena])
        .then(result => {
            res.status(201).json({
                status: "ok"
            })
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