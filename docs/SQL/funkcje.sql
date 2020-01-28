-- Najlepsze gry limit

CREATE OR REPLACE FUNCTION najlepsze_gry_limit ( lim int )
RETURNS SETOF projekt.najlepsze_gry
AS $$
    SELECT * FROM projekt.najlepsze_gry LIMIT lim;
$$ LANGUAGE SQL;

-- Najnowsze gry limit

CREATE OR REPLACE FUNCTION najnowsze_gry_limit ( lim int )
RETURNS SETOF projekt.najnowsze_gry
AS $$
    SELECT * FROM projekt.najnowsze_gry LIMIT lim;
$$ LANGUAGE SQL;

-- Lista użytkownika

-- Wyświetl
CREATE OR REPLACE FUNCTION lista_uzytkownika ( id_uzyt int )
RETURNS TABLE(id_gra int, tytul varchar, data_wydania date, kategoria_wiekowa 
            varchar, seria varchar, ocena int, id_status_gry int, data_rozpoczecia date, data_ukonczenia date)
AS $$
    SELECT g.id_gra, g.tytul, g.data_wydania, g.kategoria_wiekowa,
        seg.tytul as seria,
        ug.ocena, ug.id_status, ug.data_rozpoczecia, ug.data_ukonczenia
        FROM projekt.gra g JOIN projekt.uzytkownik_gra ug
        ON g.id_gra = ug.id_gra
        LEFT JOIN projekt.seria_gier seg
        ON seg.id_seria = g.id_seria
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
    SELECT INTO status_varchar status FROM projekt.status_gry WHERE id_status_gry = id_stat;

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

    UPDATE projekt.uzytkownik_gra SET id_status = id_stat, data_ukonczenia = data_ukoncz, data_rozpoczecia = data_rozp, ocena = nowa_ocena
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
    DELETE FROM projekt.uzytkownik_gra WHERE id_gra = id_gry AND id_uzytkownik = id_uzyt;
    -- RAISE INFO 'id_uzyt: % id_gry: % status: % data_rozp: % data_ukoncz: % ocena: %', id_uzyt, id_gry, status_varchar, data_rozp, data_ukoncz, nowa_ocena;
    RETURN 1;
END;
$$ LANGUAGE 'plpgsql';



-- Funkcje tworzące jeden łancuh znaków zawierający wszystkie detale danej gry (kolejno wszystkie gatunki, wydawców, producentów i platformy)

-- Wszystkie gatunki wybranej gry
CREATE OR REPLACE FUNCTION gatunki_gry ( id_gry int )
RETURNS TEXT
AS $$
DECLARE
    id int;
    gatunki TEXT DEFAULT '-';
    gatunki_rec RECORD;
    gatunki_cur CURSOR FOR 
    SELECT nazwa FROM projekt.gra_gatunek JOIN projekt.gatunek USING(id_gatunek) WHERE id_gra = id_gry;
BEGIN
    id := 0;
    OPEN gatunki_cur;
        LOOP
            FETCH gatunki_cur INTO gatunki_rec;
            EXIT WHEN NOT FOUND;

            IF id != 0 THEN
                gatunki := gatunki || ', ' || gatunki_rec.nazwa;
            END IF;

            IF id = 0 THEN
                gatunki := gatunki_rec.nazwa;
                id := 1;
            END IF;
        END LOOP;
    CLOSE gatunki_cur; 
    RETURN gatunki;
END;
$$ LANGUAGE 'plpgsql';

-- Wszyscy wydawcy wybranej gry
CREATE OR REPLACE FUNCTION wydawcy_gry ( id_gry int )
RETURNS TEXT
AS $$
DECLARE
    id int;
    wydawcy TEXT DEFAULT '-';
    wydawcy_rec RECORD;
    wydawcy_cur CURSOR FOR 
    SELECT nazwa FROM projekt.gra_wydawca JOIN projekt.firma ON id_firma = id_wydawca WHERE id_gra = id_gry;
BEGIN
    id := 0;
    OPEN wydawcy_cur;
        LOOP
            FETCH wydawcy_cur INTO wydawcy_rec;
            EXIT WHEN NOT FOUND;

            IF id != 0 THEN
                wydawcy := wydawcy || ', ' || wydawcy_rec.nazwa;
            END IF;

            IF id = 0 THEN
                wydawcy := wydawcy_rec.nazwa;
                id := 1;
            END IF;
        END LOOP;
    CLOSE wydawcy_cur; 
    RETURN wydawcy;
END;
$$ LANGUAGE 'plpgsql';

-- Wszyscy producenci wybranej gry
CREATE OR REPLACE FUNCTION producenci_gry ( id_gry int )
RETURNS TEXT
AS $$
DECLARE
    id int;
    producenci TEXT DEFAULT '-';
    producenci_rec RECORD;
    producenci_cur CURSOR FOR 
    SELECT nazwa FROM projekt.gra_producent JOIN projekt.firma ON id_firma = id_producent WHERE id_gra = id_gry;
BEGIN
    id := 0;
    OPEN producenci_cur;
        LOOP
            FETCH producenci_cur INTO producenci_rec;
            EXIT WHEN NOT FOUND;

            IF id != 0 THEN
                producenci := producenci || ', ' || producenci_rec.nazwa;
            END IF;

            IF id = 0 THEN
                producenci := producenci_rec.nazwa;
                id := 1;
            END IF;
        END LOOP;
    CLOSE producenci_cur; 
    RETURN producenci;
END;
$$ LANGUAGE 'plpgsql';

-- Wszystkie platformy wybranej gry
CREATE OR REPLACE FUNCTION platformy_gry ( id_gry int )
RETURNS TEXT
AS $$
DECLARE
    id int;
    platformy TEXT DEFAULT '-';
    platformy_rec RECORD;
    platformy_cur CURSOR FOR 
    SELECT nazwa FROM projekt.gra_platforma JOIN projekt.platforma USING(id_platforma) WHERE id_gra = id_gry;
BEGIN
    id := 0;
    OPEN platformy_cur;
        LOOP
            FETCH platformy_cur INTO platformy_rec;
            EXIT WHEN NOT FOUND;

            IF id != 0 THEN
                platformy := platformy || ', ' || platformy_rec.nazwa;
            END IF;

            IF id = 0 THEN
                platformy := platformy_rec.nazwa;
                id := 1;
            END IF;
        END LOOP;
    CLOSE platformy_cur; 
    RETURN platformy;
END;
$$ LANGUAGE 'plpgsql';