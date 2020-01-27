DROP VIEW projekt.gry_wydawcy;
DROP VIEW projekt.gry_producenci;
DROP VIEW projekt.gry_gatunki;
DROP VIEW projekt.gry_platformy;
DROP VIEW projekt.gry_serie;

DROP VIEW projekt.wydawcy_gry;
DROP VIEW projekt.producenci_gry;
DROP VIEW projekt.gatunki_gry;
DROP VIEW projekt.platformy_gry;

DROP VIEW projekt.recenzje_uzytkownicy;
DROP VIEW projekt.recenzje_gry;

-- Najlepsze gry

CREATE OR REPLACE VIEW najlepsze_gry
AS
SELECT g.id_gra, g.tytul, g.data_wydania, g.kategoria_wiekowa, sg.tytul as seria, avg(ug.ocena) as srednia_ocen
    FROM projekt.gra g LEFT JOIN projekt.uzytkownik_gra ug
    ON g.id_gra = ug.id_gra
    LEFT JOIN projekt.seria_gier sg
    ON sg.id_seria = g.id_seria
    GROUP BY g.id_gra, sg.tytul
    ORDER BY srednia_ocen
;

-- Najnowsze gry

CREATE OR REPLACE VIEW najnowsze_gry
AS
SELECT g.id_gra, g.tytul, g.data_wydania, g.kategoria_wiekowa, sg.tytul as seria
    FROM projekt.gra g 
    LEFT JOIN projekt.seria_gier sg
    ON sg.id_seria = g.id_seria
    ORDER BY 3 DESC
;

-- Gry wydawców

CREATE OR REPLACE VIEW gry_wydawcy
AS
SELECT g.*, gw.id_wydawca
    FROM projekt.gra g JOIN projekt.gra_wydawca gw
    USING(id_gra)
    JOIN projekt.firma f
    ON f.id_firma = gw.id_wydawca
;

-- Gry producentów

CREATE OR REPLACE VIEW gry_producenci
AS
SELECT g.*, gp.id_producent 
    FROM projekt.gra g JOIN projekt.gra_producent gp
    USING(id_gra)
    JOIN projekt.firma f
    ON f.id_firma = gp.id_producent
;

-- Gry z gatunku

CREATE OR REPLACE VIEW gry_gatunki
AS
SELECT g.*, gg.id_gatunek
    FROM projekt.gra g JOIN projekt.gra_gatunek gg
    USING(id_gra)
    JOIN projekt.gatunek gat
    USING(id_gatunek)
;

-- Gry i serie

CREATE OR REPLACE VIEW gry_serie
AS
SELECT g.*, s.tytul as seria
    FROM projekt.gra g LEFT JOIN projekt.seria_gier s
    USING(id_seria)
;

-- Gry i platformy

CREATE OR REPLACE VIEW gry_platformy
AS
SELECT g.*, gp.id_platforma 
    FROM projekt.gra g JOIN projekt.gra_platforma gp
    USING(id_gra)
    JOIN projekt.platforma p
    USING(id_platforma)
;

-- Wydawcy gier

CREATE OR REPLACE VIEW wydawcy_gry
AS
SELECT *
    FROM projekt.firma f JOIN projekt.gra_wydawca gw
    ON f.id_firma = gw.id_wydawca
;

-- Producenci gier

CREATE OR REPLACE VIEW producenci_gry
AS
SELECT *
    FROM projekt.firma f JOIN projekt.gra_producent gp
    ON f.id_firma = gp.id_producent
;

-- Gatunki gier

CREATE OR REPLACE VIEW gatunki_gry
AS
SELECT *
    FROM projekt.gatunek g JOIN projekt.gra_gatunek gg
    USING(id_gatunek)
;

-- Platformy gier

CREATE OR REPLACE VIEW platformy_gry
AS
SELECT *
    FROM projekt.platforma p JOIN projekt.gra_platforma gp
    USING(id_platforma)
;

-- Recenzje uzytkowników

CREATE OR REPLACE VIEW recenzje_uzytkownicy
AS
SELECT r.id_gra, r.tekst, r.data, r.ocena,
    u.id_uzytkownik, u.imie, u.nazwisko
    FROM projekt.recenzja r
    JOIN projekt.uzytkownik u
    USING(id_uzytkownik)
;

-- Recenzje gier

CREATE OR REPLACE VIEW recenzje_gry
AS
SELECT r.id_uzytkownik, r.tekst, r.data, r.ocena,
    g.id_gra, g.tytul
    FROM projekt.recenzja r
    JOIN projekt.gra g
    USING(id_gra)
;