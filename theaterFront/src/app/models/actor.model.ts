export interface Actor {
    ensembleId: number;
    firstName: string;
    lastName: string;
    birthYear: string;
    ensemble_description: string;
    performances: string[];
    hovered?: boolean;
    imageSrc?: string;
  }