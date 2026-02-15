import { TripResponse, BudgetStyle, TravelType } from '../types.ts';

/**
 * FIXED DEMO DATA: 12 detailed combinations for Delhi to Goa (Aug 21-24)
 * Family is fixed at 2 Adults + 1 Kid. Friends is fixed at 4 people.
 */

const getGroupSpecificItinerary = (tier: BudgetStyle, group: TravelType) => {
  const isBudget = tier === 'budget';
  const isMid = tier === 'mid-range';
  const isPremium = tier === 'premium';

  // Specific themes for different groups
  const groupTheme = {
    solo: "Self-discovery & Socializing",
    couple: "Romance & Serenity",
    family: "Safe Fun & Kid-Friendly Exploration",
    friends: "Adventure, Nightlife & Shared Memories"
  }[group];

  const transportDetail = {
    solo: isBudget ? 'Rent a trusty Honda Activa (₹400/day).' : 'Book a private bike pilot for safe local hops.',
    couple: isMid ? 'Rent a self-drive open-top Jeep or SUV.' : 'Private luxury chauffeur-driven sedan.',
    family: 'Private AC Innova Crysta with child-lock and plenty of legroom.',
    friends: 'A dedicated private traveler van to keep the group together.'
  }[group];

  return [
    {
      day: 1,
      title: `Arrival & ${groupTheme}`,
      activities: [
        { time: "11:30 AM", description: `Touchdown at Mopa Airport. ${isPremium ? 'Greeted by a private concierge with a name placard and cold refreshments.' : isBudget ? 'Hop on the sleek electric airport shuttle to the North Goa hub.' : 'Prepaid AC taxi directly to the resort.'}`, duration: "1.5h" },
        { time: "01:30 PM", description: `Check-in and property walk-through. ${group === 'family' ? 'The little one receives a welcome gift.' : group === 'solo' ? 'Quick orientation of the common areas to meet fellow travelers.' : 'Refreshing welcome drink overlooking the gardens.'}`, duration: "1h" },
        { time: "04:00 PM", description: `Initial beach visit at ${group === 'family' || group === 'couple' ? 'Mandrem (Quiet)' : 'Anjuna (Vibrant)'}. ${transportDetail} already waiting at the gate.`, duration: "2h" },
        { time: "06:30 PM", description: `Sunset watching at a ${isPremium ? 'private cliff-side deck' : 'local shack with music'}. Enjoy the monsoon clouds turning purple over the Arabian Sea.`, duration: "1.5h" },
        { time: "08:30 PM", description: `Dinner at ${isPremium ? 'Gunpowder (Assagao)' : isBudget ? 'Artjuna Garden Cafe' : 'Thalassa'}. First taste of authentic Goan spices.`, duration: "2h" }
      ],
      estimatedLocalCost: isBudget ? 600 : isPremium ? 5000 : 1800
    },
    {
      day: 2,
      title: "The Heart of Goa: Heritage & Latin Quarter",
      activities: [
        { time: "09:00 AM", description: "Breakfast with a view, then drive to Old Goa. Private guided tour of Basilica of Bom Jesus and Se Cathedral.", duration: "3h" },
        { time: "12:30 PM", description: "Lunch in Panjim's Fontainhas. A heritage 'Saraswat Thali' featuring 12 local items.", duration: "1.5h" },
        { time: "02:30 PM", description: "Walking tour of the Latin Quarter. Photograph the iconic yellow and blue Portuguese houses.", duration: "2h" },
        { time: "04:30 PM", description: group === 'family' ? "Interactive session at the Museum of Goa - very engaging for kids." : "Visit the Church of Our Lady of the Immaculate Conception on the hill.", duration: "2h" },
        { time: "07:30 PM", description: group === 'friends' ? "Board a Casino ship on Mandovi River for a night of games and buffet." : isPremium ? "Private Yacht cruise at sunset with snacks and music." : "Evening at Miramar Beach watching locals and eating street snacks.", duration: "3h" }
      ],
      estimatedLocalCost: isBudget ? 1100 : isPremium ? 15000 : 4000
    },
    {
      day: 3,
      title: "Nature's Bounty & Monsoon Bliss",
      activities: [
        { time: "09:30 AM", description: `Monsoon special: Drive through the lush Western Ghats to a Spice Plantation. ${group === 'family' ? 'Elephant interaction and bird watching included.' : 'Guided botanical walk.'}`, duration: "3.5h" },
        { time: "01:30 PM", description: "Traditional organic lunch served on a banana leaf at the plantation. Freshly brewed Feni tasting for adults.", duration: "1.5h" },
        { time: "04:00 PM", description: `Leisurely stop at ${group === 'friends' ? 'Chapora Fort (Dil Chahta Hai spot)' : 'Aguada Fort'}. Enjoy the mist and panoramic ocean views.`, duration: "2h" },
        { time: "06:30 PM", description: group === 'couple' ? "Sunset couple's spa session with local oils." : group === 'solo' ? "Yoga session by the beach as the rain settles." : "Casual football/games on the wet sand.", duration: "2h" },
        { time: "09:00 PM", description: `Farewell dinner at a ${tier === 'premium' ? 'beachfront fine-dining' : 'vibrant local tavern'}. Live music performance of Goan Fado or local bands.`, duration: "2.5h" }
      ],
      estimatedLocalCost: isBudget ? 900 : isPremium ? 12000 : 3500
    },
    {
      day: 4,
      title: "Local Secrets & Departure",
      activities: [
        { time: "08:30 AM", description: "Early morning beach walk. Collect unique shells washed up by the monsoon waves.", duration: "1.5h" },
        { time: "10:30 AM", description: "Visit the local Mapusa market. Buying local cashews, bebinca, and handcrafted pottery souvenirs.", duration: "2h" },
        { time: "01:00 PM", description: "Final hearty meal - 'Ros Omelette' or 'Fish Recheado' at a legendary local spot like Vinayak.", duration: "1.5h" },
        { time: "03:00 PM", description: "Last drive through the green paddy fields to Mopa Airport. Farewell to the Sunshine State.", duration: "1.5h" }
      ],
      estimatedLocalCost: isBudget ? 500 : isPremium ? 3500 : 1200
    }
  ];
};

