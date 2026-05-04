import StatusBadge from './StatusBadge';
import TripTypeIcon from './TripTypeIcon';
import CountdownBadge from './CountdownBadge';
import { formatDateRange } from '../utils/dateUtils';

const YEAR_BORDER = {
  2026: 'border-l-gold',
  2027: 'border-l-sage',
  2028: 'border-l-sky',
  2029: 'border-l-rose',
};

export default function TripCard({ trip, onClick }) {
  const isWork = trip.tripType?.includes('Work');
  const borderColor = YEAR_BORDER[trip.year] || 'border-l-slate-400';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer border-l-4 ${isWork ? 'border-l-slate-300 bg-slate-50' : borderColor} p-5 flex flex-col gap-3`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display font-semibold text-navy text-lg leading-tight">{trip.tripName}</h3>
        <StatusBadge status={trip.status} />
      </div>

      {/* Destination */}
      <div className="flex items-center gap-1.5 text-slate-500 text-sm">
        <span>📍</span>
        <span className="font-medium text-slate-700">{trip.destination}</span>
      </div>

      {/* Dates + nights */}
      <div className="flex items-center gap-1.5 text-slate-500 text-sm">
        <span>🗓</span>
        <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
        {trip.nights && <span className="text-slate-400">· {trip.nights} nights</span>}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between flex-wrap gap-2 mt-auto pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <TripTypeIcon tripType={trip.tripType} />
          <CountdownBadge startDate={trip.startDate} />
        </div>
        {trip.outOfPocket && trip.outOfPocket !== '$0' && (
          <div className="text-right">
            <div className="text-xs text-slate-400">Out of pocket</div>
            <div className="font-semibold text-navy text-sm">{trip.outOfPocket}</div>
          </div>
        )}
        {trip.outOfPocket === '$0' && (
          <span className="text-xs text-emerald-600 font-medium">Fully expensed</span>
        )}
      </div>
    </div>
  );
}
