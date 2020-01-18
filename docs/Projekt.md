### Encyklopedia gier komputerowych - Bazy danych I - Projekt - Hubert Jakubek

### I. Projekt koncepcji, założenia

1. #### Temat projektu

    Encyklopedia gier komputerowych to zbiór gier, wydawców, producentów, gatunków oraz platform.
    Projekt zawierać będzie również użytkowników. Każdy użytkownik będzie mógł przypisać gry
    do swojej personalnej listy gier. Projekt ma umożliwić użytkownikowi przeglądanie bazy danych 
    gier komputerowych, pisanie recenzji oraz prowadzenie własnej listy gier, którymi jest zainteresowany.
    
    Baza danych zawierać będzie:
    - gry komputerowe,
    - gatunki gier,
    - firmy (wydawcy, producenci),
    - platformy (PC, konsole),
    - użytkowników,
    - oraz recenzje napisane przez użytkowników.

2. #### Analiza wymagań użytkownika

    Baza danych będzie pozwalała użytkownikowi na:
    - Dodawanie, usuwanie i modyfikację danych we wszystkich tabelach (operacje dostępne tylko dla użytkowników o atrybucie admin równym True).
    - Dodawanie, usuwanie i modyfikację gier znajdujących się na personalnej liście użytkownika.
    - Przeglądanie zawartości personalnej listy użytkownika.
    - Przeglądanie wszystkich gier pogrupowanych według wybranej kategorii (np. według gatunku, czy producenta).
    - Przeglądanie wszystkich gier posortowanych po atrybutach (np. 100 najwyżej ocenianych gier).

3. #### Funkcjonalność bazy danych

    - Relacje pozwalające na grupowanie gier według kategorii, np. gry z danego gatunku, od danego producenta, na daną platformę.
    - Relacja powiązująca użytkowników z grami (funkcjonalność personalnej listy).
    - Widoki tworzące różne listy gier (np. najwyżej oceniane gry).
    - Zapytania tworzące statystki (np. ilość gier, które premierę miały w danym roku),
    które mogą zostać wykorzystane do stworzenia wykresów.
    - Funkcje pozwalające na wyświetlnie oraz modyfikację listy gier wybranego użytkownika.

### II. Projekt diagramów

4. #### Diagram ERD

    Diagram wykonany z użyciem SQL Power Architect.

    ![ERD](./erd.png "Schemat ERD (Ostatnia aktualizacja: 2019-12-27)")

### III. Projekt logiczny

5. #### Tabele, klucze

    Relacje w bazie danych encyklopedii gier można podzielić na trzy grupy:
    - Relacje związane z grami:
        - Gra - tabela zawierająca dane gier komputerowych, kluczem głównym jest "id_gra", zawiera klucz obcy "id_seria".
        - Firma - tabela zawierająca dane firm, które mogą być producentem lub wydwacą gry, kluczem głównym jest "id_firma".
        - Gatunek - tabela zawierająca gatunki gier, kluczem głównym jest "id_gatunek".
        - Seria_gier - tabela zawierająca tytuły serii gier, tabela słownikowa, kluczem głównym jest "id_seria".
        - Platforma - tabela zawierająca nazwy platform na których wydawane są gry, klucz główny "id_platforma".
    - Relacje związane z użytkownikiem:
        - Uzytkownik - tabela zawierająca dane użytkowników, kluczem głownym jest "id_uzytkownik"
    - Relacje związane z użytkownikiem oraz grami:
        - Uzytkownik_gra - tabela powiązująca gry z użytkownikami, zawiera ocenę jaką użytkownik wystawił danej grze, status gry
        oraz datę rozpoczęcia i ukończenia gry przez użytkownika, kluczem głównym są klucze obce "id_uzytkownika" oraz "id_gra", tabela zawiera również klucz obcy "id_status".
        - Status_gry - tabela słownikowa dla statusu gry, klucz głowny "id_status_gry".
        - Recenzja - tabela przechowująca dane recenzji, kluczem głownym są klucze obce "id_uzytkownika" oraz "id_gra".

    Kod SQL tworzący wszystkie tabele zawarte na diagramie oraz odpowiednie Schema znajduje się w pliku "tabele.sql".

