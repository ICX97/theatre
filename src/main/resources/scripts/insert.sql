-- Osnovni podaci za bazu
USE theatre;

-- Dodavanje uloga
INSERT INTO theatre.role (role_name) VALUES ('ROLE_USER'), ('ROLE_ADMIN');

-- Dodavanje sala
INSERT INTO theatre.hall (hall_name, hall_description, num_rows, num_columns, total_seats) VALUES 
('Glavna sala', 'Glavna pozorišna sala sa 600 sedišta', 20, 30, 600),
('Mala sala', 'Mala pozorišna sala sa 375 sedišta', 15, 25, 375);

-- Dodavanje tipova sedišta
INSERT INTO theatre.seat_type (hall_id, seat_type_name, num_rows, seats_per_row) VALUES 
(1, 'PARTER', 15, 30),
(1, 'BALKON', 5, 30),
(1, 'LOŽA', 2, 15),
(2, 'PARTER', 12, 25),
(2, 'BALKON', 3, 25),
(2, 'LOŽA', 1, 10);

-- Kreiranje sedišta za Glavnu salu (hall_id = 1)
-- PARTER: 15 redova x 30 sedišta = 450 sedišta
INSERT INTO theatre.seat (hall_id, seat_number, seat_type_id, row_num, is_reserved) 
SELECT 1, CONCAT('P', LPAD(row_num, 2, '0'), '-', LPAD(seat_num, 2, '0')), 
       (SELECT seat_type_id FROM theatre.seat_type WHERE hall_id = 1 AND seat_type_name = 'PARTER'),
       row_num, FALSE
FROM (
    SELECT row_num, seat_num
    FROM (
        SELECT a.row_num, b.seat_num
        FROM (SELECT 1 as row_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 
              UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
              UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15) a
        CROSS JOIN (
            SELECT 1 as seat_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 
            UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
            UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15
            UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20
            UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION SELECT 25
            UNION SELECT 26 UNION SELECT 27 UNION SELECT 28 UNION SELECT 29 UNION SELECT 30
        ) b
    ) seats
) seat_combinations;

-- BALKON: 5 redova x 30 sedišta = 150 sedišta
INSERT INTO theatre.seat (hall_id, seat_number, seat_type_id, row_num, is_reserved) 
SELECT 1, CONCAT('B', LPAD(row_num, 2, '0'), '-', LPAD(seat_num, 2, '0')), 
       (SELECT seat_type_id FROM theatre.seat_type WHERE hall_id = 1 AND seat_type_name = 'BALKON'),
       row_num, FALSE
FROM (
    SELECT row_num, seat_num
    FROM (
        SELECT a.row_num, b.seat_num
        FROM (SELECT 1 as row_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5) a
        CROSS JOIN (
            SELECT 1 as seat_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 
            UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
            UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15
            UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20
            UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION SELECT 25
            UNION SELECT 26 UNION SELECT 27 UNION SELECT 28 UNION SELECT 29 UNION SELECT 30
        ) b
    ) seats
) seat_combinations;

-- LOŽA: 2 reda x 15 sedišta = 30 sedišta
INSERT INTO theatre.seat (hall_id, seat_number, seat_type_id, row_num, is_reserved) 
SELECT 1, CONCAT('L', LPAD(row_num, 2, '0'), '-', LPAD(seat_num, 2, '0')), 
       (SELECT seat_type_id FROM theatre.seat_type WHERE hall_id = 1 AND seat_type_name = 'LOŽA'),
       row_num, FALSE
FROM (
    SELECT row_num, seat_num
    FROM (
        SELECT a.row_num, b.seat_num
        FROM (SELECT 1 as row_num UNION SELECT 2) a
        CROSS JOIN (
            SELECT 1 as seat_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 
            UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
            UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15
        ) b
    ) seats
) seat_combinations;

