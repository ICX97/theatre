export interface NewsDto {
    newsTitle: string;
    newsDate: Date; // Ostavite kao string, može biti datum u formatu YYYY-MM-DD
    newsDescription?: string; // Promenjeno iz Date u string
    newsImage?: string | null; 
}