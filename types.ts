
export type TravelType = 'solo' | 'couple' | 'family' | 'friends';
export type BudgetStyle = 'budget' | 'mid-range' | 'premium';
export type TransportMode = 'Flight' | 'Train' | 'Road';

export interface TravelerComposition {
  adults: number;
  kids: number;
  seniors: number;
}

export interface HotelOption {
  name: string;
  pricePerNight: number;
  type: string;
  area: string;
  suitability: string;
  bookingUrl?: string;
}

export interface TripContext {
  mode: 'destination' | 'budget';
  origin: string;
  destination: string;
  startDate: string; // ISO date string
  durationDays: number;
  travelers: number;
  travelType: TravelType;
  fixedBudget?: number;
  budgetPreference?: BudgetStyle;
  travelerComposition?: TravelerComposition;
}

export interface TransportOption {
  type: TransportMode;
  provider: string; // Airline name (e.g. Indigo) or Train name (e.g. Vande Bharat)
  id: string; // Flight number (e.g. 6E 2134) or Train number (e.g. 22436)
  costPerPerson: number;
  timeHours: string;
  comfort: 'High' | 'Medium' | 'Low';
  reason: string;
}

export interface Activity {
  time: string; // e.g., "09:00 AM"
  description: string;
  duration: string; // e.g., "2 hours"
}

export interface DayItinerary {
  day: number;
  title: string;
  activities: Activity[];
  estimatedLocalCost: number;
}

export interface BudgetBreakdown {
  transport: number;
  accommodation: number;
  food: number;
  localTravel: number;
  activities: number;
  hiddenCosts: number;
  totalEstimated: number;
  rangeMin: number;
  rangeMax: number;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface MustVisitDestination {
  name: string;
  description: string;
  bestTime: string;
}

export interface MustTryFood {
  name: string;
  description: string;
  type: string; // e.g., "Veg", "Street Food"
  whereToTry: string;
}

export interface TripResponse {
  destinationTitle: string;
  destinationSummary: string;
  seasonalAdvice: string;
  transportOptions: TransportOption[];
  dailyLivingCosts: {
    hotel: number;
    food: number;
    localTransport: number;
  };
  hotelOptions: HotelOption[];
  stayStrategy: string;
  itinerary: DayItinerary[];
  mustVisitDestinations: MustVisitDestination[];
  mustTryFoods: MustTryFood[];
  budgetBreakdown: BudgetBreakdown;
  recommendation: string;
  sources?: GroundingSource[];
}

export interface User {
  name: string;
  email: string;
}
