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