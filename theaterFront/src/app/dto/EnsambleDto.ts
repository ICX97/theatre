export interface EnsembleDto {
    ensembleId?: number; 
    firstName: string; 
    lastName: string; 
    birthYear: number | undefined; 
    ensemble_description?: string; 
    performances?: string[]; 
    hovered?: boolean;
    imageSrc?: string;
    actorImage?: File; 
}