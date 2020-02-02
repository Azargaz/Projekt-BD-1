/**
 * Modułu Gra, zawiera funkcje obsługujące gry
 * @module bd/gra
 */

const router = require('express').Router()

const db = require('./polaczenie')

/**
 * Moduł związany z detalami gier
 * @see module:bd/gra/detale
 * @name detale
 */
const detale = require('./detale');

router.use('/detale', detale);

/**
 * SELECT wszystkich gier
 * @name gra/ get
 * @function
 */
router.get('/', (req, res) => {
    db.query('SELECT * FROM projekt.gra')
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
 * SELECT jednej gry o wybranym id
 * @name gra/:id_gra get
 * @function
 */
router.get('/:id_gra', (req, res) => {
    const { id_gra } = req.params;

    db.query(`SELECT g.id_gra, g.tytul, g.opis, g.data_wydania, g.kategoria_wiekowa, sg.tytul as seria 
                FROM projekt.gra g LEFT JOIN projekt.seria_gier sg USING(id_seria)
                WHERE id_gra=$1`, 
        [id_gra])
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
 * SELECT :liczba_gier najlepszych gier
 * @name gra/top/:liczba_gier get
 * @function
 */
router.get('/top/:liczba_gier', (req, res) => {
    const { liczba_gier } = req.params;

    db.query('SELECT * FROM projekt.najlepsze_gry_limit($1)', [liczba_gier])
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
 * SELECT gry o tytule zawierającym 'tytul' z ciała żądania.
 * <br><br>
 * Tytuł szukanej gry jest przesyłany w ciele POST zamiast jako QueryString, ponieważ wtedy mamy pewność,
 * że nie będzie problemów ze znakami specjalnymi jak np. '/'
 * @name gra/tytul post
 * @function
 */
router.post('/tytul', (req, res) => {
    const { tytul } = req.body;

    db.query("SELECT * FROM projekt.gra WHERE LOWER(tytul) LIKE $1", [`${tytul.toLowerCase()}%`])
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

module.exports = router