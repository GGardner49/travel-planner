import BudgetSummary from './BudgetSummary';
import TripCard from './TripCard';

export default function YearView({ year, trips, onTripClick }) {
  return (
    <div>
      <BudgetSummary year={year} trips={trips} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trips.map(trip => (
          <TripCard
            key={trip.id}
            trip={trip}
            onClick={() => onTripClick(trip)}
          />
        ))}
      </div>
    </div>
  );
}
