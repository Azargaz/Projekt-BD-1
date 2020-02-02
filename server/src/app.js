/**
 * Główny plik zawierający serwer Express i wszystkie jego ścieżki
 * @module app
 */

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const port = 3001

/**
 * Moduł związany z tabelą Gra
 * @see module:bd/gra
 * @name gra
 */
const gra = require('./bd/gra')

/**
 * Moduł związany z tabelą Uzytkownik
 * @see module:bd/uzytkownik
 * @name uzytkownik
 */
const uzytkownik = require('./bd/uzytkownik')

/**
 * Moduł związany z tabelą Recenzja
 * @see module:bd/recenzje
 * @name recenzje
 */
const recenzje = require('./bd/recenzje')

/**
 * Moduł związany z zarządzaniem tabelami
 * @see module:bd/admin
 * @name admin
 */
const admin = require('./bd/admin')

/**
 * Moduł służący jako middleware do autoryzacji.
 * @see module:utils/authorization
 * @name auth
 */
const auth = require('./utils/authorization')

app.use(cors())

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (req, res) => {
    res.json({ 
        msg: `Witaj w API encyklopedii gier komputerowych. Dostępne ścieżki oraz podścieżki poniżej. Ścieżki oznaczone Auth wymagają autoryzacji (nagłówek 'authorization' z odpowiednim tokenem JWT).`,
        routes: {
            gra: [
                "GET /gra",
                "GET /gra/:id_gra",
                "GET /gra/top/:liczba_gier",
                "GET /gra/tytul",
                {
                    detale: [
                        "GET /gra/detale",
                        "GET /gra/detale/string/:id_gra",
                        "GET /gra/detale/json/:id_gra"
                    ]
                }
            ],
            uzytkownik: [
                "GET /uzykownik",
                "POST /uzykownik/",
                "GET /uzykownik/:id",
                "POST /uzykownik/login",
                {
                    lista: [
                        "GET /uzytkownik/lista/:id_uzytkownik",
                        "Auth POST /uzytkownik/lista",
                        "Auth PUT /uzytkownik/lista",
                        "Auth DELETE /uzytkownik/lista"
                    ]
                }
            ],
            recenzje: [
                "GET /recenzje",
                "GET /recenzje/uzytkownik/:id_uzytkownik",
                "GET /recenzje/gra/:id_gra",
                "Auth POST /recenzje/gra/:id_gra"
            ],
            admin: [
                "/admin"
            ]
        }       
    })
})

app.use('/gra', gra)
app.use('/uzytkownik', uzytkownik)
app.use('/recenzje', recenzje)
app.use('/admin', auth, (req, res, next) => {
    if(req.user.admin) {
        next();
    } else {
        console.error("Użytkownik nie jest administratorem!");
        res.status(404).json({
            status: "error",
            msg: "Użytkownik nie jest administratorem!"
        });
        return;
    }
}, admin)

app.listen(port, () => {
    console.log(`Aplikacja nasłuchuje port ${port}.`)
})