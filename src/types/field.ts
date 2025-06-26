export interface Field {
    id: string;
    name: string;
    sport: string;
    description: string;
    images: string[];
    amenities: string[];
    hourlyRate: number;
    peakRate: number;
    openTime: string;
    closeTime: string;
    isActive: boolean;
    location: string;
    capacity: number;
    rating: number;
    totalBookings: number;
  }