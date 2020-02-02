### GRAWEB - Bazy danych I - Projekt - Hubert Jakubek

Serwer Node.js udostępniający REST API dla projektu.

Dokumentacja i kod SQL w folderze docs.

#### Uruchamianie serwera

1. Aby uruchomić serwer i poprawnie połączyć się z bazą danych trzeba stworzyć plik .env z następującymi wartościami:
    ```
    DB_USER='nazwa użytkownika bazy danych'
    DB_USER_PASS='hasło do bazy danych'
    DB_HOST='host bazy danych'
    DB_PORT='port bazy danych'
    DB_NAME='nazwa bazy danych'

    PRIVATE_KEY='klucz prywatny używany do szyfrowania tokenów JWT, można wpisać cokolwiek'
    ```

2. Następnie należy wejść do folderu /docs/SQL i wykonać wszystkie pliki .sql w terminalu PostgreSQL wykonując plik exec.sql (UWAGA! Polecenia SQL usuwają scheme o nazwie Projekt).

3. Kolejnym krokiem jest pobranie modułów node komendą `npm install`. Po zakończeniu instalacji modułów możemy uruchomić serwer komendą `npm start`.
Serwer zostanie uruchomiony domyślnie na porcie `3001`.