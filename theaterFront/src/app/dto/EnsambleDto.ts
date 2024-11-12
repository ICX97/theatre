export interface EnsembleDto {
    firstName: string; 
    lastName: string; // Prezime glumca
    birthYear: number | undefined; // Godina rođenja
    ensemble_description?: string; // Opis glumca (opcionalno)
}