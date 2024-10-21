export interface PerformanceTicketPrice {
    performanceTicketPriceId: number;
    performanceId: number;
    seatTypeId: number;
    price: number;
  }
  
export interface PerformanceWithPrices {
    performance_title: string;
    performance_description: string;
    performance_date: Date;
    hallId: number;
    ticketPrices: PerformanceTicketPrice[];
  }
  