-- Kreiranje sedišta za Malu salu (hall_id = 2)
-- PARTER: 12 redova x 25 sedišta = 300 sedišta
INSERT INTO theatre.seat (hall_id, seat_number, seat_type_id, row_num, is_reserved) 
SELECT 2, CONCAT('P', LPAD(row_num, 2, '0'), '-', LPAD(seat_num, 2, '0')), 
       (SELECT seat_type_id FROM theatre.seat_type WHERE hall_id = 2 AND seat_type_name = 'PARTER'),
       row_num, FALSE
FROM (
    SELECT row_num, seat_num
    FROM (
        SELECT a.row_num, b.seat_num
        FROM (SELECT 1 as row_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 
              UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
              UNION SELECT 11 UNION SELECT 12) a
        CROSS JOIN (
            SELECT 1 as seat_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 
            UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
            UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15
            UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20
            UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION SELECT 25
        ) b
    ) seats
) seat_combinations;

-- BALKON: 3 reda x 25 sedišta = 75 sedišta
INSERT INTO theatre.seat (hall_id, seat_number, seat_type_id, row_num, is_reserved) 
SELECT 2, CONCAT('B', LPAD(row_num, 2, '0'), '-', LPAD(seat_num, 2, '0')), 
       (SELECT seat_type_id FROM theatre.seat_type WHERE hall_id = 2 AND seat_type_name = 'BALKON'),
       row_num, FALSE
FROM (
    SELECT row_num, seat_num
    FROM (
        SELECT a.row_num, b.seat_num
        FROM (SELECT 1 as row_num UNION SELECT 2 UNION SELECT 3) a
        CROSS JOIN (
            SELECT 1 as seat_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 
            UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
            UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15
            UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20
            UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION SELECT 25
        ) b
    ) seats
) seat_combinations;

-- LOŽA: 1 red x 10 sedišta = 10 sedišta
INSERT INTO theatre.seat (hall_id, seat_number, seat_type_id, row_num, is_reserved) 
SELECT 2, CONCAT('L', LPAD(row_num, 2, '0'), '-', LPAD(seat_num, 2, '0')), 
       (SELECT seat_type_id FROM theatre.seat_type WHERE hall_id = 2 AND seat_type_name = 'LOŽA'),
       row_num, FALSE
FROM (
    SELECT row_num, seat_num
    FROM (
        SELECT a.row_num, b.seat_num
        FROM (SELECT 1 as row_num) a
        CROSS JOIN (
            SELECT 1 as seat_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 
            UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
        ) b
    ) seats
) seat_combinations;

-- Dodavanje korisnika
-- Admin korisnik - lozinka: admin
INSERT INTO theatre.app_user (username, user_password, user_email, role_id, is_email_verified) 
SELECT 'admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@theater.com', role_id, TRUE
FROM theatre.role 
WHERE role_name = 'ROLE_ADMIN' 
LIMIT 1;

-- Običan korisnik - lozinka: user
INSERT INTO theatre.app_user (username, user_password, user_email, role_id, is_email_verified) 
SELECT 'user', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user@theater.com', role_id, TRUE
FROM theatre.role 
WHERE role_name = 'ROLE_USER' 
LIMIT 1;

-- Dodavanje predstava
INSERT INTO theatre.performance 
(performance_title, performance_description, performance_date, hall_id, revenue, director, adaptation, dramaturg, scenographer, costume_designer, music, stage_speech, stage_manager) 
VALUES 
('Hamlet - Moderna Interpretacija', 'Šekspirov Hamlet u savremenom okruženju. Tragična priča o princu koji se bori sa izdajom i osvetom.', '2025-09-15 19:30:00', 1, 0.00, 'Milan Petrović', 'Prema V. Šekspiru', 'Ana Jovanović', 'Marko Nikolić', 'Jelena Kostić', 'Symphony Orchestra', 'Petar Marković', 'Stefan Đorđević'),

('Romeo i Julija', 'Večna ljubavna priča o dvoje mladih ljubavnika iz zavađenih porodica. Romantična tragedija koja će vas dirnuti do suza.', '2025-09-22 20:00:00', 2, 0.00, 'Sofija Ilić', 'Prema V. Šekspiru', 'Nikola Pavlović', 'Ivana Stojanović', 'Miloš Đukić', 'Chamber Music Ensemble', 'Dragana Petrović', 'Aleksandar Vuković'),

