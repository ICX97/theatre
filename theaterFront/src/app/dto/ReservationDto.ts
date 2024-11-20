export interface ReservationDTO {
    userId: number;
    performanceId: number;
    seatIds: number[]; 
    reservationDate: Date;
  }