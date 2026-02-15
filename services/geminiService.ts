import { TripContext, TripResponse } from "../types.ts";
import { getDemoPlan } from "./demoData.ts";

/**
 * OFFLINE VERSION: Returns local hardcoded suggestions.
 * No network calls are made.
 */
export async function getLocationSuggestions(input: string): Promise<string[]> {
  const normalized = input.toLowerCase();
  
  // Hardcoded suggestion map for the offline demo
  if (normalized.includes('goa')) {
    return ["Goa", "North Goa", "South Goa", "Panjim, Goa"];
  }
  if (normalized.includes('del') || normalized.includes('new')) {
    return ["Delhi", "New Delhi", "Indira Gandhi International Airport, Delhi"];
  }
  if (normalized.includes('mum')) {
    return ["Mumbai", "Navi Mumbai", "Chhatrapati Shivaji Terminal, Mumbai"];
  }
  if (normalized.includes('ban')) {
    return ["Bangalore", "Kempegowda, Bangalore"];
  }
  
  return ["Delhi", "Goa", "Mumbai", "Bangalore", "Jaipur"];
}

/**
 * OFFLINE VERSION: Generates a trip plan instantly using local demoData.
 * Simulates a delay for better UX but requires no internet or API keys.
 */
export async function generateTripPlan(context: TripContext): Promise<TripResponse> {
  // Artificial delay to simulate "AI Thinking" process for the demo
  await new Promise(resolve => setTimeout(resolve, 1800));

  // The application logic in PlanningScreen.tsx already defaults context to Delhi -> Goa
  // We use the budget style and travel type to pick the correct pre-generated detailed plan.
  const plan = getDemoPlan(context.budgetPreference || 'mid-range', context.travelType);
  
  // Return a copy to ensure immutability
  return { ...plan };
}