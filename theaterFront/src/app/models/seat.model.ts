export interface Seat {
    seatId: number;
    hallId: number;
    seatNumber: string;
    seatTypeId: number;
    side: 'LEFT' | 'RIGHT';
    rowNum: number;
    isReserved: boolean;
  }
  