const getGroupSpecificExplore = (group: TravelType) => {
  const groupSpecifics = {
    solo: {
      highlights: "Focus on social hubs, safe transit, and reflective nature walks.",
      visit: "The minimalist 'Museum of Goa' and the social cafes of Vagator.",
      food: "Small-batch bakeries and budget-friendly Thalis."
    },
    couple: {
      highlights: "Romantic overlooks, private dining, and serene South Goa beaches.",
      visit: "The secluded Butterfly Beach (via boat) and the romantic lanes of Fontainhas.",
      food: "Candlelight seafood dinners and Portuguese wine pairings."
    },
    family: {
      highlights: "Kid-friendly menus, safety-first transport, and engaging educational spots.",
      visit: "The Science Centre in Panjim and the interactive Spice Plantations.",
      food: "Non-spicy Serra Dura pudding and safe, clean resort dining."
    },
    friends: {
      highlights: "Group activities, nightlife hotspots, and adventurous trekking.",
      visit: "The vibrant shacks of Baga/Calangute and the Casino ships.",
      food: "Late-night street food and group-sized seafood platters."
    }
  }[group];

  return {
    mustVisitDestinations: [
      { name: "Basilica of Bom Jesus", description: "Stunning 16th-century church, a UNESCO site. The silver casket of St. Francis Xavier is a marvel.", bestTime: "Morning" },
      { name: "Fontainhas Latin Quarter", description: "Asia's only Latin Quarter. A walk here feels like stepping into old Europe.", bestTime: "Afternoon" },
      { name: "Aguada Fort", description: "A well-preserved 17th-century Portuguese fort and lighthouse standing tall against the sea.", bestTime: "Late Evening" },
      { name: group === 'family' ? "Museum of Goa" : "Dudhsagar Falls", description: group === 'family' ? "Engaging art museum that tells Goa's history through modern art." : "A four-tiered waterfall that looks like a sea of milk during August.", bestTime: "Full Day" }
    ],
    mustTryFoods: [
      { name: "Goan Fish Curry", description: "The soul of Goa. Coconut-based with tangy Kokum and fresh local catch.", type: "Non-Veg", whereToTry: "Vinayak Family Restaurant" },
      { name: "Bebinca", description: "The iconic 7-layer cake. Each layer is baked individually with coconut milk.", type: "Veg", whereToTry: "Confeitaria 31 de Janeiro" },
      { name: "Prawn Balchao", description: "A fiery, pickle-style curry with a Portuguese influence.", type: "Non-Veg", whereToTry: "Mum's Kitchen" },
      { name: "Serra Dura", description: "A Portuguese 'sawdust' pudding made with condensed milk and biscuit crumbs.", type: "Veg", whereToTry: "Viva Panjim" }
    ],
    recommendation: `${groupSpecifics.highlights} This plan maximizes ${groupSpecifics.visit} and includes ${groupSpecifics.food} for a perfect ${group} trip.`
  };
};

