export type PropertyStatus = "beschikbaar" | "onder-bod" | "verkocht" | "open-huis";

export type PropertyType =
  | "appartement"
  | "tussenwoning"
  | "hoekwoning"
  | "twee-onder-een-kap"
  | "vrijstaand";

export type PropertyRegion =
  | "Huizen"
  | "Bussum"
  | "Naarden"
  | "Blaricum"
  | "Laren"
  | "Hilversum";

export type EnergyLabel = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export interface PropertyAddress {
  street: string;
  city: string;
  region: PropertyRegion;
  postalCode: string;
}

export interface PropertyAgent {
  name: string;
  phone: string;
  photo: string;
}

export interface Property {
  id: number;
  slug: string;
  title: string;
  address: PropertyAddress;
  price: number;
  priceLabel: string;
  status: PropertyStatus;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  surfaceArea: number;
  plotSize: number;
  buildYear: number;
  energyLabel: EnergyLabel;
  features: string[];
  images: string[];
  description: string;
  listedDate: string;
  agent: PropertyAgent;
}

export type PriceRange =
  | "all"
  | "to-400"
  | "400-600"
  | "600-800"
  | "800-1000"
  | "above-1000";

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "surface-desc";

export interface PropertyFilters {
  priceRange: PriceRange;
  types: PropertyType[];
  region: PropertyRegion | "all";
  minBedrooms: number | null;
  sort: SortOption;
}
