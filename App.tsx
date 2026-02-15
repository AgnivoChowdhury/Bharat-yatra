import React, { useState } from 'react';
import { User, TripContext, TripResponse } from './types.ts';
import LoginScreen from './components/LoginScreen.tsx';
import OnboardingScreen from './components/OnboardingScreen.tsx';
import PlanningScreen from './components/PlanningScreen.tsx';
import ResultsScreen from './components/ResultsScreen.tsx';

type AppState = 'login' | 'onboarding' | 'planning' | 'results';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('login');
  const [user, setUser] = useState<User | null>(null);
  const [tripContext, setTripContext] = useState<TripContext | null>(null);
  const [tripResult, setTripResult] = useState<TripResponse | null>(null);

  const handleLogin = (u: User) => {
    setUser(u);
    setAppState('onboarding');
  };

  const handleStartPlanning = () => {
    setAppState('planning');
  };

  const handlePlanningComplete = (context: TripContext, result: TripResponse) => {
    setTripContext(context);
    setTripResult(result);
    setAppState('results');
  };

  const handleReset = () => {
    setAppState('planning');
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-slate-50 shadow-2xl overflow-hidden flex flex-col relative border-x border-slate-200">
      {/* Decorative branding bar - Tiranga colors */}
      <div className="absolute top-0 left-0 w-full h-1.5 flex z-50">
        <div className="flex-1 bg-orange-500"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-green-500"></div>
      </div>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        {appState === 'login' && <LoginScreen onLogin={handleLogin} />}
        {appState === 'onboarding' && <OnboardingScreen onNext={handleStartPlanning} />}
        {appState === 'planning' && (
          <PlanningScreen 
            onComplete={handlePlanningComplete} 
            initialContext={tripContext || undefined}
          />
        )}
        {appState === 'results' && tripResult && tripContext && (
          <ResultsScreen 
            result={tripResult} 
            context={tripContext} 
            onEdit={handleReset}
          />
        )}
      </main>

      {/* Floating Indian Stamp for flavor */}
      {appState !== 'login' && (
        <div className="absolute bottom-6 right-6 w-10 h-10 bg-white/80 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-xs opacity-30 pointer-events-none select-none border border-slate-200 rotate-12">
          🇮🇳
        </div>
      )}
    </div>
  );
};

export default App;