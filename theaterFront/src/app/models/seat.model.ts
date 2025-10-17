export interface Seat {
  seatId: number;
  hallId: number;
  seatNumber: string;
  seatTypeId: number;
  seatTypeName: string;
  rowNum: number;
  isReserved: boolean;
}
