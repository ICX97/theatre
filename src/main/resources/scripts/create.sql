-- Kreiranje baze i strukture tabela
CREATE DATABASE IF NOT EXISTS theatre;
USE theatre;

-- Tabela za uloge
CREATE TABLE theatre.role (
    role_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);

-- Tabela za sale
CREATE TABLE theatre.hall (
    hall_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    hall_name VARCHAR(100) NOT NULL,
    hall_description TEXT,
    num_rows INT NOT NULL,
    num_columns INT NOT NULL,
    total_seats INT NOT NULL
);

-- Tabela za tipove sedišta
CREATE TABLE theatre.seat_type (
    seat_type_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    hall_id BIGINT,
    seat_type_name ENUM('PARTER', 'BALKON', 'LOŽA') NOT NULL,
    num_rows INT NOT NULL,
    seats_per_row INT NOT NULL,
    FOREIGN KEY (hall_id) REFERENCES hall(hall_id)
);

-- Tabela za mesta u salama
CREATE TABLE theatre.seat (
    seat_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    hall_id BIGINT,
    seat_number VARCHAR(10) NOT NULL,
    seat_type_id BIGINT,
    row_num INT NOT NULL,
    is_reserved BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (hall_id) REFERENCES hall(hall_id),
    FOREIGN KEY (seat_type_id) REFERENCES seat_type(seat_type_id)
);

-- Tabela za predstave
CREATE TABLE theatre.performance (
    performance_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    performance_title VARCHAR(100) NOT NULL,
    performance_description TEXT,
    performance_date TIMESTAMP NOT NULL,
    hall_id BIGINT,
    revenue DECIMAL(15, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    poster_image LONGBLOB,
    director VARCHAR(100),
    adaptation VARCHAR(100),
    dramaturg VARCHAR(100),
    scenographer VARCHAR(100),
    costume_designer VARCHAR(100),
    music VARCHAR(100),
    stage_speech VARCHAR(100),
    stage_manager VARCHAR(100),
    FOREIGN KEY (hall_id) REFERENCES hall(hall_id)
);

-- Tabela za cene karata po predstavi i tipu sedišta
CREATE TABLE theatre.performance_ticket_price (
    performance_ticket_price_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    performance_id BIGINT,
    seat_type_id BIGINT,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (performance_id) REFERENCES performance(performance_id),
    FOREIGN KEY (seat_type_id) REFERENCES seat_type(seat_type_id)
);

-- Tabela za korisnike
CREATE TABLE theatre.app_user (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) NOT NULL UNIQUE,
    role_id BIGINT,
    is_email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);

-- Tabela za rezervacije
CREATE TABLE theatre.reservation (
    reservation_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    performance_id BIGINT,
    seat_id BIGINT,
    reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES app_user(user_id),
    FOREIGN KEY (performance_id) REFERENCES performance(performance_id),
    FOREIGN KEY (seat_id) REFERENCES seat(seat_id)
);

-- Tabela za ansambl
CREATE TABLE theatre.ensemble (
    ensemble_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_year INT NOT NULL,
    ensemble_description TEXT
);

-- Tabela za povezivanje ansambla sa predstavama
CREATE TABLE theatre.ensemble_performance (
    ensemble_id BIGINT,
    performance_id BIGINT,
    PRIMARY KEY (ensemble_id, performance_id),
    FOREIGN KEY (ensemble_id) REFERENCES ensemble(ensemble_id),
    FOREIGN KEY (performance_id) REFERENCES performance(performance_id)
);

-- Tabela za vesti
CREATE TABLE theatre.news (
    news_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    news_title VARCHAR(200) NOT NULL,
    news_date DATE,
    news_description VARCHAR(10000),
    news_image LONGBLOB
);

-- Indeksi za brže pretrage
CREATE INDEX idx_reservation_user_performance ON theatre.reservation (user_id, performance_id);
CREATE INDEX idx_seat_hall_type ON theatre.seat (hall_id, seat_type_id);
CREATE INDEX idx_performance_date ON theatre.performance (performance_date);