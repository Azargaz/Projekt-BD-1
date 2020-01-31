-- Usuwanie gry z tabel asocjacyjnych

CREATE OR REPLACE FUNCTION usun_gre()
    RETURNS TRIGGER
    AS $$
    BEGIN
        DELETE FROM projekt.gra_producent
            WHERE id_gra = OLD.id_gra;
        DELETE FROM projekt.gra_wydawca
            WHERE id_gra = OLD.id_gra;
        DELETE FROM projekt.gra_gatunek
            WHERE id_gra = OLD.id_gra;
        DELETE FROM projekt.gra_platforma
            WHERE id_gra = OLD.id_gra;
        DELETE FROM projekt.uzytkownik_gra
            WHERE id_gra = OLD.id_gra;
        DELETE FROM projekt.recenzja
            WHERE id_gra = OLD.id_gra;
        RETURN OLD;
    END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER usuniecie_gry
    BEFORE DELETE ON gra
    FOR EACH ROW EXECUTE PROCEDURE projekt.usun_gre();



-- Usuwanie uzytkownika z tabel asocjacyjnych

CREATE OR REPLACE FUNCTION usun_uzytkownika()
    RETURNS TRIGGER
    AS $$
    BEGIN
        DELETE FROM projekt.uzytkownik_gra
            WHERE id_uzytkownik = OLD.id_uzytkownik;
        DELETE FROM projekt.recenzja
            WHERE id_uzytkownik = OLD.id_uzytkownik;
        RETURN OLD;
    END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER usuniecie_uzytkownika
    BEFORE DELETE ON uzytkownik
    FOR EACH ROW EXECUTE PROCEDURE projekt.usun_uzytkownika();



-- Usuwanie detali gry z tabel asocjacyjnych oraz aktualizacja tabeli gry w przypadku usuwania serii gier

-- Usuwanie firmy
CREATE OR REPLACE FUNCTION usun_firme()
    RETURNS TRIGGER
    AS $$
    BEGIN 
        DELETE FROM projekt.gra_producent
            WHERE id_producent = OLD.id_firma;
        DELETE FROM projekt.gra_wydawca
            WHERE id_wydawca = OLD.id_firma;
        RETURN OLD;
    END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER usuniecie_firmy
    BEFORE DELETE ON firma
    FOR EACH ROW EXECUTE PROCEDURE projekt.usun_firme();

-- Usuwanie gatunku
CREATE OR REPLACE FUNCTION usun_gatunek()
    RETURNS TRIGGER
    AS $$
    BEGIN 
        DELETE FROM projekt.gra_gatunek
            WHERE id_gatunek = OLD.id_gatunek;
        RETURN OLD;
    END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER usuniecie_gatunku
    BEFORE DELETE ON gatunek
    FOR EACH ROW EXECUTE PROCEDURE projekt.usun_gatunek();

-- Usuwanie platformy
CREATE OR REPLACE FUNCTION usun_platforme()
    RETURNS TRIGGER
    AS $$
    BEGIN 
        DELETE FROM projekt.gra_platforma
            WHERE id_platforma = OLD.id_platforma;
        RETURN OLD;
    END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER usuniecie_platformy
    BEFORE DELETE ON platforma
    FOR EACH ROW EXECUTE PROCEDURE projekt.usun_platforme();
    
-- Usuwanie serii gier
CREATE OR REPLACE FUNCTION usun_serie_gier()
    RETURNS TRIGGER
    AS $$
    BEGIN
        UPDATE projekt.gra SET id_seria=NULL WHERE id_seria = OLD.id_seria;
        RETURN OLD;
    END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER usuniecie_serii_gier
    BEFORE DELETE ON seria_gier
    FOR EACH ROW EXECUTE PROCEDURE projekt.usun_serie_gier();