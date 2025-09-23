
export type Availability = 'available' | 'online' | 'unavailable' | 'unknown';

export type Match = {
  image: string;
  brand: string;
  description: string;
  type: string;
  price: string;
  availability: Availability;
};

export type Product = {
  id: string;
  rank: number;
} & Match;
