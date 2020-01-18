const router = require('express').Router()

const db = require('./polaczenie')

router.get('/', (req, res) => {
    res.json({
        msg: "Hello admin!"
    })
})

// INSERT jednej gry razem z przypisaniem wydawcy, producenta, gatunku oraz platformy
router.post('/gra', async (req, res) => {
    const { tytul, opis, data_wydania, kategoria_wiekowa, id_seria } = req.body.gra
    const { id_gatunek, id_producent, id_wydawca, id_platforma } = req.body.detale
    
    const client = await db.connect()

    try {
        // Rozpoczęcie transakcji
        await client.query('BEGIN')

        let queryText = 'INSERT INTO projekt.gra(tytul, opis, data_wydania, kategoria_wiekowa, id_seria) VALUES ($1, $2, $3, $4, $5) RETURNING id_gra'
        let queryParams = [tytul, opis, data_wydania, kategoria_wiekowa, id_seria]
        let result = await client.query(queryText, queryParams)

        queryText = 'INSERT INTO projekt.gra_producent VALUES ($1, $2)'
        queryParams = [result.rows[0].id_gra, id_producent]
        await client.query(queryText, queryParams)

        queryText = 'INSERT INTO projekt.gra_wydawca VALUES ($1, $2)'
        queryParams = [result.rows[0].id_gra, id_wydawca]
        await client.query(queryText, queryParams)

        queryText = 'INSERT INTO projekt.gra_platforma VALUES ($1, $2)'
        queryParams = [result.rows[0].id_gra, id_platforma]
        await client.query(queryText, queryParams)

        queryText = 'INSERT INTO projekt.gra_gatunek VALUES ($1, $2)'
        queryParams = [result.rows[0].id_gra, id_gatunek]
        await client.query(queryText, queryParams)
        
        // Zatwierdzenie transakcji
        await client.query('COMMIT')

        res.status(201).json({
            msg: `Dodano gre o id = ${result.rows[0].id_gra}`
        })
    } catch(err) {
        // Jeśli wystąpi błąd -> cofnięcie transakcji
        await client.query('ROLLBACK')
        console.error(err);
        res.status(500).json({
            status: "error",
            error: err.message
        });
    } finally {
        client.release()
    }
})

module.exports = router