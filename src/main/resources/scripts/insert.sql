INSERT INTO theatre.role (name) VALUES ('ROLE_GUEST'), ('ROLE_USER'), ('ROLE_ADMIN');

INSERT INTO theatre.app_user (username, password, email, role_id) 
VALUES ('guest_user', 'hashed_password1', 'guest@example.com', 1),
       ('registered_user', 'hashed_password2', 'user@example.com', 2),
       ('admin_user', 'hashed_password3', 'admin@example.com', 3);

INSERT INTO theatre.performance (title, description, date) 
VALUES ('Hamlet', 'Tragedija Vilijama Šekspira.', '2024-09-15 19:00:00'),
       ('Romeo i Julija', 'Ljubavna tragedija Vilijama Šekspira.', '2024-09-17 20:00:00');

INSERT INTO theatre.reservation (user_id, performance_id, seat_number) 
VALUES (2, 1, 'A1'),
       (2, 2, 'B5');