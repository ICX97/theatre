import { PerformanceTicketPrice } from "./performance-ticket-price.model";

export interface Performance extends PerformanceTicketPrice {
  performanceId: number;
  performance_title: string;
  performance_description?: string;
  performance_date: Date;
  hallId: number;
  revenue?: number;
  created_at?: Date;
  updated_at?: Date;
  poster_image?: string | null;
  director?: string;
  adaptation?: string;
  dramaturg?: string;
  scenographer?: string;
  costumeDesigner?: string;
  music?: string;
  stageSpeech?: string;
  stageManager?: string;
  ticketPrices?: PerformanceTicketPrice[];
}
