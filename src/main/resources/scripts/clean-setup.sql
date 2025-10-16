-- Čišćenje i reset korisnika
USE theatre;

-- Privremeno onemogući foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

-- Obriši sve rezervacije
DELETE FROM theatre.reservation;

-- Obriši sve korisnike
DELETE FROM theatre.app_user;

-- Obriši sve uloge
DELETE FROM theatre.role;

-- Uključi foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Dodaj uloge
INSERT INTO theatre.role (role_name) VALUES 
('ROLE_USER'),
('ROLE_ADMIN');

-- Dodaj admin korisnika - lozinka: admin
INSERT INTO theatre.app_user (username, user_password, user_email, role_id, is_email_verified) 
SELECT 'admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@theater.com', role_id, TRUE
FROM theatre.role 
WHERE role_name = 'ROLE_ADMIN' 
LIMIT 1;

-- Dodaj test korisnika - lozinka: user
INSERT INTO theatre.app_user (username, user_password, user_email, role_id, is_email_verified) 
SELECT 'user', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user@theater.com', role_id, TRUE
FROM theatre.role 
WHERE role_name = 'ROLE_USER' 
LIMIT 1;

-- Proveri rezultat
SELECT username, user_email, role_name, is_email_verified
FROM theatre.app_user au 
JOIN theatre.role r ON au.role_id = r.role_id 
WHERE username IN ('admin', 'user');
