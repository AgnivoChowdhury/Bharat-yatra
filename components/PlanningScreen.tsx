import React, { useState } from 'react';
import { TripContext, TripResponse, TravelerComposition, BudgetStyle, TravelType } from '../types.ts';
import { TRAVEL_TYPES, BUDGET_STYLES } from '../constants.ts';
import { generateTripPlan } from '../services/geminiService.ts';

interface Props {
  onComplete: (context: TripContext, result: TripResponse) => void;
  initialContext?: TripContext;
}

const PlanningScreen: React.FC<Props> = ({ onComplete, initialContext }) => {
  // Locked to Demo Values for Delhi -> Goa 21st Aug
  const [origin] = useState('Delhi');
  const [destination] = useState('Goa');
  const demoDate = "2025-08-21";
  const [startDate] = useState(initialContext?.startDate || demoDate);
  
  const [budgetPreference, setBudgetPreference] = useState<BudgetStyle>(initialContext?.budgetPreference || 'mid-range');
  const [duration] = useState(4); // Fixed to 4 Days for the detailed demo
  const [travelType, setTravelType] = useState<TravelType>(initialContext?.travelType || 'couple');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // HARD FIXED FOR DEMO:
  const FIXED_FAMILY: TravelerComposition = { adults: 2, kids: 1, seniors: 0 };
  const FIXED_FRIENDS_COUNT = 4;

  const getFinalTravelerCount = () => {
    if (travelType === 'solo') return 1;
    if (travelType === 'couple') return 2;
    if (travelType === 'friends') return FIXED_FRIENDS_COUNT;
    if (travelType === 'family') return 3; // 2 adults + 1 kid
    return 2;
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    const totalTravelers = getFinalTravelerCount();
    setIsGenerating(true);
    
    try {
      const context: TripContext = {
        mode: 'destination',
        origin,
        destination,
        startDate,
        durationDays: duration,
        travelers: totalTravelers,
        travelType,
        budgetPreference,
        travelerComposition: travelType === 'family' ? FIXED_FAMILY : undefined
      };
      // Service call is now completely offline
      const result = await generateTripPlan(context);
      onComplete(context, result);
    } catch (error: any) {
      console.error("Planning failed", error);
      setErrorMessage("The offline planner encountered an issue. Please restart the app.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8 bg-white text-center animate-in fade-in duration-500">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-3xl">✈️</div>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-slate-900 tracking-tighter italic">AI ENGINES LOADING...</h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium leading-relaxed">
            Assembling your detailed <span className="text-indigo-600 font-bold">{budgetPreference}</span> plan for <span className="text-indigo-600 font-bold">{travelType === 'family' ? '2+1 Family' : travelType === 'friends' ? '4 Friends' : travelType}</span>.
          </p>
          <div className="pt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 bg-indigo-200 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
      <header className="px-6 py-8 bg-white border-b border-slate-200 shadow-sm">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
          Bharat Yatra <span className="text-indigo-600">AI</span>
        </h2>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Standalone Offline Mode</p>
      </header>

      {errorMessage && (
        <div className="mx-6 mt-4 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start space-x-3">
          <span className="text-lg">⚠️</span>
          <p className="text-xs text-rose-700 font-semibold">{errorMessage}</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Fixed Demo Route</label>
          <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white shadow-2xl space-y-4 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                <span className="text-5xl">🇮🇳</span>
             </div>
             <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">🛫</div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Delhi to Goa</p>
                  <p className="text-xl font-black">21 Aug — 24 Aug</p>
                </div>
             </div>
             <div className="h-px bg-white/10 w-full"></div>
             <div className="flex justify-between items-center px-2">
                <div className="text-center">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Duration</p>
                  <p className="font-black">4 Days</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Season</p>
                  <p className="font-black text-emerald-400">Monsoon</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Status</p>
                  <p className="font-black text-indigo-400 underline decoration-indigo-400/30">Offline</p>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-4 animate-in fade-in slide-in-from-top-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Choose Comfort Level</label>
          <div className="grid grid-cols-3 gap-2">
            {BUDGET_STYLES.map(style => (
              <button 
                key={style.value}
                onClick={() => setBudgetPreference(style.value)}
                className={`p-4 rounded-3xl border transition-all flex flex-col items-center text-center space-y-2 ${budgetPreference === style.value ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl scale-[1.02]' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'}`}
              >
                <span className="text-xs font-black uppercase tracking-tight">{style.label}</span>
                <span className={`text-[8px] font-bold leading-tight ${budgetPreference === style.value ? 'text-indigo-100' : 'text-slate-400'}`}>{style.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 pb-12">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Choose Group Type</label>
          <div className="grid grid-cols-2 gap-3">
            {TRAVEL_TYPES.map(type => (
              <button key={type.value} onClick={() => setTravelType(type.value)} className={`p-6 rounded-[2rem] border transition-all text-left space-y-3 ${travelType === type.value ? 'bg-indigo-600 border-indigo-600 shadow-xl shadow-indigo-100 scale-[1.02]' : 'bg-white border-slate-200 hover:border-indigo-300'}`}>
                <div className="text-3xl">{type.icon}</div>
                <div>
                  <div className={`font-black text-sm ${travelType === type.value ? 'text-white' : 'text-slate-800'}`}>{type.label}</div>
                  <div className={`text-[10px] font-bold leading-tight ${travelType === type.value ? 'text-indigo-100' : 'text-slate-400'}`}>{type.desc}</div>
                </div>
              </button>
            ))}
          </div>

          <div className={`mt-4 p-5 rounded-3xl border transition-all duration-500 flex items-center space-x-4 ${travelType === 'friends' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : travelType === 'family' ? 'bg-amber-50 border-amber-100 text-amber-800' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
            <div className="text-2xl">
              {travelType === 'friends' ? '👯‍♂️' : travelType === 'family' ? '👨‍👩‍👧' : travelType === 'couple' ? '💑' : '👤'}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Fixed Group Size</p>
              <p className="text-sm font-black italic">
                {travelType === 'friends' ? 'Locked to 4 Friends' : travelType === 'family' ? 'Locked to 2 Adults + 1 Kid' : travelType === 'couple' ? '2 Persons' : '1 Person'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="p-6 bg-white border-t border-slate-200">
        <button onClick={handleSubmit} className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-indigo-200 active:scale-[0.98] transition-all">
          Generate Offline Plan
        </button>
      </footer>
    </div>
  );
};

export default PlanningScreen;