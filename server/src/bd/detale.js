/**
 * Detale, podmoduł modułu Gra, zawiera funkcje obsługujące detale gier
 * @module bd/gra/detale
 * @see module:bd/gra
 */

const router = require('express').Router()

const db = require('./polaczenie')

/**
 * SELECT firm, platform, gatunków i serii gier
 * @name detale get
 * @function
 */
router.get('/', (req, res) => {
    let results = {};

    db.query('SELECT * FROM projekt.firma')
        .then(firma_result => {
            results = {
                ...results,
                firmy: firma_result.rows
            }
            return db.query('SELECT * FROM projekt.gatunek');
        })
        .then(gatunek_result => {
            results = {
                ...results,
                gatunki: gatunek_result.rows
            }
            return db.query('SELECT * FROM projekt.platforma');
        })
        .then(platforma_result => {
            results = {
                ...results,
                platformy: platforma_result.rows
            }
            return db.query('SELECT * FROM projekt.seria_gier');
        })
        .then(seria_gier_result => {
            results = {
                ...results,
                serie: seria_gier_result.rows
            }
            res.status(201).json(results);
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
 *  SELECT wydawców, producentów, platform i gatunków jednej gry o id_gra = :id_gra w formie łancuchów znaków np. wydawcy: 'WydawcaA, WydawcaB, WydawcaC'
 * @name detale/string/:id_gra get
 * @function
 */
router.get('/string/:id_gra', (req, res) => {
    let results = {};
    const { id_gra } = req.params;

    db.query('SELECT * FROM projekt.wydawcy_gry($1)', [id_gra])
        .then(wydawcy_result => {
            results = {
                ...results,
                wydawcy: wydawcy_result.rows[0]
            }
            return db.query('SELECT * FROM projekt.producenci_gry($1)', [id_gra]);
        })
        .then(producenci_result => {
            results = {
                ...results,
                producenci: producenci_result.rows[0]
            }
            return db.query('SELECT * FROM projekt.gatunki_gry($1)', [id_gra]);
        })
        .then(gatunek_result => {
            results = {
                ...results,
                gatunki: gatunek_result.rows[0]
            }
            return db.query('SELECT * FROM projekt.platformy_gry($1)', [id_gra]);
        })
        .then(platforma_result => {
            results = {
                ...results,
                platformy: platforma_result.rows[0]
            }
            res.status(201).json(results);
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
 * SELECT wydawców, producentów, platform i gatunków jednej gry o id_gra = :id_gra w formie tabeli zapisanyc jako JSON
 * @name detale/json/:id_gra get
 * @function
 */
router.get('/json/:id_gra', (req, res) => {
    let results = {};
    const { id_gra } = req.params;

    db.query('SELECT id_wydawca FROM projekt.wydawcy_gry WHERE id_gra=$1', [id_gra])
        .then(wydawcy_result => {
            results = {
                ...results,
                wydawcy: wydawcy_result.rows
            }
            return db.query('SELECT id_producent FROM projekt.producenci_gry WHERE id_gra=$1', [id_gra]);
        })
        .then(producenci_result => {
            results = {
                ...results,
                producenci: producenci_result.rows
            }
            return db.query('SELECT id_gatunek FROM projekt.gatunki_gry WHERE id_gra=$1', [id_gra]);
        })
        .then(gatunek_result => {
            results = {
                ...results,
                gatunki: gatunek_result.rows
            }
            return db.query('SELECT id_platforma FROM projekt.platformy_gry WHERE id_gra=$1', [id_gra]);
        })
        .then(platforma_result => {
            results = {
                ...results,
                platformy: platforma_result.rows
            }
            res.status(201).json(results);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: "error",
                error: err.message
            });
        })
})

module.exports = router