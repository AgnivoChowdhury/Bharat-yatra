
import React from 'react';

interface Props {
  onNext: () => void;
}

const OnboardingScreen: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="flex-1 flex flex-col p-8 space-y-12 justify-center bg-white">
      <div className="space-y-6">
        <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-3xl">
          🇮🇳
        </div>
        <h2 className="text-3xl font-bold text-slate-900 leading-tight">
          BharatYatra is built for <span className="text-indigo-600">Indian Realities.</span>
        </h2>
        <ul className="space-y-6">
          <li className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex-shrink-0 flex items-center justify-center">💰</div>
            <div>
              <p className="font-semibold text-slate-800">Budget-First Logic</p>
              <p className="text-sm text-slate-500">We tell you where you can go with the money you have.</p>
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center">🚆</div>
            <div>
              <p className="font-semibold text-slate-800">Smart Logistics</p>
              <p className="text-sm text-slate-500">Flight, Train, or Road? We compare actual travel times and costs.</p>
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center">📊</div>
            <div>
              <p className="font-semibold text-slate-800">Hidden Cost Clarity</p>
              <p className="text-sm text-slate-500">No surprises. We estimate local autos, food, and emergency buffers.</p>
            </div>
          </li>
        </ul>
      </div>

      <button 
        onClick={onNext}
        className="w-full py-4 bg-slate-900 text-white rounded-xl font-semibold shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center"
      >
        Start Planning My Trip
        <span className="ml-2">→</span>
      </button>
    </div>
  );
};

export default OnboardingScreen;
