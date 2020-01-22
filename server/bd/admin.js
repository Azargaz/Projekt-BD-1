const router = require('express').Router()

const db = require('./polaczenie')

router.get('/', (req, res) => {
    res.json({
        msg: "Hello admin!"
    })
})

// INSERT jednej gry razem z przypisaniem wydawcy, producenta, gatunku oraz platformy
router.post('/gra', async (req, res) => {
    const { tytul, opis, data_wydania, kategoria_wiekowa, id_seria } = req.body.gra;
    const { gatunki, wydawcy, producenci, platformy } = req.body.detale;
    
    const client = await db.connect()

    try {
        // Rozpoczęcie transakcji
        await client.query('BEGIN')

        let queryText = 'INSERT INTO projekt.gra(tytul, opis, data_wydania, kategoria_wiekowa, id_seria) VALUES ($1, $2, $3, $4, $5) RETURNING id_gra'
        let queryParams = [tytul, opis, data_wydania, kategoria_wiekowa, id_seria]
        let result = await client.query(queryText, queryParams)
        
        // INSERT Gatunki
        queryText = 'INSERT INTO projekt.gra_gatunek VALUES '
        queryParams = [result.rows[0].id_gra]
        queryText += prepareArrayInsert(gatunki, queryParams);
        await client.query(queryText, queryParams)

        // INSERT Wydawcy
        queryText = 'INSERT INTO projekt.gra_wydawca VALUES '
        queryParams = [result.rows[0].id_gra]
        queryText += prepareArrayInsert(wydawcy, queryParams);
        await client.query(queryText, queryParams)

        // INSERT Producenci
        queryText = 'INSERT INTO projekt.gra_producent VALUES '
        queryParams = [result.rows[0].id_gra]
        queryText += prepareArrayInsert(producenci, queryParams);
        await client.query(queryText, queryParams)

        // INSERT Platformy
        queryText = 'INSERT INTO projekt.gra_platforma VALUES '
        queryParams = [result.rows[0].id_gra]
        queryText += prepareArrayInsert(platformy, queryParams);
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

const prepareArrayInsert = (array, queryParams) => {
    let queryText = "";
    for(let i = 0; i < array.length; i++) {
        queryText += '($1, ';
        queryParams.push(array[i]);
        queryText += `$${i+2})`;
        if(i+1 < array.length)
            queryText += ',';
    }
    return queryText;
}

module.exports = router