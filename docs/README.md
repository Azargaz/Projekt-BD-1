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
    - Stworzenie konta/Zalogowanie się w celu przeglądania własnej listy gier.
    - Dodawanie, usuwanie i modyfikację danych we wszystkich tabelach (operacje dostępne tylko dla użytkowników typu administrator).
    - Po zalogowaniu dodawanie, usuwanie i modyfikację gier znajdujących się na personalnej liście użytkownika.
    - Przeglądanie zawartości personalnej listy dowolnego użytkownika.
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

    Kod SQL tworzący wszystkie tabele zawarte na diagramie oraz odpowiedni Schema znajduje się w pliku "tabele.sql".

6. #### Słowniki danych

    Projekt zawiera jeden słownik danych, którym jest tabela "Statusy gry". Relacja ta zawiera rekordy opisujące możliwe statusy gry znajdującej się na liście użytkownika. Każdy rekord składa się z id oraz statusu w postaci łańcucha znaków, który powinien opisywać jednym słowem lub krótkim zdaniem status gry.

    Domyślne wartości statusów gier, dostępne w pliku "/SQL/test_dane.sql":
    1. 'Planowana' - użytkownik planuje zagrać w gre, jest nią zainteresowany,
    2. 'W trakcie' - użytkownik zaczął gre, jednak jej nie ukończył,
    3. 'Zakończona' - użytkownik skończył daną grę i możę ją uznać za zakończoną.

8. #### Analiza postaci normalnej bazy danych

    Baza danych nie musiała być poddawana procesomi dekompozycji, ponieważ wszystkie tabele spełniają trzecią postać normalną 3NF.

