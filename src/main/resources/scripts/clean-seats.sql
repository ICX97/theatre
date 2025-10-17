USE railway;

-- Drop foreign key constraints first
SET FOREIGN_KEY_CHECKS = 0;

-- Delete all seat-related data
DELETE FROM railway.reservation;
DELETE FROM railway.performance_ticket_price;
DELETE FROM railway.seat;
DELETE FROM railway.seat_type;
DELETE FROM railway.performance;
DELETE FROM railway.ensemble_performance;

-- Reset auto-increment
ALTER TABLE railway.seat AUTO_INCREMENT = 1;
ALTER TABLE railway.seat_type AUTO_INCREMENT = 1;
ALTER TABLE railway.performance AUTO_INCREMENT = 1;
ALTER TABLE railway.performance_ticket_price AUTO_INCREMENT = 1;
ALTER TABLE railway.reservation AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

SELECT 'Cleaned all seat/performance data' as status;
