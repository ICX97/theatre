USE railway;

-- 1) Insert seat_type (bez duplikata)
INSERT INTO railway.seat_type (hall_id, seat_type_name, num_rows, seats_per_row) VALUES
(1, 'PARTER', 10, 10),
(1, 'LOŽA',   2,  8),  
(1, 'BALKON', 5, 12);  

INSERT INTO railway.seat_type (hall_id, seat_type_name, num_rows, seats_per_row) VALUES
(2, 'PARTER', 5,  10),
(2, 'LOŽA',   2,  4),  
(2, 'BALKON', 3,  8);  

-- 2) Generate seats - JEDNOSTAVNO REŠENJE
-- Hall 1 - PARTER (seat_type_id = 1, 10 redova, 10 sedišta po redu)
INSERT INTO railway.seat (hall_id, seat_number, seat_type_id, row_num, is_reserved)
SELECT 1, CONCAT(CHAR(64 + row_num), seat_num), 1, row_num, FALSE
FROM (
  SELECT row_num, seat_num
  FROM (SELECT 1 row_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) r
  CROSS JOIN (SELECT 1 seat_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) s
) seats;

-- Hall 1 - LOŽA (seat_type_id = 2, 2 reda, 8 sedišta po redu)
INSERT INTO railway.seat (hall_id, seat_number, seat_type_id, row_num, is_reserved)
SELECT 1, CONCAT(CHAR(64 + row_num), seat_num), 2, row_num, FALSE
FROM (
  SELECT row_num, seat_num
  FROM (SELECT 1 row_num UNION SELECT 2) r
  CROSS JOIN (SELECT 1 seat_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8) s
) seats;

-- Hall 1 - BALKON (seat_type_id = 3, 5 redova, 12 sedišta po redu)
INSERT INTO railway.seat (hall_id, seat_number, seat_type_id, row_num, is_reserved)
SELECT 1, CONCAT(CHAR(64 + row_num), seat_num), 3, row_num, FALSE
FROM (
  SELECT row_num, seat_num
  FROM (SELECT 1 row_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5) r
  CROSS JOIN (SELECT 1 seat_num UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) s
) seats;

-- 3) Add test performance
INSERT INTO railway.performance 
(performance_title, performance_description, performance_date, hall_id, revenue, director, adaptation, dramaturg, scenographer, costume_designer, music, stage_speech, stage_manager) 
VALUES 
('Test Performance', 'Test description', '2025-12-01 20:00:00', 1, 0.00, 'Test Director', 'Test Adaptation', 'Test Dramaturg', 'Test Scenographer', 'Test Costume', 'Test Music', 'Test Speech', 'Test Manager');

-- 4) Add ticket prices for the test performance
INSERT INTO railway.performance_ticket_price (performance_id, seat_type_id, price) 
SELECT p.performance_id, st.seat_type_id, 
  CASE st.seat_type_name
    WHEN 'PARTER' THEN 1200
    WHEN 'LOŽA' THEN 1500
    WHEN 'BALKON' THEN 800
  END
FROM railway.performance p, railway.seat_type st
WHERE p.performance_title = 'Test Performance' AND st.hall_id = 1;

-- 5) Verify
SELECT 'Seat types:' as info;
SELECT * FROM railway.seat_type ORDER BY hall_id, seat_type_id;

SELECT 'Seats count:' as info;
SELECT COUNT(*) as seats_count FROM railway.seat;

SELECT 'Sample seats:' as info;
SELECT * FROM railway.seat ORDER BY hall_id, seat_type_id, seat_number LIMIT 20;

SELECT 'Performance:' as info;
SELECT * FROM railway.performance;

SELECT 'Ticket prices:' as info;
SELECT * FROM railway.performance_ticket_price;
