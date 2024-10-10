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
    num_rows INT NOT NULL,  -- Broj redova u sali
    num_columns INT NOT NULL,  -- Broj kolona u sali
    total_seats INT NOT NULL  -- Ukupan broj sedišta u sali
);

-- Tabela za tipove sedišta
CREATE TABLE theatre.seat_type (
    seat_type_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    hall_id BIGINT,
    seat_type_name ENUM('PARTER', 'BALKON', 'LOŽA') NOT NULL,
    num_rows INT NOT NULL,  -- Broj redova za ovaj tip sedišta
    seats_per_row INT NOT NULL,  -- Broj sedišta po redu za ovaj tip sedišta
    FOREIGN KEY (hall_id) REFERENCES hall(hall_id)
);

-- Tabela za mesta u salama
CREATE TABLE theatre.seat (
    seat_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    hall_id BIGINT,
    seat_number VARCHAR(10) NOT NULL,
    seat_type_id BIGINT,
    side ENUM('LEFT', 'RIGHT') NOT NULL,  -- Strana ulaza (levi ili desni)
    row_num INT NOT NULL,  -- Red u kojem se sedište nalazi (promenjeno ime kolone)
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
    revenue DECIMAL(15, 2) DEFAULT 0,  -- Ukupni prihod sa predstave
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    poster_image LONGBLOB,
    FOREIGN KEY (hall_id) REFERENCES hall(hall_id)
);

-- Tabela za cene karata po predstavi i tipu sedišta
CREATE TABLE theatre.performance_ticket_price (
    performance_ticket_price_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    performance_id BIGINT,
    seat_type_id BIGINT,
    price DECIMAL(10, 2) NOT NULL,  -- Cena karte za određeni tip sedišta i predstavu
    FOREIGN KEY (performance_id) REFERENCES performance(performance_id),
    FOREIGN KEY (seat_type_id) REFERENCES seat_type(seat_type_id)
);

-- Tabela za korisnike
CREATE TABLE theatre.app_user (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(100) NOT NULL,  -- Promenjeno ime kolone
    user_email VARCHAR(100) NOT NULL UNIQUE,  -- Promenjeno ime kolone
    role_id BIGINT,
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

CREATE TABLE theatre.news (
    news_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    news_title VARCHAR(200) NOT NULL,
    news_date DATE,  
    news_description VARCHAR(10000),  
    news_image LONGBLOB  
);

-- Indeks za brže pretrage rezervacija
CREATE INDEX idx_reservation_user_performance ON theatre.reservation (user_id, performance_id);
