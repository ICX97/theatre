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

INSERT INTO theatre.performance 
(performance_title, performance_description, performance_date, hall_id, revenue, director, adaptation, dramaturg, scenographer, costume_designer, music, stage_speech, stage_manager, actors, poster_image) 
VALUES 
('The Grand Performance', 'An epic show featuring amazing performances.', '2024-10-01 19:00:00', 1, 5000.00, 'John Doe', 'Adapted from Classic', 'Jane Smith', 'Robert Brown', 'Alice Johnson', 'Symphony Orchestra', 'Peter Wilson', 'Carl Jones', 'Actor1, Actor2, Actor3', LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image1.jpg')),

('Intimate Show', 'A cozy performance with a close audience.', '2024-10-05 20:00:00', 2, 1000.00, 'Emily Clark', NULL, 'George Adams', 'Michael Lee', 'Sophia Green', 'Jazz Band', 'Anna White', 'David Wright', 'Actor4, Actor5, Actor6', LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image2.jpg')),

('Comedy Night', 'A night full of laughs and fun.', '2024-10-10 18:00:00', 1, 3000.00, 'Kevin Miles', 'Adapted from Satire', 'Lucy Scott', 'Oliver King', 'Ella Davis', 'Live Band', 'Mark Turner', 'Greg Hall', 'Actor7, Actor8, Actor9', LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image3.jpg')),

('Musical Extravaganza', 'A grand musical evening with multiple acts.', '2024-10-15 20:00:00', 2, 6000.00, 'Harper Lee', 'Adaptation of a Broadway Musical', 'Henry Martin', 'Lucas Young', 'Madison Harris', 'Orchestra', 'Alex Evans', 'Riley Moore', 'Actor10, Actor11, Actor12', LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image1.jpg')),

('Shakespeare\'s Hamlet', 'A classic performance of Hamlet.', '2024-10-20 19:30:00', 1, 4000.00, 'Emma Anderson', 'Original Script', 'Noah Baker', 'Ethan Thomas', 'Ava Hill', 'Classic Music', 'Olivia Mitchell', 'Carter Green', 'Actor13, Actor14, Actor15', LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image2.jpg')),

('Drama Fest', 'A mix of dramatic performances by emerging artists.', '2024-10-25 21:00:00', 2, 2500.00, 'Sophia Roberts', 'Adaptation of modern plays', 'Jacob Phillips', 'Isabella Clark', 'Mia Scott', 'Acoustic Music', 'Daniel Rodriguez', 'Luke Murphy', 'Actor16, Actor17, Actor18', LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image3.jpg')),

('Winter Wonderland', 'A holiday-themed performance.', '2024-12-01 18:00:00', 1, 3500.00, 'Mason Walker', 'Holiday Classics', 'Amelia Lewis', 'Logan Allen', 'Evelyn Martinez', 'Christmas Choir', 'Charlotte Perez', 'Grayson Campbell', 'Actor19, Actor20, Actor21', LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image1.jpg')),

('Spring Awakening', 'A fresh and vibrant musical about youth and rebellion.', '2024-03-10 19:00:00', 2, 5500.00, 'Jackson Rivera', 'Musical Adaptation', 'Lucas Ward', 'Benjamin Carter', 'Emily Cooper', 'Pop Music', 'Hannah Diaz', 'Oliver Foster', 'Actor22, Actor23, Actor24', LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image2.jpg')),

('Comedy Gala', 'An evening of stand-up comedy by famous comedians.', '2024-04-05 21:00:00', 1, 4500.00, 'Sofia Hughes', NULL, 'Michael Flores', 'Charlotte White', 'Grace Thompson', 'Live DJ', 'Eli Long', 'Joshua Sanders', 'Actor25, Actor26, Actor27', LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image3.jpg')),

('Festival of Lights', 'A celebration of light through music and dance.', '2024-05-15 20:00:00', 2, 7000.00, 'Victoria Russell', 'Cultural Adaptation', 'David Morgan', 'Natalie James', 'Zoey Harris', 'Classical Music', 'Aubrey Brooks', 'Evelyn Scott', 'Actor28, Actor29, Actor30', LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\image1.jpg'));


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