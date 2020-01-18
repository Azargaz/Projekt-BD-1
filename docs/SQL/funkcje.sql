-- Najlepsze gry limit

CREATE OR REPLACE FUNCTION najlepsze_gry_limit ( lim int )
RETURNS SETOF najlepsze_gry
AS $$
    SELECT * FROM najlepsze_gry LIMIT lim;
$$ LANGUAGE SQL;

-- Najnowsze gry limit

CREATE OR REPLACE FUNCTION najnowsze_gry_limit ( lim int )
RETURNS SETOF najnowsze_gry
AS $$
    SELECT * FROM najnowsze_gry LIMIT lim;
$$ LANGUAGE SQL;

-- Lista użytkownika

-- Wyświetl
CREATE OR REPLACE FUNCTION lista_uzytkownika ( id_uzyt int )
RETURNS TABLE(id_gra int, tytul varchar, data_wydania date, kategoria_wiekowa 
            varchar, seria varchar, ocena int, status varchar, data_rozpoczecia date, data_ukonczenia date)
AS $$
    SELECT g.id_gra, g.tytul, g.data_wydania, g.kategoria_wiekowa,
        seg.tytul as seria,
        ug.ocena, stg.status as status, ug.data_rozpoczecia, ug.data_ukonczenia
        FROM gra g JOIN uzytkownik_gra ug
        ON g.id_gra = ug.id_gra
        LEFT JOIN seria_gier seg
        ON seg.id_seria = g.id_seria
        JOIN status_gry stg
        ON stg.id_status_gry = ug.id_status
        WHERE ug.id_uzytkownik = id_uzyt
    ;
$$ LANGUAGE SQL;

-- Dodaj
CREATE OR REPLACE FUNCTION dodaj_gre_do_listy( id_uzyt int, id_gry int, id_stat int, ocena int, data_rozp date, data_ukoncz date )
RETURNS int
AS $$
DECLARE
    status_varchar VARCHAR := NULL;
BEGIN
    SELECT INTO status_varchar status FROM status_gry WHERE id_status_gry = id_stat;

    IF status_varchar = 'Zakończona' THEN
        IF data_ukoncz IS NULL THEN
            data_ukoncz := NOW();
        END IF;
    END IF;

    IF status_varchar = 'W trakcie' THEN
        IF data_rozp IS NULL THEN
            data_rozp := NOW();
        END IF;
    END IF;

    -- RAISE INFO 'id_uzyt: % id_gry: % status: % data_rozp: % data_ukoncz: % ocena: %', id_uzyt, id_gry, status_varchar, data_rozp, data_ukoncz, ocena;
    INSERT INTO uzytkownik_gra(id_uzytkownik, id_gra, id_status, data_rozpoczecia, data_ukonczenia, ocena)
    VALUES (id_uzyt, id_gry, id_stat, data_rozp, data_ukoncz, ocena);
    RETURN 1;
END;
$$ LANGUAGE 'plpgsql';

-- Edytuj
CREATE OR REPLACE FUNCTION edytuj_gre_z_listy( id_uzyt int, id_gry int, id_stat int, nowa_ocena int, data_rozp date, data_ukoncz date )
RETURNS int
AS $$
DECLARE
    status_varchar VARCHAR := NULL;
BEGIN
    SELECT INTO status_varchar status FROM status_gry WHERE id_status_gry = id_stat;

    IF status_varchar = 'Zakończona' THEN
        IF data_ukoncz IS NULL THEN
            data_ukoncz := NOW();
        END IF;
    END IF;

    IF status_varchar = 'W trakcie' THEN
        IF data_rozp IS NULL THEN
            data_rozp := NOW();
        END IF;
    END IF;

    UPDATE uzytkownik_gra SET id_status = id_stat, data_ukonczenia = data_ukoncz, data_rozpoczecia = data_rozp, ocena = nowa_ocena
    WHERE id_gra = id_gry AND id_uzytkownik = id_uzyt;
    -- RAISE INFO 'id_uzyt: % id_gry: % status: % data_rozp: % data_ukoncz: % ocena: %', id_uzyt, id_gry, status_varchar, data_rozp, data_ukoncz, nowa_ocena;
    RETURN 1;
END;
$$ LANGUAGE 'plpgsql';

-- Usuń
CREATE OR REPLACE FUNCTION usun_gre_z_listy( id_uzyt int, id_gry int )
RETURNS int
AS $$
BEGIN
    DELETE FROM uzytkownik_gra WHERE id_gra = id_gry AND id_uzytkownik = id_uzyt;
    -- RAISE INFO 'id_uzyt: % id_gry: % status: % data_rozp: % data_ukoncz: % ocena: %', id_uzyt, id_gry, status_varchar, data_rozp, data_ukoncz, nowa_ocena;
    RETURN 1;
END;
$$ LANGUAGE 'plpgsql';