('Moliere - Tartif', 'Komedija o licemerju i lažnoj pobožnosti. Moliereov klasik koji i danas aktuelno govori o društvenim porocima.', '2025-09-29 19:00:00', 1, 0.00, 'Vladimir Živanović', 'Prema Moliereu', 'Milica Dimitrijević', 'Lazar Pavlović', 'Sofija Stojanović', 'Baroque Ensemble', 'Nikola Ilić', 'Marko Marković');

-- Dodavanje glumaca
INSERT INTO theatre.ensemble (first_name, last_name, birth_year, ensemble_description) VALUES 
('Milan', 'Petrović', 1980, 'Iskusan glumac specijalizovan za klasične uloge. Poznat po interpretaciji Hamleta i drugih Šekspirovih likova.'),
('Ana', 'Jovanović', 1985, 'Talentovana glumica sa bogatim iskustvom u dramskim ulogama. Izuzetna u psihološkim interpretacijama.'),
('Marko', 'Nikolić', 1982, 'Mladi glumac sa energičnim pristupom. Specijalizovan za komične uloge i savremene drame.'),
('Jelena', 'Kostić', 1988, 'Glumica sa međunarodnim iskustvom. Poznata po interpretaciji jakih ženskih likova.'),
('Stefan', 'Đorđević', 1975, 'Veteran pozorišta sa preko 20 godina iskustva. Izuzetan u karakter ulogama.');

-- Dodavanje cena karata
-- Cene za Hamlet
INSERT INTO theatre.performance_ticket_price (performance_id, seat_type_id, price) 
SELECT p.performance_id, st.seat_type_id, 1200.00
FROM theatre.performance p, theatre.seat_type st
WHERE p.performance_title = 'Hamlet - Moderna Interpretacija' AND st.seat_type_name = 'PARTER' AND st.hall_id = 1
UNION ALL
SELECT p.performance_id, st.seat_type_id, 800.00
FROM theatre.performance p, theatre.seat_type st
WHERE p.performance_title = 'Hamlet - Moderna Interpretacija' AND st.seat_type_name = 'BALKON' AND st.hall_id = 1
UNION ALL
SELECT p.performance_id, st.seat_type_id, 1500.00
FROM theatre.performance p, theatre.seat_type st
WHERE p.performance_title = 'Hamlet - Moderna Interpretacija' AND st.seat_type_name = 'LOŽA' AND st.hall_id = 1;

-- Cene za Romeo i Julija
INSERT INTO theatre.performance_ticket_price (performance_id, seat_type_id, price) 
SELECT p.performance_id, st.seat_type_id, 1000.00
FROM theatre.performance p, theatre.seat_type st
WHERE p.performance_title = 'Romeo i Julija' AND st.seat_type_name = 'PARTER' AND st.hall_id = 2
UNION ALL
SELECT p.performance_id, st.seat_type_id, 600.00
FROM theatre.performance p, theatre.seat_type st
WHERE p.performance_title = 'Romeo i Julija' AND st.seat_type_name = 'BALKON' AND st.hall_id = 2
UNION ALL
SELECT p.performance_id, st.seat_type_id, 1200.00
FROM theatre.performance p, theatre.seat_type st
WHERE p.performance_title = 'Romeo i Julija' AND st.seat_type_name = 'LOŽA' AND st.hall_id = 2;

-- Cene za Tartif
INSERT INTO theatre.performance_ticket_price (performance_id, seat_type_id, price) 
SELECT p.performance_id, st.seat_type_id, 1100.00
FROM theatre.performance p, theatre.seat_type st
WHERE p.performance_title = 'Moliere - Tartif' AND st.seat_type_name = 'PARTER' AND st.hall_id = 1
UNION ALL
SELECT p.performance_id, st.seat_type_id, 750.00
FROM theatre.performance p, theatre.seat_type st
WHERE p.performance_title = 'Moliere - Tartif' AND st.seat_type_name = 'BALKON' AND st.hall_id = 1
UNION ALL
SELECT p.performance_id, st.seat_type_id, 1400.00
FROM theatre.performance p, theatre.seat_type st
WHERE p.performance_title = 'Moliere - Tartif' AND st.seat_type_name = 'LOŽA' AND st.hall_id = 1;

