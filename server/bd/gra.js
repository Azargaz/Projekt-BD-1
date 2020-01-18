const router = require('express').Router()

const db = require('./polaczenie')

const detale = require('./detale');

router.use('/detale', detale);

// SELECT wszystkich gier
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

// SELECT jednej gry o wybranym id
router.get('/:id_gra', (req, res) => {
    const { id_gra } = req.params;

    db.query('SELECT * FROM projekt.gra WHERE id_gra=$1', [id_gra])
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

// SELECT :liczba_gier najlepszych gier
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

// SELECT gry o tytule zawierającym tytul z ciała żądania
router.post('/tytul', (req, res) => {
    const { tytul } = req.body;

    console.log(tytul);

    db.query("SELECT * FROM projekt.gra WHERE LOWER(tytul) LIKE $1", [`%${tytul.toLowerCase()}%`])
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

// SELECT :liczba_gier najnowszych gier
router.get('/najnowsze/:liczba_gier', (req, res) => {
    const { liczba_gier } = req.params;

    db.query('SELECT * FROM projekt.najnowsze_gry_limit($1)', [liczba_gier])
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