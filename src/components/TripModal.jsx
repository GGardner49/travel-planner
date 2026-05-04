import { useEffect } from 'react';
import StatusBadge from './StatusBadge';
import { formatDateRange } from '../utils/dateUtils';

const Field = ({ label, value }) => {
  if (!value || value === '—' || value === '') return null;
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">{label}</div>
      <div className="text-slate-700 text-sm">{value}</div>
    </div>
  );
};

export default function TripModal({ trip, onClose }) {
  useEffect(() => {
    if (trip) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [trip]);

  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose]);

  if (!trip) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-white w-full sm:max-w-2xl sm:mx-4 sm:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto z-10 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle (mobile) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-slate-200" />
        </div>

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-start justify-between gap-4 z-10">
          <div>
            <h2 className="font-display text-xl font-bold text-navy leading-tight">{trip.tripName}</h2>
            <p className="text-slate-500 text-sm mt-0.5">📍 {trip.destination}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <StatusBadge status={trip.status} />
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-6">

          {/* Overview */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Overview</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Field label="Dates" value={formatDateRange(trip.startDate, trip.endDate)} />
              <Field label="Nights" value={trip.nights} />
              <Field label="Trip Type" value={trip.tripType} />
              <Field label="Accommodation" value={trip.accommodationName} />
              {trip.accommodationAddress && <Field label="Address" value={trip.accommodationAddress} />}
              <Field label="Accommodation Type" value={trip.accommodationType} />
            </div>
          </section>

          {/* Costs */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Costs</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Field label="Accommodation" value={trip.accomCost} />
              <Field label="Flights" value={trip.flights} />
              <Field label="Ground Transport" value={trip.groundTransport} />
              <Field label="Food & Activities" value={trip.foodActivEst} />
              <Field label="Total Estimate" value={trip.totalEst} />
              <Field label="Expensed" value={trip.expensed !== '$0' ? trip.expensed : null} />
            </div>
            <div className="mt-4 p-4 rounded-xl bg-navy/5 border border-navy/10">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-0.5">Out of Pocket</div>
              <div className="text-2xl font-display font-bold text-navy">{trip.outOfPocket}</div>
            </div>
          </section>

          {/* Notes */}
          {trip.notes && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Notes</h3>
              <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 rounded-xl p-4">{trip.notes}</p>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