-- Povezivanje glumaca sa predstavama
-- Hamlet
INSERT INTO theatre.ensemble_performance (ensemble_id, performance_id) 
SELECT e.ensemble_id, p.performance_id 
FROM theatre.ensemble e, theatre.performance p 
WHERE e.first_name = 'Milan' AND e.last_name = 'Petrović' AND p.performance_title = 'Hamlet - Moderna Interpretacija'
UNION ALL
SELECT e.ensemble_id, p.performance_id 
FROM theatre.ensemble e, theatre.performance p 
WHERE e.first_name = 'Ana' AND e.last_name = 'Jovanović' AND p.performance_title = 'Hamlet - Moderna Interpretacija'
UNION ALL
SELECT e.ensemble_id, p.performance_id 
FROM theatre.ensemble e, theatre.performance p 
WHERE e.first_name = 'Marko' AND e.last_name = 'Nikolić' AND p.performance_title = 'Hamlet - Moderna Interpretacija';

-- Romeo i Julija
INSERT INTO theatre.ensemble_performance (ensemble_id, performance_id) 
SELECT e.ensemble_id, p.performance_id 
FROM theatre.ensemble e, theatre.performance p 
WHERE e.first_name = 'Ana' AND e.last_name = 'Jovanović' AND p.performance_title = 'Romeo i Julija'
UNION ALL
SELECT e.ensemble_id, p.performance_id 
FROM theatre.ensemble e, theatre.performance p 
WHERE e.first_name = 'Marko' AND e.last_name = 'Nikolić' AND p.performance_title = 'Romeo i Julija'
UNION ALL
SELECT e.ensemble_id, p.performance_id 
FROM theatre.ensemble e, theatre.performance p 
WHERE e.first_name = 'Jelena' AND e.last_name = 'Kostić' AND p.performance_title = 'Romeo i Julija';

-- Tartif
INSERT INTO theatre.ensemble_performance (ensemble_id, performance_id) 
SELECT e.ensemble_id, p.performance_id 
FROM theatre.ensemble e, theatre.performance p 
WHERE e.first_name = 'Stefan' AND e.last_name = 'Đorđević' AND p.performance_title = 'Moliere - Tartif'
UNION ALL
SELECT e.ensemble_id, p.performance_id 
FROM theatre.ensemble e, theatre.performance p 
WHERE e.first_name = 'Milan' AND e.last_name = 'Petrović' AND p.performance_title = 'Moliere - Tartif';

-- Proveri rezultat
SELECT 'Baza podataka je uspešno popunjena!' as status;

-- Prikaži osnovne statistike
SELECT 
    'Role' as tabela, COUNT(*) as broj_zapisa FROM theatre.role
UNION ALL
SELECT 
    'Hall' as tabela, COUNT(*) as broj_zapisa FROM theatre.hall
UNION ALL
SELECT 
    'Seat Type' as tabela, COUNT(*) as broj_zapisa FROM theatre.seat_type
UNION ALL
SELECT 
    'Seat' as tabela, COUNT(*) as broj_zapisa FROM theatre.seat
UNION ALL
SELECT 
    'Performance' as tabela, COUNT(*) as broj_zapisa FROM theatre.performance
UNION ALL
SELECT 
    'Ensemble' as tabela, COUNT(*) as broj_zapisa FROM theatre.ensemble
UNION ALL
SELECT 
    'App User' as tabela, COUNT(*) as broj_zapisa FROM theatre.app_user
UNION ALL
SELECT 
    'Performance Ticket Price' as tabela, COUNT(*) as broj_zapisa FROM theatre.performance_ticket_price
UNION ALL
SELECT 
    'Ensemble Performance' as tabela, COUNT(*) as broj_zapisa FROM theatre.ensemble_performance;