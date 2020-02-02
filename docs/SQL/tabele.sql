-- Schema

-- DROP SCHEMA projekt CASCADE;
CREATE SCHEMA projekt;

SET SEARCH_PATH TO projekt;

-- Relacje z diagramu ERD - wygenerowane w SQL Power Architect


CREATE SEQUENCE seria_gier_id_seria_seq_1;

CREATE TABLE seria_gier (
                id_seria INTEGER NOT NULL DEFAULT nextval('seria_gier_id_seria_seq_1'),
                tytul VARCHAR NOT NULL,
                CONSTRAINT id_seria PRIMARY KEY (id_seria)
);


ALTER SEQUENCE seria_gier_id_seria_seq_1 OWNED BY seria_gier.id_seria;

CREATE SEQUENCE status_gry_id_status_gry_seq;

CREATE TABLE status_gry (
                id_status_gry INTEGER NOT NULL DEFAULT nextval('status_gry_id_status_gry_seq'),
                status VARCHAR NOT NULL,
                CONSTRAINT id_status_gry PRIMARY KEY (id_status_gry)
);


ALTER SEQUENCE status_gry_id_status_gry_seq OWNED BY status_gry.id_status_gry;

CREATE SEQUENCE platforma_id_platforma_seq;

CREATE TABLE platforma (
                id_platforma INTEGER NOT NULL DEFAULT nextval('platforma_id_platforma_seq'),
                nazwa VARCHAR NOT NULL,
                CONSTRAINT id_platforma PRIMARY KEY (id_platforma)
);


ALTER SEQUENCE platforma_id_platforma_seq OWNED BY platforma.id_platforma;

CREATE SEQUENCE firma_id_firma_seq;

CREATE TABLE firma (
                id_firma INTEGER NOT NULL DEFAULT nextval('firma_id_firma_seq'),
                nazwa VARCHAR NOT NULL,
                siedziba VARCHAR NOT NULL,
                strona_www VARCHAR,
                CONSTRAINT id_firma PRIMARY KEY (id_firma)
);


ALTER SEQUENCE firma_id_firma_seq OWNED BY firma.id_firma;

CREATE SEQUENCE gatunek_id_gatunek_seq;

CREATE TABLE gatunek (
                id_gatunek INTEGER NOT NULL DEFAULT nextval('gatunek_id_gatunek_seq'),
                nazwa VARCHAR NOT NULL,
                CONSTRAINT id_gatunek PRIMARY KEY (id_gatunek)
);


ALTER SEQUENCE gatunek_id_gatunek_seq OWNED BY gatunek.id_gatunek;

CREATE SEQUENCE gra_id_gra_seq;

CREATE TABLE gra (
                id_gra INTEGER NOT NULL DEFAULT nextval('gra_id_gra_seq'),
                tytul VARCHAR NOT NULL,
                opis VARCHAR,
                data_wydania DATE NOT NULL,
                kategoria_wiekowa VARCHAR NOT NULL,
                id_seria INTEGER,
                CONSTRAINT id_gra PRIMARY KEY (id_gra)
);


ALTER SEQUENCE gra_id_gra_seq OWNED BY gra.id_gra;

CREATE TABLE gra_producent (
                id_gra INTEGER NOT NULL,
                id_producent INTEGER NOT NULL,
                CONSTRAINT id_producent PRIMARY KEY (id_gra, id_producent)
);


CREATE TABLE gra_wydawca (
                id_gra INTEGER NOT NULL,
                id_wydawca INTEGER NOT NULL,
                CONSTRAINT id_wydawca PRIMARY KEY (id_gra, id_wydawca)
);


CREATE TABLE gra_gatunek (
                id_gra INTEGER NOT NULL,
                id_gatunek INTEGER NOT NULL,
                CONSTRAINT id_gra_gatunek PRIMARY KEY (id_gra, id_gatunek)
);


