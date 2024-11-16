export interface ReservationDTO {
    userId: number;
    performanceId: number;
    seatId: number[]; 
    reservationDate: Date;
  }