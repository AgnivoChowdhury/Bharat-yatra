import React, { useState } from 'react';
import { TripResponse, TripContext, TransportOption, HotelOption } from '../types.ts';

interface Props {
  result: TripResponse;
  context: TripContext;
  onEdit: () => void;
}

const ResultsScreen: React.FC<Props> = ({ result, context, onEdit }) => {
  const [activeTab, setActiveTab] = useState<'budget' | 'logistics' | 'stays' | 'itinerary' | 'discover'>('budget');
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const isOverBudget = context.fixedBudget ? result.budgetBreakdown.totalEstimated > context.fixedBudget : false;
  const budgetDiff = context.fixedBudget ? context.fixedBudget - result.budgetBreakdown.totalEstimated : null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleBookHotel = (hotel: HotelOption) => {
    // Construct search URL if direct bookingUrl isn't ideal or is missing
    const query = encodeURIComponent(`book ${hotel.name} in ${hotel.area} ${result.destinationTitle}`);
    const searchUrl = hotel.bookingUrl || `https://www.google.com/search?q=${query}`;
    window.open(searchUrl, '_blank');
  };

  // Robust filtering with case-insensitivity
  const flights = result.transportOptions.filter(t => t.type?.toLowerCase().includes('flight') || t.type?.toLowerCase().includes('air'));
  const trains = result.transportOptions.filter(t => t.type?.toLowerCase().includes('train') || t.type?.toLowerCase().includes('rail'));
  const roadways = result.transportOptions.filter(t => t.type?.toLowerCase().includes('road') || t.type?.toLowerCase().includes('bus') || t.type?.toLowerCase().includes('taxi'));

  const toggleGroup = (group: string) => {
    setExpandedGroup(expandedGroup === group ? null : group);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      <header className="px-6 pt-10 pb-6 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onEdit} className="text-slate-400 hover:text-indigo-600 flex items-center space-x-1 text-sm font-bold transition-colors">
            <span>←</span> <span>Modify</span>
          </button>
          <div className="px-4 py-1.5 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-indigo-200">
            Real-Time Grounded
          </div>
        </div>
        <h2 className="text-3xl font-black text-slate-900 leading-none tracking-tighter">{result.destinationTitle}</h2>
        <div className="flex flex-wrap items-center gap-2 mt-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          <span className="bg-white px-2 py-1 rounded border border-slate-200">📅 {formatDate(context.startDate)}</span>
          <span className="bg-white px-2 py-1 rounded border border-slate-200">🕒 {context.durationDays} Days</span>
          <span className="bg-white px-2 py-1 rounded border border-slate-200">👥 {context.travelers} Persons</span>
        </div>
      </header>

      <div className="flex bg-slate-50 px-6 border-b border-slate-200 z-30 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {(['budget', 'logistics', 'stays', 'itinerary', 'discover'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[80px] py-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-4 ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}
          >
            {tab === 'discover' ? 'Explore' : tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8 bg-white">
        {activeTab === 'budget' && (
          <div className="space-y-8">
            <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🌤️</span>
                <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-widest">Seasonal Realities</h4>
              </div>
              <p className="text-sm text-amber-900 font-semibold leading-relaxed">
                {result.seasonalAdvice}
              </p>
            </div>

            <div className={`p-6 rounded-[2rem] ${isOverBudget ? 'bg-rose-50 border border-rose-100' : 'bg-emerald-50 border border-emerald-100'} space-y-4`}>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${isOverBudget ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {isOverBudget ? '⚠️ Budget Gap' : '✅ Optimized Value'}
                </span>
                <span className="text-[10px] font-bold text-slate-400">Search grounded</span>
              </div>
              <h3 className={`text-2xl font-black ${isOverBudget ? 'text-rose-900' : 'text-emerald-900'}`}>
                {context.fixedBudget ? (
                  isOverBudget 
                    ? `Over by ₹${Math.abs(budgetDiff!).toLocaleString()}` 
                    : `₹${budgetDiff!.toLocaleString()} Surplus` 
                ) : (
                  'Price Breakdown'
                )}
              </h3>
              <p className={`text-sm font-medium leading-relaxed ${isOverBudget ? 'text-rose-700' : 'text-emerald-700'}`}>
                {result.recommendation}
              </p>
            </div>

            <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5">
                <div className="text-9xl font-black">₹</div>
               </div>
               <div className="relative z-10 space-y-6">
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Estimated Cost</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-5xl font-black tracking-tighter">₹{result.budgetBreakdown.totalEstimated.toLocaleString()}</span>
                  </div>
                </div>
               </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Expenditure Breakdown</h4>
              <div className="space-y-2">
                <BreakdownCard label="Logistics" value={result.budgetBreakdown.transport} color="bg-blue-500" total={result.budgetBreakdown.totalEstimated} />
                <BreakdownCard label="Accommodation" value={result.budgetBreakdown.accommodation} color="bg-indigo-500" total={result.budgetBreakdown.totalEstimated} />
                <BreakdownCard label="Food & Local Travel" value={result.budgetBreakdown.food + result.budgetBreakdown.localTravel} color="bg-orange-500" total={result.budgetBreakdown.totalEstimated} />
                <BreakdownCard label="Activities & Sightseeing" value={result.budgetBreakdown.activities} color="bg-purple-500" total={result.budgetBreakdown.totalEstimated} />
                <BreakdownCard label="Misc & Hidden Costs" value={result.budgetBreakdown.hiddenCosts} color="bg-slate-500" total={result.budgetBreakdown.totalEstimated} />
              </div>
            </div>

            {/* Display Search Grounding Sources */}
            {result.sources && result.sources.length > 0 && (
              <div className="space-y-4 mt-8 pb-10">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Data Sources</h4>
                <div className="flex flex-wrap gap-2">
                  {result.sources.map((source, i) => (
                    <a 
                      key={i} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors"
                    >
                      {source.title} ↗
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'logistics' && (
          <div className="space-y-6 pb-20">
            <div className="flex items-center justify-between px-2 mb-4">
              <div className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-lg uppercase tracking-widest shadow-lg">
                Transport Schedules
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Value Optimized</span>
            </div>

            <DropdownGroup 
              title="Airways" 
              icon="✈️" 
              count={flights.length} 
              isExpanded={expandedGroup === 'air'} 
              onToggle={() => toggleGroup('air')}
              options={flights}
              accentColor="blue"
            />

            <DropdownGroup 
              title="Railways" 
              icon="🚆" 
              count={trains.length} 
              isExpanded={expandedGroup === 'rail'} 
              onToggle={() => toggleGroup('rail')}
              options={trains}
              accentColor="indigo"
            />

            <DropdownGroup 
              title="Roadways" 
              icon="🚗" 
              count={roadways.length} 
              isExpanded={expandedGroup === 'road'} 
              onToggle={() => toggleGroup('road')}
              options={roadways}
              accentColor="emerald"
            />
          </div>
        )}

        {activeTab === 'stays' && (
          <div className="space-y-6 pb-10">
            <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">🏨</span>
                <h4 className="text-[10px] font-black text-indigo-800 uppercase tracking-widest">Stay Strategy</h4>
              </div>
              <p className="text-sm text-indigo-900 font-bold leading-relaxed">
                {result.stayStrategy}
              </p>
            </div>
            <div className="space-y-4">
              {result.hotelOptions.map((hotel, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 space-y-4 shadow-sm hover:border-indigo-100 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-lg font-black text-slate-900">{hotel.name}</h5>
                      <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">{hotel.type} • {hotel.area}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-slate-900 leading-none">₹{hotel.pricePerNight.toLocaleString()}</p>
                      <p className="text-[10px] text-slate-400 font-bold">per night</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {hotel.suitability}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleBookHotel(hotel)}
                    className="w-full py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Book this Stay</span>
                    <span className="text-xs">↗</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div className="space-y-12 pb-10">
            {result.itinerary.map((day, i) => (
              <div key={i} className="space-y-6 relative">
                <div className="flex items-center space-x-4 bg-white py-2">
                  <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex flex-col items-center justify-center border-4 border-indigo-50 shadow-xl">
                    <span className="text-[9px] font-black opacity-80 uppercase">Day</span>
                    <span className="text-xl font-black leading-none">{day.day}</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xl font-black text-slate-900 leading-tight">{day.title}</h5>
                    <div className="flex items-center mt-1">
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded">Daily Budget: ₹{day.estimatedLocalCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="relative ml-7 pl-8 border-l-2 border-slate-100 space-y-8 py-2">
                  {day.activities.map((act, j) => (
                    <div key={j} className="relative">
                      <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full border-4 border-white bg-indigo-600 shadow-sm z-20"></div>
                      <div className="bg-slate-50 rounded-[1.5rem] p-5 border border-slate-100 relative group hover:bg-white hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-black text-slate-900 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                            {act.time}
                          </span>
                          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">
                            ⌛ {act.duration}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                          {act.description}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="absolute -bottom-4 -left-1.5 w-3 h-3 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'discover' && (
          <div className="space-y-10 pb-10">
            {/* Must Visit Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 px-2">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl shadow-sm">🏛️</div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Must Visit Landmarks</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Iconic spots in {result.destinationTitle}</p>
                </div>
              </div>
              <div className="space-y-4">
                {result.mustVisitDestinations.map((dest, i) => (
                  <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-orange-200 transition-all group">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors">{dest.name}</h4>
                      <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[9px] font-black uppercase rounded-full">Best: {dest.bestTime}</span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">{dest.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Must Try Food Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 px-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl shadow-sm">🍲</div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Local Flavors</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Don't leave without trying these</p>
                </div>
              </div>
              <div className="grid gap-4">
                {result.mustTryFoods.map((food, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <span className="text-6xl">🍛</span>
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-0.5 bg-white text-emerald-600 text-[8px] font-black uppercase rounded border border-emerald-100">{food.type}</span>
                        <h4 className="text-base font-black text-slate-900">{food.name}</h4>
                      </div>
                      <p className="text-xs text-slate-600 font-bold leading-relaxed mb-4">{food.description}</p>
                      <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span className="mr-2">📍 Where:</span>
                        <span className="text-slate-900">{food.whereToTry}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="p-6 bg-white border-t border-slate-100 grid grid-cols-2 gap-3">
        <button className="py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest active:scale-95 transition-all">Save Plan</button>
        <button className="py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 active:scale-95 transition-all">Share Trip</button>
      </footer>
    </div>
  );
};

const DropdownGroup: React.FC<{ 
  title: string; 
  icon: string; 
  count: number; 
  isExpanded: boolean; 
  onToggle: () => void; 
  options: TransportOption[];
  accentColor: 'blue' | 'indigo' | 'emerald';
}> = ({ title, icon, count, isExpanded, onToggle, options, accentColor }) => {
  const colors = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', accent: 'bg-blue-600' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100', accent: 'bg-indigo-600' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', accent: 'bg-emerald-600' }
  }[accentColor];

  return (
    <div className={`rounded-[2rem] border overflow-hidden transition-all duration-300 ${isExpanded ? 'border-slate-200 shadow-xl ring-4 ring-slate-50' : 'border-slate-100'}`}>
      <button 
        onClick={onToggle}
        className={`w-full p-6 flex items-center justify-between text-left transition-colors ${isExpanded ? 'bg-white' : 'bg-slate-50/50 hover:bg-slate-50'}`}
      >
        <div className="flex items-center space-x-4">
          <div className={`w-14 h-14 ${colors.bg} ${colors.border} border rounded-2xl flex items-center justify-center text-3xl shadow-sm`}>
            {icon}
          </div>
          <div>
            <h4 className="text-xl font-black text-slate-900 leading-none">{title}</h4>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
              {count > 0 ? `${count} Active Schedules` : 'No direct options'}
            </p>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-full border flex flex-col items-center justify-center transition-all duration-300 ${isExpanded ? 'rotate-180 bg-slate-900 border-slate-900 text-white' : 'bg-white text-indigo-600 border-slate-200 shadow-sm'}`}>
          <span className="text-[8px] font-black uppercase leading-none mb-0.5">{isExpanded ? 'Hide' : 'Open'}</span>
          <span className="text-lg font-black leading-none">{isExpanded ? '−' : '↓'}</span>
        </div>
      </button>

      {isExpanded && (
        <div className="p-6 bg-slate-50/30 border-t border-slate-50 space-y-4 animate-in slide-in-from-top-4 duration-300">
          {options.length > 0 ? (
            options.map((opt, i) => <TransportCard key={i} opt={opt} />)
          ) : (
            <div className="py-10 text-center text-slate-400 font-bold text-sm">
              No specific schedules found for this tier.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const TransportCard: React.FC<{ opt: TransportOption; showType?: boolean }> = ({ opt, showType = true }) => {
  const displayCost = opt.costPerPerson && opt.costPerPerson > 0 
    ? `₹${opt.costPerPerson.toLocaleString()}` 
    : "Checking Rates...";
  const displayTime = opt.timeHours || "See Live Table";

  return (
    <div className="p-5 rounded-3xl border bg-white border-slate-100 shadow-sm space-y-4 group hover:border-indigo-200 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {showType && (
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-slate-50 border border-slate-100">
              {opt.type?.toLowerCase().includes('flight') ? '✈️' : opt.type?.toLowerCase().includes('train') ? '🚆' : '🚗'}
            </div>
          )}
          <div>
            <h5 className="font-black text-slate-900 text-sm leading-tight group-hover:text-indigo-600 transition-colors">{opt.provider}</h5>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
              Ref: {opt.id || "N/A"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="bg-indigo-600 text-white px-3 py-1.5 rounded-2xl shadow-sm">
             <p className="text-sm font-black leading-none">{displayCost}</p>
          </div>
          <p className="text-[8px] text-slate-400 font-black uppercase tracking-tighter mt-1 pr-1">Per Person</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-1.5"></span>
            Travel Time
          </span>
          <div className="flex items-center text-sm font-black text-slate-800">
            <span className="mr-2 text-base">🕒</span> {displayTime}
          </div>
        </div>
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5"></span>
            Rating
          </span>
          <div className="flex items-center text-sm font-black text-slate-800">
            <span className="mr-2 text-base">🏅</span> {opt.comfort || "Good"}
          </div>
        </div>
      </div>

      <p className="text-[11px] text-slate-600 leading-relaxed font-semibold bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100/30 italic">
        "{opt.reason}"
      </p>
    </div>
  );
};

const BreakdownCard: React.FC<{ label: string; value: number; color: string; total: number }> = ({ label, value, color, total }) => {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="p-4 bg-white border border-slate-100 rounded-2xl space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700">{label}</span>
        <span className="text-sm font-black text-slate-900">₹{(value || 0).toLocaleString()}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default ResultsScreen;