CREATE TABLE gra_Platforma (
                id_gra INTEGER NOT NULL,
                id_platforma INTEGER NOT NULL,
                CONSTRAINT id_gra_platforma PRIMARY KEY (id_gra, id_platforma)
);


CREATE SEQUENCE uzytkownik_id_uzytkownik_seq;

CREATE TABLE uzytkownik (
                id_uzytkownik INTEGER NOT NULL DEFAULT nextval('uzytkownik_id_uzytkownik_seq'),
                login VARCHAR NOT NULL,
                haslo VARCHAR NOT NULL,
                email VARCHAR NOT NULL,
                imie VARCHAR,
                nazwisko VARCHAR,
                admin BOOLEAN NOT NULL,
                CONSTRAINT id_uzytkownik PRIMARY KEY (id_uzytkownik)
);


ALTER SEQUENCE uzytkownik_id_uzytkownik_seq OWNED BY uzytkownik.id_uzytkownik;

CREATE TABLE recenzja (
                id_uzytkownik INTEGER NOT NULL,
                id_gra INTEGER NOT NULL,
                tekst VARCHAR NOT NULL,
                data DATE NOT NULL,
                ocena INTEGER NOT NULL,
                CONSTRAINT id_recenzja PRIMARY KEY (id_uzytkownik, id_gra)
);


CREATE TABLE uzytkownik_gra (
                id_uzytkownik INTEGER NOT NULL,
                id_gra INTEGER NOT NULL,
                id_status INTEGER NOT NULL,
                data_rozpoczecia DATE,
                data_ukonczenia DATE,
                ocena INTEGER,
                CONSTRAINT id_uzytkownik_gra PRIMARY KEY (id_uzytkownik, id_gra)
);


ALTER TABLE gra ADD CONSTRAINT seria_gier_gra_fk
FOREIGN KEY (id_seria)
REFERENCES seria_gier (id_seria)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE uzytkownik_gra ADD CONSTRAINT status_gry_uzytkownik_gra_fk
FOREIGN KEY (id_status)
REFERENCES status_gry (id_status_gry)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE gra_Platforma ADD CONSTRAINT platforma_gra_platforma_fk
FOREIGN KEY (id_platforma)
REFERENCES platforma (id_platforma)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE gra_producent ADD CONSTRAINT firma_gra_producent_fk
FOREIGN KEY (id_producent)
REFERENCES firma (id_firma)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE gra_wydawca ADD CONSTRAINT firma_gra_wydawca_fk
FOREIGN KEY (id_wydawca)
REFERENCES firma (id_firma)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE gra_gatunek ADD CONSTRAINT gatunek_gra_gatunek_fk
FOREIGN KEY (id_gatunek)
REFERENCES gatunek (id_gatunek)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE gra_Platforma ADD CONSTRAINT gra_gra_platforma_fk
FOREIGN KEY (id_gra)
REFERENCES gra (id_gra)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE gra_gatunek ADD CONSTRAINT gra_gra_gatunek_fk
FOREIGN KEY (id_gra)
REFERENCES gra (id_gra)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE gra_wydawca ADD CONSTRAINT gra_gra_wydawca_fk
FOREIGN KEY (id_gra)
REFERENCES gra (id_gra)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE gra_producent ADD CONSTRAINT gra_gra_producent_fk
FOREIGN KEY (id_gra)
REFERENCES gra (id_gra)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE uzytkownik_gra ADD CONSTRAINT gra_uzytkownik_gra_fk
FOREIGN KEY (id_gra)
REFERENCES gra (id_gra)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE recenzja ADD CONSTRAINT gra_recenzja_fk
FOREIGN KEY (id_gra)
REFERENCES gra (id_gra)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE uzytkownik_gra ADD CONSTRAINT uzytkownik_uzytkownik_gra_fk
FOREIGN KEY (id_uzytkownik)
REFERENCES uzytkownik (id_uzytkownik)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE recenzja ADD CONSTRAINT uzytkownik_recenzja_fk
FOREIGN KEY (id_uzytkownik)
REFERENCES uzytkownik (id_uzytkownik)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;