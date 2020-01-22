INSERT INTO status_gry VALUES
    (1, 'Planowana'),
    (2, 'W trakcie'),
    (3, 'Zakończona')
;

INSERT INTO gra(id_gra, tytul, data_wydania, kategoria_wiekowa)
VALUES
    (1, 'Metal Gear Solid', '1999-02-22', 'PG-16'),
    (2, 'Metal Gear Solid 2', '2002-03-08', 'PG-16'),
    (3, 'Metal Gear Solid 3', '2004-11-17', 'PG-16'),
    (4, 'Wiedźmin 3: Dziki Gon', '2015-05-19', 'PG-18')
;
INSERT INTO gatunek VALUES 
    (1, 'Skradanka'),
    (2, 'Fabularna'),
    (3, 'Gra Akcji')
;
INSERT INTO firma(id_firma, nazwa, siedziba) VALUES 
    (1, 'Konami', 'Tokio, Japonia'),
    (2, 'CD Projekt RED', 'Warszawa, Polska')
;
INSERT INTO platforma VALUES 
    (1, 'PC Windows'),
    (2, 'Playstation 2'),
    (3, 'Playstation 3'),
    (4, 'Playstation 4'),
    (5, 'Xbox'),
    (6, 'Xbox 360'),
    (7, 'Xbox One')
;
INSERT INTO seria_gier VALUES
    (1, 'Metal Gear'),
    (2, 'Wiedźmin')
;

INSERT INTO gra_gatunek VALUES
    (1, 1),
    (1, 3),
    (2, 1),
    (2, 3),
    (3, 1),
    (3, 3),
    (4, 2),
    (4, 3)
;

INSERT INTO gra_wydawca VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 2)
;
INSERT INTO gra_producent VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 2)
;

INSERT INTO gra_platforma VALUES
    (1, 2),
    (1, 3),
    (2, 2),
    (2, 3),
    (2, 5),
    (3, 2),
    (3, 3),
    (4, 1),
    (4, 4),
    (4, 7)
;

UPDATE gra SET id_seria = 1 WHERE id_gra IN (1, 2, 3);
UPDATE gra SET id_seria = 2 WHERE id_gra IN (4);

INSERT INTO uzytkownik(login, haslo, email, imie, nazwisko, admin) VALUES
    ('jan123', '123456', 'jankowalski@email.com', 'Jan', 'Kowalski', false),
    ('admin', 'admin', 'admin@email.com', null, null, true)
;

SELECT * FROM dodaj_gre_do_listy( 1, 1, 1, null, null, null);
SELECT * FROM dodaj_gre_do_listy( 1, 2, 1, null, null, null);
SELECT * FROM dodaj_gre_do_listy( 2, 2, 1, null, null, null);
SELECT * FROM dodaj_gre_do_listy( 2, 4, 1, null, null, null);