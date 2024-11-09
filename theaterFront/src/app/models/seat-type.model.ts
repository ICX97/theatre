export interface SeatType {
  seatTypeId: number;
  hallId: number;
  seatTypeName: 'PARTER' | 'BALKON' | 'LOZA';
  numRows: number;
  seatsPerRow: number;
}