export interface PerformanceTicketPrice {
    performanceTicketPriceId: number;
    performanceId: number;
    seatTypeId: number;
    seatTypeName: string;
    price: number;
  }
  
export interface PerformanceWithPrices {
    performanceId?: number;
    performance_title: string;
    performance_description: string;
    performance_date: Date;
    hallId: number;
    ticketPrices: PerformanceTicketPrice[];
    actors?: number[];
    director?: string;
    adaptation?: string;
    dramaturg?: string;
    scenographer?: string;
    costumeDesigner?: string;
    music?: string;
    stageSpeech?: string;
    stageManager?: string;
  }
  