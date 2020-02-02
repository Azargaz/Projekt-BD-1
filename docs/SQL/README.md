### GRAWEB - Bazy danych I - Projekt - Hubert Jakubek

Kod SQL wykorzystany do stworzenia relacji, widoków, funkcji i wyzwalaczy wymaganych do obsługi projektu po stronie bazy danych.

Opis plików:
- `exec.sql` - jeśli zostanie wykonany w konsoli PostgreSQL za pomocą komendy `\i exec.sql`, zostaną wykonane wszystkie poniższe pliki,
- `tabele.sql` - tworzy schema, ustawia ścieżke wyszukiwania na stworzoną scheme "projekt" i tworzy relacje oraz związki między nimi,
- `widoki.sql` - tworzy odpowiednie widoki, jeśli istnieją usuwa je,
- `funkcje.sql` - tworzy wszystkie funkcje,
- `wyzwalacze.sql` - tworzy wszystkie wyzwalacze i funkcje do nich potrzebne,
- `test_dane.sql` - plik zawiera INSERTy przykładowych danych, nie jest wymagany do poprawnego działania projektu, ale jest zalecany aby mieć dostęp do przykładowych kont użytkowników.