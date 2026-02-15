import { TravelType, BudgetStyle } from './types.ts';

export const SUGGESTED_CITIES = [
  "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata", 
  "Pune", "Ahmedabad", "Jaipur", "Kochi", "Srinagar", "Leh", 
  "Guwahati", "Goa", "Shimla", "Manali", "Rishikesh", "Udaipur", 
  "Varanasi", "Munnar", "Kanyakumari", "Gangtok", "Pondicherry", 
  "Mysore", "Amritsar", "Darjeeling", "Hampi", "Madurai", "Shillong"
];

export const TRAVEL_TYPES: { value: TravelType; label: string; icon: string; desc: string }[] = [
  { value: 'solo', label: 'Solo', icon: '👤', desc: 'Cost-efficient & flexible' },
  { value: 'couple', label: 'Couple', icon: '💑', desc: 'Comfort & privacy' },
  { value: 'family', label: 'Family', icon: '👨‍👩‍👧', desc: 'Safety & pacing' },
  { value: 'friends', label: 'Friends', icon: '👯‍♂️', desc: 'Shared costs & fun' },
];

export const BUDGET_STYLES: { value: BudgetStyle; label: string; desc: string }[] = [
  { value: 'budget', label: 'Budget', desc: 'Hostels & public transport' },
  { value: 'mid-range', label: 'Mid-range', desc: 'Comfortable hotels & taxis' },
  { value: 'premium', label: 'Premium', desc: 'Luxury stays & flights' },
];