const router = require('express').Router()

const db = require('./polaczenie')

router.get('/', (req, res) => {
    res.json({
        msg: "Hello admin!"
    })
})

// INSERT jednej gry razem z przypisaniem wydawców, producentów, gatunków oraz platform
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

// Funkcja przygotowująca zapytanie INSERT z kilkoma wierszami dodawanych danych
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

router.get('/firma', (req, res) => {
    db.query("SELECT * FROM projekt.firma")
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

router.post('/firma', (req, res) => {
    const { nazwa, siedziba, strona_www } = req.body;
    
    db.query("INSERT INTO projekt.firma(nazwa, siedziba, strona_www) VALUES ($1, $2, $3) RETURNING id_firma", [nazwa, siedziba, strona_www])
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

router.put('/firma', (req, res) => {
    const { id_firma, nazwa, siedziba, strona_www } = req.body;
    
    db.query("UPDATE projekt.firma SET nazwa=$2, siedziba=$3, strona_www=$4 WHERE id_firma=$1 RETURNING id_firma", [id_firma, nazwa, siedziba, strona_www])
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

router.delete('/firma/:id_firma', (req, res) => {
    const { id_firma } = req.params;
    
    db.query("DELETE FROM projekt.firma WHERE id_firma=$1", [id_firma])
        .then(result => {
            res.status(201).json(
                result
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

router.get('/gatunek', (req, res) => {
    db.query("SELECT * FROM projekt.gatunek")
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

router.post('/gatunek', (req, res) => {
    const { nazwa } = req.body;
    
    db.query("INSERT INTO projekt.gatunek(nazwa) VALUES ($1) RETURNING id_gatunek", [nazwa])
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

router.put('/gatunek', (req, res) => {
    const { id_gatunek, nazwa } = req.body;
    
    db.query("UPDATE projekt.gatunek SET nazwa=$2 WHERE id_gatunek=$1 RETURNING id_gatunek", [id_gatunek, nazwa])
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

router.delete('/gatunek/:id_gatunek', (req, res) => {
    const { id_gatunek } = req.params;
    
    db.query("DELETE FROM projekt.gatunek WHERE id_gatunek=$1", [id_gatunek])
        .then(result => {
            res.status(201).json(
                result
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

router.get('/platforma', (req, res) => {
    db.query("SELECT * FROM projekt.platforma")
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

router.post('/platforma', (req, res) => {
    const { nazwa } = req.body;
    
    db.query("INSERT INTO projekt.platforma(nazwa) VALUES ($1) RETURNING id_platforma", [nazwa])
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

router.put('/platforma', (req, res) => {
    const { id_platforma, nazwa } = req.body;
    
    db.query("UPDATE projekt.platforma SET nazwa=$2 WHERE id_platforma=$1 RETURNING id_platforma", [id_platforma, nazwa])
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

router.delete('/platforma/:id_platforma', (req, res) => {
    const { id_platforma } = req.params;
    
    db.query("DELETE FROM projekt.platforma WHERE id_platforma=$1", [id_platforma])
        .then(result => {
            res.status(201).json(
                result
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

router.get('/seria_gier', (req, res) => {
    db.query("SELECT * FROM projekt.seria_gier")
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

router.post('/seria_gier', (req, res) => {
    const { tytul } = req.body;
    
    db.query("INSERT INTO projekt.seria_gier(tytul) VALUES ($1) RETURNING id_seria", [tytul])
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

router.put('/seria_gier', (req, res) => {
    const { id_seria, tytul } = req.body;
    
    db.query("UPDATE projekt.seria_gier SET tytul=$2 WHERE id_seria=$1 RETURNING id_seria", [id_seria, tytul])
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

router.delete('/seria_gier/:id_seria', (req, res) => {
    const { id_seria } = req.params;
    
    db.query("DELETE FROM projekt.seria_gier WHERE id_seria=$1", [id_seria])
        .then(result => {
            res.status(201).json(
                result
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