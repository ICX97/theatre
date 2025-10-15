export interface NewsDto {
    newsTitle: string;
    newsDate: Date; 
    newsDescription?: string; 
    newsImage?: string | null; 
}