9. #### Zapytania SQL oraz scieżki REST API

    - SQL - funkcje, widoki, wyzwalacze (pliki "funkcje.sql", "widoki.sql" oraz "wyzwalacze.sql"):
        - Najlepsze gry:
            - Widok "Najlepsze gry" - gry posortowane według średniej ocen,
            - Funkcja "Najlepsze gry limit" - zwraca wybraną ilość gier z widoku "Najlepsze gry".
        - Lista użytkownika:
            - Funkcja "Lista uzytkownika" - zwraca gry przypisane do danego użytkownika w tabeli "Uzytkownik_gra",
            - Funkcja "Gra z listy uzytkownika" - zwraca jedną gre o danym id_gra z przypisaną do danego użytkownika w tabeli "Uzytkownik_gra",
            - Funkcja "Dodaj gre do listy" - INSERT do tabeli "Uzytkownik_gra" z odpowiednim id zalogowanego użytkownika (id pobierane z nagłówka Authorization żądania do serwera),
            - Funkcja "Edytuj gre z listy" - UPDATE na tabeli "Uzytkownik_gra" z odpowiednim id zalogowanego użytkownika oraz id zmienianej gry,
            - Funkcja "Usun gre z listy" - DELETE na tabeli "Uzytkownik_gra" z odpowiednim id zalogowanego użytkownika oraz id usuwanej gry.
        - Gry i wydawca/producent:
            - Widok "Gry wydawcy"/"Gry producenci" - widok przedstawiający JOIN tabeli "Gra" oraz "Wydawca"/"Producent",
            - Widok "Wydawcy gry"/"Producenci gry" - widok przedstawiajacy JOIN tabeli "Firma" (czyli wydawców/prodcentów) oraz "Gra_wydawca"/"Gra_producent",
            - Funkcja "Wydawcy gry"/"Producenci gry" - funkcja zwracająca wydawców/producentów wybranej gry w postaci łańcucha znaków, który zawiera listę wydawców/producentów oddzielonych przecinkami.
        - Gry i gatunki:
            - Widok "Gry gatunki" - widok przedstawiający JOIN tabeli "Gra" z tabelą "Gatunek",
            - Widok "Gatunki gry" - widok przedstawiajacy JOIN tabeli "Gatunek" oraz "Gra_gatunek",
            - Funkcja "Gatunki gry" - funkcja zwracająca gatunki wybranej gry w postaci łańcucha znaków, który zawiera listę gatunków oddzielonych przecinkami.
        - Gry i platformy:
            - Widok "Gry platformy" - widok przedstawiający JOIN tabeli "Gra" z tabelą "Platforma",
            - Widok "Platformy gry" - widok przedstawiajacy JOIN tabeli "Platforma" oraz "Gra_platforma",
            - Funkcja "Platformy gry" - funkcja zwracająca platformy wybranej gry w postaci łańcucha znaków, który zawiera listę platform oddzielonych przecinkami.
        - Gry z serii:
            - Widok "Gry serie" - widok przedstawiający JOIN tabeli "Gra" z tabelą "Seria_gier".
        - Recenzje:
            - Widok "Recenzje uzytkownika" - widok przedstawiający JOIN tabeli "Uzytkownik" z tabelą "Recenzja".
            - Widok "Recenzje gry" - widok przedstawiający JOIN tabeli "Gra" z tabelą "Recenzja"
        - Usuwanie gier i użytkowników:
            - Funkcja "Usun gre" - funkcja wyzwalacza, usuwa rekordy z id_gra usuwanej gry z tabel asocajcyjnych,
            - Wyzwalacz "Usuniecie gry" - wyzwalany przed DELETE na tabeli "Gra", wywołuje funkcje "Usun gre",
            - Funkcja "Usun uzytkownika" - funkcja wyzwalacza, usuwa rekordy z id_uzytkownik usuwanego użytkownika z tabel asocjacyjnych,
            - Wyzwalacz "Usuniecie uzytkownika" - wyzwalany przed DELETE na tabeli "Uzytkownik", wywołuje funkcje "Usun uzytkownika".
        - Usuwanie detali (Firma/Gatunek/Platforma):
            - Funkcje "Usun [nazwa detalu]" - funkcje wyzwalaczy, usuwają rekordy z odpowiednim id usuwanego rekordu z tabel asocjacyjnych,
            - Wyzwalacze "Usuniecie [nazwa detalu]" - wyzwalane przed DELETE na tabeli "[nazwa detalu]", wywołuje funkcje "Usun [nazwa detalu]".
        - Usuwanie serii gier:
            - Funkcja "Usun serie gier" - funkcja wyzwalacza, aktualizuje rekordy w tabeli "Gra", w których id_serii jest równe id usuwanej serii gier, zmieniając wartość id_serii na NULL.
            - Wyzwalacz "Usuniecie serii gier" - wyzwalany przed DELETE na tabeli "Seria gier", wywołuje "Usun serie gier".

    - Pozostałe kwerendy razem z odpowiadającymi im metodami REST API opisane są poniżej w formacie:
        - (Autoryzowana/Administrator) "metoda zapytania HTTP" "względna ścieżka" - "opis odpowiadającego zapytania SQL",
        - Autoryzowana jest dostępna dla dowolnego zalogowanego użytkownika,
        - Administrator wymaga uprawnień administratora,
        - Przykład 1: POST /przyklad - INSERT dodający jakieś dane,
        - (Autoryzowana) POST /uzytkownik/lista - funkcja "Dodaj gre do listy".

    - Metody związane z tabelą Gra - scieżka API /gra:
        - GET / - SELECT wszystkich gier,
        - GET /:id_gra - SELECT jednej gry,
        - podścieżka API /detale:
            - "detale" gry odnoszą się do wszystkich danych związanych z grą, ale nie zawartych w tabeli Gra np. gatunek gry,
            - GET / - wszystkie detale, czyli cała zawartość tabeli "Gatunek", "Firma" oraz "Platforma",
            - GET /string/:id_gra - wszystkie detale jednej gry w postaci łańcuchów znaków,
            - GET /json/:id_gra - wszystkie detale jednej gry w postaci tabeli zapisanej jako JSON,
        - GET /top/:liczba_gier - SELECT :ilosc_gier ilości gier z widoku "Najlepsze gry" (gry posortowane według średniej ocen),
        - POST /tytul - SELECT gier o tytule zaczynającym się od wzorca zawartego w przesłanym ciele żądania POST.

    - Metody związane z tabelą Uzytkownik - scieżka API /uzytkownik:
        - GET /:id_uzytkownik - SELECT jednego użytkownika,
        - POST /login - logowanie, SELECT sprawdzający czy istnieje użytkownik o danym loginie i haśle i zwracający id_uzytkownik, imie oraz czy użytownik jest administratorem,
        - POST / - INSERT jednego użytkownika.

    - Metody związane z tabelami Uzytkownik oraz Gra:
        - GET /uzytkownik/lista/id/:id_uzytkownik - funkcja "Lista uzytkownika"
        - GET /uzytkownik/lista/id/:id_uzytkownik/:id_gra - funkcja "Gra z listy uzytkownika",
        - GET /uzytkownik/lista/statusy - pobranie wszystkich statusów dostępnych na liście gier, tabela "Status gry",
        - (Autoryzowana) POST /uzytkownik/lista - funkcja "Dodaj gre do listy",
        - (Autoryzowana) PUT /uzytkownik/lista - funkcja "Edytuj gre z listy",
        - (Autoryzowana) DELETE /uzytkownik/lista - funkcja "Usun gre z listy",
        - GET /recenzje/recenzja/:id_uzytkownik/:id_gra - SELECT jednej recenzji wybranej gry i użytkownika,
        - GET /recenzje/uzytkownik/:id_gra - SELECT recenzji danej gry zalogowanego użytkownika,
        - GET /recenzje/gra/:id_gra - SELECT recenzji danej gry,
        - (Autoryzowana) POST /recenzje/gra/:id_gra - INSERT recenzji danej gry od zalogowanego użytkownka.

    - Operacje DML dla wszystkich tabel - scieżka API /admin:
        - Poniższe ścieżki odpowiadają nazwie tabeli na której chcemy wykonać zapytanie SQL. Jedno id potrzebne do UPDATE/DELETE jest zawarte w URI danej metody w przypadku DELETE oraz w ciele żądania w przypadku UPDATE. Aby wykonać UPDATE/DELETE na tabeli o kluczu głównym złożonym z kilku atrybutów wtedy id należy wysłać w ciele zapytania (np. gdy usuwamy recenzje).
        - Wszystkie poniższe ścieżki są dla (Administratora),
        - POST /nazwa_tabeli - INSERT na dowolnej tabeli nieasocjacyjnej,
        - PUT /nazwa_tabeli - UPDATE na dowolnej tabeli (poza tabelami Recenzja i Uzytkownik),
        - DELETE /nazwa_tabeli/:id - DELETE rekordu o PK równym "id"

