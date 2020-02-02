INSERT INTO projekt.status_gry VALUES
    (1, 'Planowana'),
    (2, 'W trakcie'),
    (3, 'Zako�czona')
;

INSERT INTO projekt.gra(tytul, data_wydania, kategoria_wiekowa)
VALUES
    ('Metal Gear Solid', '1999-02-22', 'PEGI-16'),
    ('Metal Gear Solid 2', '2002-03-08', 'PEGI-16'),
    ('Metal Gear Solid 3', '2004-11-17', 'PEGI-16'),
    ('Wied�min', '2007-10-26', 'PEGI-18'),
    ('Wied�min 2: Zab�jcy kr�l�w', '2011-05-17', 'PEGI-18'),
    ('Wied�min 3: Dziki Gon', '2015-05-19', 'PEGI-18'),
    ('Demon`s Souls', '2010-05-25', 'PEGI-16'),
    ('Dark Souls', '2012-08-24', 'PEGI-16'),
    ('Dark Souls II', '2014-03-14', 'PEGI-16'),
    ('Dark Souls III', '2016-04-12', 'PEGI-16'),
    ('Pok�mon Red', '1999-10-21', 'PEGI-3'),
    ('Pok�mon Blue', '1999-10-21', 'PEGI-3'),
    ('Pok�mon Gold', '2001-04-06', 'ESRB-E'),
    ('Pok�mon Silver', '2001-04-06', 'ESRB-E'),
    ('Pok�mon Diamond', '2007-06-27', 'ESRB-E'),
    ('Pok�mon Pearl', '2007-06-27', 'ESRB-E')
;
INSERT INTO projekt.gatunek(nazwa) VALUES 
    ('Skradanka'),
    ('Gra Akcji'),
    ('Fabularna'),
    ('cRPG')
;
INSERT INTO projekt.firma(nazwa, siedziba) VALUES 
    ('Konami', 'Tokio, Japonia'),
    ('CD Projekt RED', 'Warszawa, Polska'),
    ('Agora SA', 'Warszawa, Polska'),
    ('FromSoftware, Inc.', 'Tokio, Japonia'),
    ('Bandai Namco Entertainment Inc.', 'Tokio, Japonia'),
    ('Atari', 'USA'),
    ('Nintendo', 'Kioto, Japonia'),
    ('Game Freak', 'Tokio, Japonia'),
    ('The Pok�mon Company', 'Tokio, Japonia')
;
INSERT INTO projekt.platforma(nazwa) VALUES 
    ('PC Windows'),
    ('PC OSX'),
    ('PC Linux'),
    ('Playstation'),
    ('Playstation 2'),
    ('Playstation 3'),
    ('Playstation 4'),
    ('Xbox'),
    ('Xbox 360'),
    ('Xbox One'),
    ('Game Boy'),
    ('Game Boy Color'),
    ('Nintendo DS'),
    ('Nintendo Switch')
;
INSERT INTO projekt.seria_gier(tytul) VALUES
    ('Metal Gear'),
    ('Wied�min'),
    ('Souls'),
    ('Pok�mon')
;

INSERT INTO projekt.gra_gatunek VALUES
    -- (MGS, Skradanka),
    -- (MGS, Gra akcji),
    -- (MGS2, Skradanka),
    -- (MGS2, Gra akcji),
    -- (MGS3, Skradanka),
    -- (MGS3, Gra akcji),
    -- (W1, Fabularna),
    -- (W1, Gra akcji),
    -- (W2, Fabularna),
    -- (W2, Gra akcji),
    -- (W3, Fabularna),
    -- (W3, Gra akcji),
    -- (DeS, Fabularna),
    -- (DeS, Gra akcji),
    -- (DS, Fabularna),
    -- (DS, Gra akcji),
    -- (DS2, Fabularna),
    -- (DS2, Gra akcji),
    -- (DS3, Fabularna),
    -- (DS3, Gra akcji),
    -- (PokeB, cRPG),
    -- (PokeR, cRPG),
    -- (PokeG, cRPG),
    -- (PokeS, cRPG),
    -- (PokeD, cRPG),
    -- (PokeP, cRPG)
    (1, 1),
    (1, 2),
    (2, 1),
    (2, 2),
    (3, 1),
    (3, 2),
    (4, 3),
    (4, 2),
    (5, 3),
    (5, 2),
    (6, 3),
    (6, 2),
    (7, 3),
    (7, 2),
    (8, 3),
    (8, 2),
    (9, 3),
    (9, 2),
    (10, 3),
    (10, 2),
    (11, 4),
    (12, 4),
    (13, 4),
    (14, 4),
    (15, 4),
    (16, 4)
;

INSERT INTO projekt.gra_wydawca VALUES
    -- (MGS, Konami),
    -- (MGS2, Konami),
    -- (MGS3, Konami),
    -- (W1, Atari),
    -- (W2, CDPR),
    -- (W3, CDPR),
    -- (DeS, Namco),
    -- (DS, Namco),
    -- (DS2, Namco),
    -- (DS3, Namco),
    -- (PokeB, Nintendo),
    -- (PokeR, Nintendo),
    -- (PokeG, Nintendo),
    -- (PokeS, Nintendo),
    -- (PokeD, Nintendo),
    -- (PokeP, Nintendo)
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 6),
    (5, 2),
    (6, 2),
    (7, 5),
    (8, 5),
    (9, 5),
    (10, 5),
    (11, 7),
    (12, 7),
    (13, 7),
    (14, 7),
    (15, 7),
    (16, 7)