6. #### Zapytania SQL oraz scieżki REST API

    - SQL - funkcje, widoki, wyzwalacze (pliki "funkcje.sql", "widoki.sql" oraz "wyzwalacze.sql"):
        - Najlepsze gry:
            - Widok "Najlepsze gry" - gry posortowane według średniej ocen
            - Funkcja "Najlepsze gry limit" - zwraca wybraną ilość gier z widoku "Najlepsze gry"
        - Najnowsze gry:
            - Widok "Najnowsze gry" - gry posortowane według daty wydania
        - Lista użytkownika:
            - Funkcja "Lista uzytkownika" - zwraca gry przypisane do danego użytkownika w tabeli "Uzytkownik_gra"
            - Funkcja "Dodaj gre do listy" - INSERT do tabeli "Uzytkownik_gra" z odpowiednim id zalogowanego użytkownika
            - Funkcja "Edytuj gre z listy" - UPDATE na tabeli "Uzytkownik_gra" z odpowiednim id zalogowanego użytkownika oraz id zmienianej gry
            - Funkcja "Usun gre z listy" - DELETE na tabeli "Uzytkownik_gra" z odpowiednim id zalogowanego użytkownika oraz id usuwanej gry 
        - Gry i wydawca/producent:
            - Widok "Gry wydawcy"/"Gry producenci" - widok przedstawiający JOIN tabeli "Gra" oraz "Wydawca"/"Producent"
            - Widok "Wydawcy gry"/"Producenci gry" - widok przedstawiajacy JOIN tabeli "Firma" (czyli wydawców/prodcentów) oraz "Gra_wydawca"/"Gra_producent"
        - Gry i gatunki:
            - Widok "Gry gatunki" - widok przedstawiający JOIN tabeli "Gra" z tabelą "Gatunek"
            - Widok "Gatunki gry" - widok przedstawiajacy JOIN tabeli "Gatunek" oraz "Gra_gatunek"
        - Gry i platformy:
            - Widok "Gry platformy" - widok przedstawiający JOIN tabeli "Gra" z tabelą "Platforma"
            - Widok "Platformy gry" - widok przedstawiajacy JOIN tabeli "Platforma" oraz "Gra_platforma"
        - Gry z serii:
            - Widok "Gry serie" - widok przedstawiający JOIN tabeli "Gra" z tabelą "Seria_gier"
        - Recenzje:
            - Widok "Recenzje uzytkownika" - widok przedstawiający JOIN tabeli "Uzytkownik" z tabelą "Recenzja"
            - Widok "Recenzje gry" - widok przedstawiający JOIN tabeli "Gra" z tabelą "Recenzja"
        - Pozostałe:
            - Wyzwalacz "Usuniecie gry" - wyzwalany przed DELETE na tabeli "Gra", usuwa rekordy o id usuwanej gry z pozostałych tabel

    - Pozostałe kwerendy razem z odpowiadajcymi im metodami REST API opisane są poniżej w formacie:
        - (Autoryzowana - opcjonalne) "metoda zapytania HTTP" "względna ścieżka" - "opis odpowiadającego zapytania SQL" 
        - Przykład 1: POST /przyklad - INSERT dodający jakieś dane
        - (Autoryzowana) POST /uzytkownik/lista - funkcja "Dodaj gre do listy"

    - Metody związane z tabelą Gra - scieżka API /gra:
        - GET / - SELECT wszystkich gier
        - GET /:id_gra - SELECT jednej gry
        - podścieżka API /detale:
            - "detale" gry odnoszą się do wszystkich danych związanych z grą, ale nie zawartych w tabeli Gra np. gatunek gry
            - GET / - wszystkie detale, czyli cała zawartość tabeli "Gatunek", "Firma" oraz "Platforma"
            - GET /:id_gra - wszystkie detale jednej gry
        - GET /top/:ilosc_gier - SELECT :ilosc_gier ilości gier z widoku "Najlepsze gry" (gry posortowane według średniej ocen)
        - POST /tytul - SELECT gry o tytule zawierającym "tytul" przesłany w ciele zapytania POST
        - GET /najnowsze/:ilosc_gier - SELECT :ilosc_gier ilości gier z widoku "Najnowsze gry" (gry posortowane według daty wydania)

    - Metody związane z tabelą Uzytkownik - scieżka API /uzytkownik:
        - GET / - SELECT wszystkich użytkowników
        - GET /:id_uzytkownik - SELECT jednego użytkownika
        - POST /login - logowanie, SELECT sprawdzający czy istnieje użytkownik o danym loginie i haśle i zwracający id_uzytkownik, imie oraz czy użytownik jest administratorem
        - POST /rejestracja - INSERT jednego użytkownika

    - Metody związane z tabelami Uzytkownik oraz Gra:
        - GET /uzytkownik/lista/:id_uzytkownik - funkcja "Lista uzytkownika"
        - (Autoryzowana) POST /uzytkownik/lista - funkcja "Dodaj gre do listy"
        - (Autoryzowana) PUT /uzytkownik/lista - funkcja "Edytuj gre z listy"
        - (Autoryzowana) DELETE /uzytkownik/lista - funkcja "Usun gre z listy"
        - GET /recenzje - SELECT wszystkich recenzji
        - GET /recenzje/ostatnie - SELECT najnowszych recenzji (np. 10 ostatnich)
        - GET /recenzje/uzytkownik/:id_uzytkownik - SELECT recenzji danego użytkownika
        - GET /recenzje/gra/:id_gra - SELECT recenzji danej gry
        - (Autoryzowana) POST /recenzje/gra/:id_gra - INSERT recenzji zalogowanego użytkownka do danej gry

    - Operacje DML dla pozostałych tabel - scieżka API /admin:
        - (Autoryzowana) POST / - INSERT jednej gry razem z jej detalami
        - Poniższe ścieżki odpowiadają nazwie tabeli na której chcemy wykonać zapytanie SQL. Jedno id potrzebne do UPDATE/DELETE jest zawarte w URI danej metody. Aby wykonać UPDATE/DELETE na tabeli o kluczu głównym złożonym z kilku atrybutów wtedy id należy wysłać w ciele zapytania (np. gdy usuwamy recenzje).
        - Wszystkie poniższe ścieżki są (Autoryzowane)
        - POST /nazwa_tabeli - INSERT na dowolnej tabeli
        - PUT /nazwa_tabeli/:id - UPDATE na dowolnej tabeli, dla rekordu o PK równym "id"
        - DELETE /nazwa_tabeli/:id - DELETE rekordu o PK równym "id"

