export interface PerformanceDTO {
    performanceId?: number;
    performance_title: string; 
    performance_description: string; 
    performance_date: Date; 
    hallId: number; 
    revenue?: number; 
    created_at?: Date; 
    updated_at?: Date | undefined; 
    poster_image?: string | number[];
    director?: string; 
    adaptation?: string; 
    dramaturg?: string;
    scenographer?: string; 
    costumeDesigner?: string;
    music?: string; 
    stageSpeech?: string;
    stageManager?: string;
    actors?: number[];
}