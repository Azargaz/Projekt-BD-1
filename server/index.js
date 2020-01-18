require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001

const gra = require('./bd/gra')
const uzytkownik = require('./bd/uzytkownik')
const recenzje = require('./bd/recenzje')
const admin = require('./bd/admin')

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
                "GET /gra/najnowsze/:liczba_gier",
                {
                    detale: [
                        "GET /gra/detale",
                        "GET /gra/detale/:id_gra"
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
                "GET /recenzje/ostatnie",
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
app.use('/admin', auth, admin)

app.listen(port, () => {
    console.log(`Aplikacja nasłuchuje port ${port}.`)
})