import { useState } from 'react';
import Header from './components/Header';
import YearTabs from './components/YearTabs';
import YearView from './components/YearView';
import TripModal from './components/TripModal';
import { tripsByYear } from './data/trips';

export default function App() {
  const [activeYear, setActiveYear] = useState(2026);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const trips = tripsByYear[activeYear] || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <YearTabs activeYear={activeYear} onYearChange={setActiveYear} />
        </div>
        <YearView
          year={activeYear}
          trips={trips}
          onTripClick={setSelectedTrip}
        />
      </main>

      <TripModal trip={selectedTrip} onClose={() => setSelectedTrip(null)} />
    </div>
  );
}
