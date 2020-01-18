DROP VIEW gry_wydawcy;
DROP VIEW gry_producenci;
DROP VIEW gry_gatunki;
DROP VIEW gry_platformy;
DROP VIEW gry_serie;

DROP VIEW wydawcy_gry;
DROP VIEW producenci_gry;
DROP VIEW gatunki_gry;
DROP VIEW platformy_gry;

DROP VIEW recenzje_uzytkownicy;
DROP VIEW recenzje_gry;

-- Najlepsze gry

CREATE OR REPLACE VIEW najlepsze_gry
AS
SELECT g.id_gra, g.tytul, g.data_wydania, g.kategoria_wiekowa, sg.tytul as seria, avg(ug.ocena) as srednia_ocen
    FROM gra g LEFT JOIN uzytkownik_gra ug
    ON g.id_gra = ug.id_gra
    LEFT JOIN seria_gier sg
    ON sg.id_seria = g.id_seria
    GROUP BY g.id_gra, sg.tytul
    ORDER BY srednia_ocen
;

-- Najnowsze gry

CREATE OR REPLACE VIEW najnowsze_gry
AS
SELECT g.id_gra, g.tytul, g.data_wydania, g.kategoria_wiekowa, sg.tytul as seria
    FROM gra g 
    LEFT JOIN seria_gier sg
    ON sg.id_seria = g.id_seria
    ORDER BY 3 DESC
;

-- Gry wydawców

CREATE OR REPLACE VIEW gry_wydawcy
AS
SELECT g.*, gw.id_wydawca
    FROM gra g JOIN gra_wydawca gw
    USING(id_gra)
    JOIN firma f
    ON f.id_firma = gw.id_wydawca
;

-- Gry producentów

CREATE OR REPLACE VIEW gry_producenci
AS
SELECT g.*, gp.id_producent 
    FROM gra g JOIN gra_producent gp
    USING(id_gra)
    JOIN firma f
    ON f.id_firma = gp.id_producent
;

-- Gry z gatunku

CREATE OR REPLACE VIEW gry_gatunki
AS
SELECT g.*, gg.id_gatunek
    FROM gra g JOIN gra_gatunek gg
    USING(id_gra)
    JOIN gatunek gat
    USING(id_gatunek)
;

-- Gry i serie

CREATE OR REPLACE VIEW gry_serie
AS
SELECT g.*, s.tytul as seria
    FROM gra g LEFT JOIN seria_gier s
    USING(id_seria)
;

-- Gry i platformy

CREATE OR REPLACE VIEW gry_platformy
AS
SELECT g.*, gp.id_platforma 
    FROM gra g JOIN gra_platforma gp
    USING(id_gra)
    JOIN platforma p
    USING(id_platforma)
;

-- Wydawcy gier

CREATE OR REPLACE VIEW wydawcy_gry
AS
SELECT *
    FROM firma f JOIN gra_wydawca gw
    ON f.id_firma = gw.id_wydawca
;

-- Producenci gier

CREATE OR REPLACE VIEW producenci_gry
AS
SELECT *
    FROM firma f JOIN gra_producent gp
    ON f.id_firma = gp.id_producent
;

-- Gatunki gier

CREATE OR REPLACE VIEW gatunki_gry
AS
SELECT *
    FROM gatunek g JOIN gra_gatunek gg
    USING(id_gatunek)
;

-- Platformy gier

CREATE OR REPLACE VIEW platformy_gry
AS
SELECT *
    FROM platforma p JOIN gra_platforma gp
    USING(id_platforma)
;

-- Recenzje uzytkowników

CREATE OR REPLACE VIEW recenzje_uzytkownicy
AS
SELECT r.id_gra, r.tekst, r.data, r.ocena,
    u.id_uzytkownik, u.imie, u.nazwisko
    FROM recenzja r
    JOIN uzytkownik u
    USING(id_uzytkownik)
;

-- Recenzje gier

CREATE OR REPLACE VIEW recenzje_gry
AS
SELECT r.id_uzytkownik, r.tekst, r.data, r.ocena,
    g.id_gra, g.tytul
    FROM recenzja r
    JOIN gra g
    USING(id_gra)
;