export interface OriginLocation {
    name: string;
    url: string;
  }
  
  export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: OriginLocation;
    location: OriginLocation;
    image: string;
    episode: string[];
    url: string;
    created: string;
  }
