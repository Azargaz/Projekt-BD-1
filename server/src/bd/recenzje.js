/**
 * Moduł Recenzje, zawiera funkcje obsługujące recenzje gier
 * @module bd/recenzje
 */

const router = require('express').Router()

const db = require('./polaczenie')
const auth = require('../utils/authorization')

/**
 * SELECT recenzji wybranej gry o :id_gra konkretnego użytkownika o :id_uzytkownik
 * @name recenzje/recenzja/:id_uzytkownik/:id_gra get
 * @function
 */
router.get('/recenzja/:id_uzytkownik/:id_gra', (req, res) => {
    const { id_uzytkownik, id_gra } = req.params;

    db.query(`SELECT u.login, g.tytul, r.tekst, r.ocena, r.data FROM projekt.recenzja r JOIN projekt.uzytkownik u USING(id_uzytkownik) JOIN projekt.gra g USING(id_gra)
            WHERE r.id_uzytkownik=$1 AND r.id_gra=$2`,
        [id_uzytkownik, id_gra])
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

/**
 * SELECT recenzji wybranej gry o :id_gra obecnie zalogowanego użytkownika (jego id_uzytkownika jest przekazane w nagłówku "Authorization" żadania, zobacz utils/authorization)
 * @see module:utils/authorization
 * @name recenzje/uzytkownik/:id_gra get
 * @function
 */
router.get('/uzytkownik/:id_gra', auth, (req, res) => {
    const { id_gra } = req.params;
    const { id_uzytkownik } = req.user;

    db.query("SELECT * FROM projekt.recenzje_uzytkownicy WHERE id_uzytkownik = $1 AND id_gra = $2", [id_uzytkownik, id_gra])
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

/**
 * SELECT wszystkich recenzji wybranej gry o :id_gra
 * @name recenzje/gra/:id_gra get
 * @function
 */
router.get('/gra/:id_gra', (req, res) => {
    const { id_gra } = req.params;

    db.query("SELECT * FROM projekt.recenzje_gry WHERE id_gra = $1", [id_gra])
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

/**
 * INSERT recenzji dla wybranej gry o :id_gra napisanej przez obecnie zalogowanego użytkownika
 * @name recenzje/gra/:id_gra post
 * @function
 */
router.post('/gra/:id_gra', auth, (req, res) => {
    const { id_gra } = req.params;
    const { id_uzytkownik } = req.user;
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