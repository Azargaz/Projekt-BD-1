const router = require('express').Router()
const jwt = require('jsonwebtoken')

const db = require('./polaczenie')

const lista = require('./lista')
const auth = require('../utils/authorization')

router.use('/lista', lista)

router.get('/:id_uzytkownik', auth, (req, res) => {
    const { id_uzytkownik } = req.params;
    db.query('SELECT id_uzytkownik, imie, nazwisko, email FROM projekt.uzytkownik WHERE id_uzytkownik = $1', [id_uzytkownik])
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err.message);
        })
})

router.post('/login', (req, res) => {
    const { login, haslo } = req.body;
    db.query('SELECT id_uzytkownik, imie, admin FROM projekt.uzytkownik WHERE login=$1 AND haslo=$2;', [login, haslo])
        .then(result => {
            result = result.rows[0];
            if(!result) throw new Error("Złe dane logowania");
            const token = jwt.sign({id_uzytkownik: result.id_uzytkownik, imie: result.imie, admin: result.admin}, process.env.PRIVATE_KEY)
            res.json({
                msg: "Wygenerowano token.",
                token
            })

        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: "error",
                authError: err.message
            });
        })
})

router.post('/', (req, res) => {
    const { login, haslo, email, imie, nazwisko } = req.body
    
    db.query('SELECT * FROM projekt.uzytkownik WHERE login=$1', [login])
        .then(result => {
            if(result.rows.length > 0) {
                throw new Error("Użytkownik o danym loginie już istnieje!");
            } else {
                db.query('INSERT INTO projekt.uzytkownik(login, haslo, email, imie, nazwisko, admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_uzytkownik', 
                [login, haslo, email, imie, nazwisko, false])
                    .then(result => {
                        res.status(201).json({
                            msg: `Dodano użytkownika o id = ${result.rows[0].id_uzytkownik}`
                        })
                    });
            }
        })
        .catch(err => {
            console.error(err)
            console.error(err);
            res.status(500).json({
                status: "error",
                error: err.message
            });
        });
    
})

module.exports = router