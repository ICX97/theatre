-- Unos u tabelu `role`
INSERT INTO theatre.role (role_name) VALUES ('Admin');
INSERT INTO theatre.role (role_name) VALUES ('User');
INSERT INTO theatre.role (role_name) VALUES ('Guest');


INSERT INTO theatre.hall (hall_name, hall_description, num_rows, num_columns, total_seats) 
VALUES ('Grand Hall', 'A large hall with luxurious seating.', 20, 15, 300);

INSERT INTO theatre.hall (hall_name, hall_description, num_rows, num_columns, total_seats) 
VALUES ('Small Hall', 'A small hall suitable for intimate performances.', 10, 8, 80);

INSERT INTO theatre.seat_type (hall_id, seat_type_name, num_rows, seats_per_row) 
VALUES (1, 'PARTER', 10, 15);

INSERT INTO theatre.seat_type (hall_id, seat_type_name, num_rows, seats_per_row) 
VALUES (1, 'BALKON', 5, 15);

INSERT INTO theatre.seat_type (hall_id, seat_type_name, num_rows, seats_per_row) 
VALUES (2, 'PARTER', 5, 8);


INSERT INTO theatre.seat (hall_id, seat_number, seat_type_id, side, row_num, is_reserved) 
VALUES (1, 'A1', 1, 'LEFT', 1, FALSE);

INSERT INTO theatre.seat (hall_id, seat_number, seat_type_id, side, row_num, is_reserved) 
VALUES (1, 'A2', 1, 'LEFT', 1, FALSE);

INSERT INTO theatre.seat (hall_id, seat_number, seat_type_id, side, row_num, is_reserved) 
VALUES (1, 'B1', 2, 'RIGHT', 2, TRUE);

INSERT INTO theatre.seat (hall_id, seat_number, seat_type_id, side, row_num, is_reserved) 
VALUES (2, 'A1', 3, 'LEFT', 1, FALSE);

INSERT INTO theatre.performance (performance_title, performance_description, performance_date, hall_id, revenue) 
VALUES ('The Grand Performance', 'An epic show featuring amazing performances.', '2024-10-01 19:00:00', 1, 5000.00);

INSERT INTO theatre.performance (performance_title, performance_description, performance_date, hall_id, revenue) 
VALUES ('Intimate Show', 'A cozy performance with a close audience.', '2024-10-05 20:00:00', 2, 1000.00);

INSERT INTO theatre.performance_ticket_price (performance_id, seat_type_id, price) 
VALUES (1, 1, 50.00);

INSERT INTO theatre.performance_ticket_price (performance_id, seat_type_id, price) 
VALUES (1, 2, 75.00);

INSERT INTO theatre.performance_ticket_price (performance_id, seat_type_id, price) 
VALUES (2, 3, 30.00);

INSERT INTO theatre.app_user (username, user_password, user_email, role_id) 
VALUES ('admin', 'password123', 'admin@example.com', 1);

INSERT INTO theatre.app_user (username, user_password, user_email, role_id) 
VALUES ('johndoe', 'password456', 'johndoe@example.com', 2);

INSERT INTO theatre.app_user (username, user_password, user_email, role_id) 
VALUES ('guestuser', 'password789', 'guestuser@example.com', 3);

INSERT INTO theatre.reservation (user_id, performance_id, seat_id, reservation_date) 
VALUES (2, 1, 1, '2024-09-15 10:00:00');

INSERT INTO theatre.reservation (user_id, performance_id, seat_id, reservation_date) 
VALUES (3, 2, 4, '2024-09-16 11:00:00');

INSERT INTO theatre.news (news_title, news_date, news_description, news_image) VALUES
('Otvorena nova pozorišna sezona', '2024-09-01', 'Pozivamo vas da prisustvujete otvaranju nove pozorišne sezone sa raznovrsnim predstavama.', LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image1.jpg')),
('Gosti iz inostranstva', '2024-09-10', 'Naš teatar će ugostiti poznate umetnike iz inostranstva.', LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image2.jpg')),
('Radionice za decu', '2024-09-15', 'Organizujemo besplatne radionice za decu tokom letnjih meseci.', LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image3.jpg')),
('Nagradna igra', '2024-09-20', 'Učestvujte u našoj nagradnoj igri i osvojite karte za predstavu!', LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image4.jpg')),
('Predstava "Ljubav u doba kolere"', '2024-09-25', 'Ne propustite predstavu baziranu na romanu Gabriela Garcíe Márqueza.', LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image5.jpg'));

select * from theatre.performance;

-- Isprazni tabelu
DELETE FROM theatre.performance;

-- Unesi nove testne podatke
INSERT INTO theatre.performance (performance_title, performance_description, performance_date, hall_id, revenue, created_at, updated_at, poster_image) VALUES
('The Grand Performance', 'An epic show featuring amazing performances.', '2024-10-01 17:00:00', 1, 5000, NOW(), NOW(), LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image1.jpg')),
('Intimate Show', 'A cozy performance with a close audience.', '2024-10-05 18:00:00', 2, 1000, NOW(), NOW(), LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image2.jpg'));

UPDATE theatre.performance
SET poster_image = LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image1.jpg')
WHERE performance_title = 'The Grand Performance';

UPDATE theatre.performance
SET poster_image = LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image2.jpg')
WHERE performance_title = 'Intimate Show';

INSERT INTO theatre.ensemble (first_name, last_name, birth_year, ensemble_description, performance_id) VALUES 
('Marko', 'Marković', 1985, 'Glavni glumac sa bogatim iskustvom u klasičnim predstavama.', 1),
('Jelena', 'Jovanović', 1990, 'Izuzetna glumica poznata po modernim interpretacijama.', 1),
('Miloš', 'Petrović', 1983, 'Talentovani mladi glumac specijalizovan za komedije.', 2),
('Ana', 'Nikolić', 1988, 'Scenska umetnica sa dugogodišnjim iskustvom u dramskim ulogama.', 2),
('Ivana', 'Kostić', 1979, 'Veteranka pozorišta, poznata po interpretaciji klasika.', 1),
('Lazar', 'Pavlović', 1992, 'Mladi glumac sa iskustvom u eksperimentalnim predstavama.', 2),
('Milica', 'Dimitrijević', 1991, 'Glumica specijalizovana za psihološke drame.', 1),
('Nikola', 'Ilić', 1987, 'Talentovani glumac sa međunarodnim iskustvom.', 2),
('Sofija', 'Stojanović', 1985, 'Iskusna glumica koja se bavi i režijom.', 1),
('Vladimir', 'Živanović', 1993, 'Mladi glumac sa izuzetnim darom za komične uloge.', 2);

INSERT INTO theatre.ensemble_performance (ensemble_id, performance_id) VALUES 
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 1),
(6, 2),
(7, 1),
(8, 2),
(9, 1),
(10, 2);