const generateAllPlans = (): Record<string, TripResponse> => {
  const tiers: BudgetStyle[] = ['budget', 'mid-range', 'premium'];
  const groups: TravelType[] = ['solo', 'couple', 'family', 'friends'];
  const plans: Record<string, TripResponse> = {};

  tiers.forEach(tier => {
    groups.forEach(group => {
      const key = `${tier}_${group}`;
      
      // HARD FIXED COUNTS FOR DEMO
      const counts = { solo: 1, couple: 2, family: 3, friends: 4 }[group];
      const compositionText = group === 'family' ? '2 Adults and 1 Kid' : group === 'friends' ? '4 Friends' : group;

      // Base pricing logic (per unit)
      const flightPrice = tier === 'premium' ? 12500 : tier === 'mid-range' ? 6800 : 4200;
      const hotelPrice = tier === 'premium' ? 24000 : tier === 'mid-range' ? 5800 : 850;
      const foodDaily = tier === 'premium' ? 4500 : tier === 'mid-range' ? 1600 : 650;
      const localTransDaily = tier === 'premium' ? 3800 : tier === 'mid-range' ? 1900 : 550;
      const activitiesBase = tier === 'premium' ? 16000 : tier === 'mid-range' ? 4500 : 1200;

      // Total Calculation based on fixed counts
      const transportTotal = flightPrice * counts;
      const accommodationTotal = hotelPrice * 3; // 3 nights
      const foodTotal = foodDaily * counts * 4; // 4 days
      const localTravelTotal = localTransDaily * 4;
      const activitiesTotal = activitiesBase * counts;
      const hiddenTotal = tier === 'premium' ? 12000 : 4000;
      
      const totalEstimated = transportTotal + accommodationTotal + foodTotal + localTravelTotal + activitiesTotal + hiddenTotal;

      plans[key] = {
        destinationTitle: `${tier.charAt(0).toUpperCase() + tier.slice(1)} ${group.charAt(0).toUpperCase() + group.slice(1)} Goa Escape`,
        destinationSummary: `A comprehensive 4-day monsoon plan tailored for ${compositionText}. This itinerary balances the serene beauty of August rains with ${tier}-tier hospitality and specifically selected group activities.`,
        seasonalAdvice: "August in Goa is a 'Green Retreat'. Rainfall is frequent but refreshing. Focus on heritage, inland nature, and the local culinary scene as beaches are for views, not swimming.",
        transportOptions: [
          { type: "Flight", provider: tier === 'premium' ? "Vistara Premium" : "IndiGo", id: "UK-821", costPerPerson: flightPrice, timeHours: "2.5h", comfort: tier === 'premium' ? "High" : "Medium", reason: "Direct flight from Delhi IGI is the only logical choice for a short 4-day trip." },
          { type: "Train", provider: "Goa Rajdhani", id: "12432", costPerPerson: tier === 'budget' ? 1150 : 3400, timeHours: "24h", comfort: tier === 'budget' ? "Low" : "High", reason: "Ideal if you enjoy the scenic Western Ghats in the rain." }
        ],
        dailyLivingCosts: { hotel: hotelPrice, food: foodDaily, localTransport: localTransDaily },
        hotelOptions: [
          { name: tier === 'premium' ? "The Leela Goa" : tier === 'mid-range' ? "Novotel Goa Candolim" : "The Hosteller Anjuna", pricePerNight: hotelPrice, type: "Resort", area: tier === 'premium' ? "Mobor" : "Candolim", suitability: `Highly recommended for ${group}s.`, bookingUrl: "https://www.booking.com" },
          { name: tier === 'premium' ? "Taj Exotica" : tier === 'mid-range' ? "Lemon Tree Amarante" : "Zostel Goa", pricePerNight: Math.round(hotelPrice * 0.95), type: "Hotel", area: "Panjim", suitability: "Close to heritage spots.", bookingUrl: "https://www.booking.com" }
        ],
        stayStrategy: tier === 'premium' ? "Secluded luxury in South Goa with full butler service." : tier === 'mid-range' ? "Comfortable boutique stays in the lively Candolim belt." : "Budget-friendly social hubs in North Goa's backpacker heart.",
        itinerary: getGroupSpecificItinerary(tier, group),
        ...getGroupSpecificExplore(group),
        budgetBreakdown: {
          transport: transportTotal,
          accommodation: accommodationTotal,
          food: foodTotal,
          localTravel: localTravelTotal,
          activities: activitiesTotal,
          hiddenCosts: hiddenTotal,
          totalEstimated: totalEstimated,
          rangeMin: Math.round(totalEstimated * 0.92),
          rangeMax: Math.round(totalEstimated * 1.08)
        },
        recommendation: `This ${tier} trip is optimized for ${counts} travelers. It ensures high-value experiences like ${tier === 'premium' ? 'private yachts' : 'scooter heritage rides'} while staying within the estimated budget range.`
      };
    });
  });

  return plans;
};

export const DEMO_PLANS = generateAllPlans();

export const getDemoPlan = (style: BudgetStyle, type: TravelType): TripResponse => {
  const key = `${style}_${type}`;
  return DEMO_PLANS[key] || DEMO_PLANS["mid-range_couple"];
};