### IV. Projekt funkcjonalny

10. #### Interfejsy do prezentacji, edycji i obsługi danych

    Interfejs do obługi danych składa się z dwóch głównym komponentów - aplikacji internetowej klienta typu SPA oraz serwera Node.js udostepniającego REST API.
    Aplikacja klienta obsługuje dane pośrednio poprzez wykonywanie żadań do serwera, który komunikuję się z bazą danych PostgreSQL i wykonuje do niej zapytania.

11. #### Panel sterowania aplikacji



### V. Dokumentacja

16. #### Wprowadzanie danych

    Dane zostały wprowadzone ręcznie, są dostępne do ponownego wprowadzenia w postaci pliku "SQL/test_dane.sql", który zawiera INSERTy z przykładowymi danymi.

17. #### Dokumentacja użytkownika

    Użytkownik ma dostęp do aplikacji klienta w postaci strony typu SPA, która pozwala na prezentację oraz modyfikację danych (o ile pozwalają mu na to jego uprawnienia). W aplikacji mamy trzy typy użytkowników:
    - gość - użytkownik nie uwierzytelniony (nie zalogowany)
    - zalogowany - użytkownik uwierzytelniony
    - admin - użytkownik uwierzytelniony typu administrator

    Każdy kolejny użytkownik ma dostęp do tej samej części aplikacji co poprzedni, oraz do dodatkowych unikalnych dla tego użytkownika podstron:
    - gość - ma dostęp do listy wszystkich gier, wyszukiwania gier, strony z opisem pojedyńczej gry oraz list wszystkich użytkowników, jedyna unikalna strona dla gościa to panel logowania i rejestracji,
    - zalogowany - dodatkowo może dodawać/usuwać/modyfikować gry na swojej liście,
    - admin - pozwala na dostęp do panelu administratora, w którym mamy dostęp do formularzy dodawania/zmieniania danych oraz tabel wyświetlających zawartości wybranych relacji.

    Przykładowe użycie aplikacji:

18. #### Dokumentacja techniczna



19. #### Użyte technologie

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
    - [PG](https://node-postgres.com/) - moduł Node pozwalający na połączenie z bazą danych PostgreSQL.
    
    Moduły NPM użyte po stronie klienta i serwera:
    - [JSON Web Tokens (JWT)](https://www.npmjs.com/package/jsonwebtoken) - moduł pozwalający na wykorzystanie standardu [RFC 7519](https://tools.ietf.org/html/rfc7519) do przesyłania informacji w żądaniach/odpowiedziach HTTP.

    Inne użyte programy:
    - [SQL Power Architect](http://www.bestofbi.com/page/architect) - narzędzie pozwalające na projektowanie diagramów ERD oraz wygenerowanie kodu SQL tworzącego relacje znajdujące się na stworzonym ERD,
    - [Postman](https://www.getpostman.com/) - aplikacja pozwalająca na wysyłanie żądań HTTP.