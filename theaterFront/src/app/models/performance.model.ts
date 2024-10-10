export interface Performance {
  performance_id: number; 
  performance_title: string; 
  performance_description?: string; 
  performance_date: Date; 
  hall_id: number; 
  revenue?: number;
  created_at?: Date; 
  updated_at?: Date; 
  poster_image?: string | null;
}