7. #### Użyte technologie

    Projekt będzie składał się z trzech głównych części: 
    - aplikacji internetowej klienta typu Single Page Application, 
    - serwera, który będzie udostępniał REST API dla aplikacji klienta,
    - bazy danych PostgreSQL.

    Technologie użyte w aplikacji klienta:
    - [React.js](https://reactjs.org/) - biblioteka JavaScript umożliwiająca tworzenie interaktywnych interfejsów użytkownika,
    - [Material-UI](https://material-ui.com/) - moduł dla biblioteki React udostępniający komponenty spełniające zasady [Material Design](https://material.io/design/) firmy Google.

    Technologie użyte po stronie serwera:
    - [Node.js](https://nodejs.dev/) - środowisko uruchomieniowe JavaScript, pozwala na użycie tego języka poza przeglądarką,
    - [Express.js](https://expressjs.com/) - moduł Node udostępniąjący wiele przydatnych funkcjonalności do tworzenia aplikacji internetowych,
    - [PG](https://node-postgres.com/) - moduł Node pozwalający na połączenie z bazą danych PostgreSQL,
    - [JSON Web Tokens (JWT)](https://www.npmjs.com/package/jsonwebtoken) - moduł pozwalający na wykorzystanie standardu [RFC 7519](https://tools.ietf.org/html/rfc7519) do przesyłania informacji przez odpowiedzi na żądania HTTP.

    Inne użyte programy:
    - [SQL Power Architect](http://www.bestofbi.com/page/architect) - narzędzie pozwalające na projektowanie diagramów ERD oraz wygenerowanie kodu SQL tworzącego relacje znajdujące się na stworzonym ERD,
    - [Postman](https://www.getpostman.com/) - aplikacja pozwalająca na wysyłanie rządań HTTP.