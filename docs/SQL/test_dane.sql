INSERT INTO projekt.status_gry VALUES
    (1, 'Planowana'),
    (2, 'W trakcie'),
    (3, 'Zakończona')
;

INSERT INTO projekt.gra(tytul, data_wydania, kategoria_wiekowa)
VALUES
    ('Metal Gear Solid', '1999-02-22', 'PG-16'),
    ('Metal Gear Solid 2', '2002-03-08', 'PG-16'),
    ('Metal Gear Solid 3', '2004-11-17', 'PG-16'),
    ('Wiedźmin 3: Dziki Gon', '2015-05-19', 'PG-18')
;
INSERT INTO projekt.gatunek(nazwa) VALUES 
    ('Skradanka'),
    ('Fabularna'),
    ('Gra Akcji')
;
INSERT INTO projekt.firma(nazwa, siedziba) VALUES 
    ('Konami', 'Tokio, Japonia'),
    ('CD Projekt RED', 'Warszawa, Polska')
;
INSERT INTO projekt.platforma(nazwa) VALUES 
    ('PC Windows'),
    ('Playstation 2'),
    ('Playstation 3'),
    ('Playstation 4'),
    ('Xbox'),
    ('Xbox 360'),
    ('Xbox One')
;
INSERT INTO projekt.seria_gier(tytul) VALUES
    ('Metal Gear'),
    ('Wiedźmin')
;

INSERT INTO projekt.gra_gatunek VALUES
    (1, 1),
    (1, 3),
    (2, 1),
    (2, 3),
    (3, 1),
    (3, 3),
    (4, 2),
    (4, 3)
;

INSERT INTO projekt.gra_wydawca VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 2)
;
INSERT INTO projekt.gra_producent VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 2)
;

INSERT INTO projekt.gra_platforma VALUES
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

UPDATE projekt.gra SET id_seria = 1 WHERE id_gra IN (1, 2, 3);
UPDATE projekt.gra SET id_seria = 2 WHERE id_gra IN (4);

INSERT INTO projekt.uzytkownik(login, haslo, email, imie, nazwisko, admin) VALUES
    ('jan123', '123456', 'jankowalski@email.com', 'Jan', 'Kowalski', false),
    ('admin', 'admin', 'admin@email.com', null, null, true)
;

SELECT * FROM projekt.dodaj_gre_do_listy( 1, 1, 1, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 1, 2, 1, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 2, 1, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 4, 1, null, null, null);