;
INSERT INTO projekt.gra_producent VALUES
    -- (MGS, Konami),
    -- (MGS2, Konami),
    -- (MGS3, Konami),
    -- (W1, CDPR),
    -- (W2, CDPR),
    -- (W2, Agora),
    -- (W3, CDPR),
    -- (DeS, From),
    -- (DS, From),
    -- (DS2, From),
    -- (DS3, From),
    -- (PokeB, GameFreak),
    -- (PokeR, GameFreak),
    -- (PokeG, GameFreak),
    -- (PokeS, GameFreak),
    -- (PokeD, GameFreak),
    -- (PokeP, GameFreak),
    -- (PokeD, TPC),
    -- (PokeP, TPC)
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 2),
    (5, 2),
    (5, 3),
    (6, 2),
    (7, 4),
    (8, 4),
    (9, 4),
    (10, 4),
    (11, 8),
    (12, 8),
    (13, 8),
    (14, 8),
    (15, 8),
    (16, 8),
    (15, 9),
    (16, 9)
;

INSERT INTO projekt.gra_platforma VALUES
    -- (MGS, PS),
    -- (MGS, PS2),
    -- (MGS, PS3),
    -- (MGS2, PS2),
    -- (MGS2, PS3),
    -- (MGS3, PS2),
    -- (MGS3, PS3),
    -- (W1, Win),
    -- (W1, OSX),
    -- (W2, Win),
    -- (W2, OSX),
    -- (W2, Linux),
    -- (W2, XBOX360),
    -- (W3, Win),
    -- (W3, XBOXONE),
    -- (W3, PS4),
    -- (W3, Switch),
    -- (Des, PS3),
    -- (DS, PS3),
    -- (DS, Win),
    -- (DS, XBOX360),
    -- (DS2, PS3),
    -- (DS2, Win),
    -- (DS2, XBOX360),
    -- (DS3, PS4),
    -- (DS3, Win),
    -- (DS3, XBOXONE),
    -- (PokeR, GameBoy),
    -- (PokeB, GameBoy),
    -- (PokeG, GameBoy),
    -- (PokeS, GameBoy),
    -- (PokeG, GBColor),
    -- (PokeS, GBColor),
    -- (PokeD, NDS),
    -- (PokeP, NDS),
    (1, 4),
    (1, 5),
    (1, 6),
    (2, 5),
    (2, 6),
    (3, 5),
    (3, 6),
    (4, 1),
    (4, 2),
    (5, 1),
    (5, 2),
    (5, 3),
    (5, 9),
    (6, 1),
    (6, 10),
    (6, 7),
    (6, 14),
    (7, 6),
    (8, 6),
    (8, 1),
    (8, 9),
    (9, 6),
    (9, 1),
    (9, 9),
    (10, 7),
    (10, 1),
    (10, 10),
    (11, 11),
    (12, 11),
    (13, 11),
    (14, 11),
    (13, 12),
    (14, 12),
    (15, 13),
    (16, 13)
;

-- Przypisanie gier do odpowiednich serii gier

UPDATE projekt.gra SET id_seria = 1 WHERE id_gra IN (1, 2, 3);
UPDATE projekt.gra SET id_seria = 2 WHERE id_gra IN (4, 5, 6);
UPDATE projekt.gra SET id_seria = 3 WHERE id_gra IN (7, 8, 9, 10);
UPDATE projekt.gra SET id_seria = 4 WHERE id_gra IN (11, 12, 13, 14, 15, 16);

-- Stworzenie przykładowych użytkowników

INSERT INTO projekt.uzytkownik(login, haslo, email, imie, nazwisko, admin) VALUES
    ('jan123', '123456', 'jankowalski@email.com', 'Jan', 'Kowalski', false),
    ('test', 'test', 'test@email.com', null, null, false),
    ('admin', 'admin', 'admin@email.com', null, null, true)
;

-- Losowe przypisanie gier do list powyższych użytkowników

-- id_uzyt, id_gra, status, ocena, data_roz, data_uk
SELECT * FROM projekt.dodaj_gre_do_listy( 1, 10, 1, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 1, 15, 3, 1, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 3, 13, 3, 5, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 3, 12, 1, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 15, 2, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 6, 3, 3, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 16, 1, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 3, 7, 2, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 3, 3, 2, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 3, 2, 3, 5, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 7, 1, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 1, 16, 2, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 1, 9, 1, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 5, 2, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 3, 9, 3, 1, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 9, 2, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 1, 13, 3, 5, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 1, 8, 2, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 1, 5, 2, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 2, 1, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 4, 2, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 3, 8, 1, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 1, 6, 2, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 1, 3, 1, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 1, 2, 3, 2, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 8, 2, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 1, 1, 1, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 3, 11, 3, 6, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 3, 14, 3, 6, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 3, 6, 2, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 12, 2, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 11, 2, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 3, 16, 3, 7, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 3, 5, 3, 10, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 13, 1, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 1, 14, 2, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 1, 3, 3, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 3, 3, 1, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 1, 11, 1, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 3, 15, 2, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 1, 4, 3, 7, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 3, 4, 1, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 1, 12, 3, 3, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 1, 7, 2, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 10, 3, 10, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 3, 10, 1, null, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 3, 1, 3, 2, null, null);
SELECT * FROM projekt.dodaj_gre_do_listy( 2, 14, 3, 8, null, null);