import { useEffect, useState } from 'react';
import StatusBadge from './StatusBadge';
import { formatDateRange } from '../utils/dateUtils';

const ChevronIcon = ({ open }) => (
  <svg
    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    fill="none" viewBox="0 0 24 24" stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const AccordionSection = ({ icon, title, open, onToggle, children }) => (
  <div className="border border-slate-100 rounded-xl overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
    >
      <div className="flex items-center gap-2.5">
        <span className="text-base">{icon}</span>
        <span className="font-semibold text-sm text-slate-700">{title}</span>
      </div>
      <ChevronIcon open={open} />
    </button>
    {open && (
      <div className="px-4 py-4 bg-white">
        {children}
      </div>
    )}
  </div>
);

const Field = ({ label, value }) => {
  if (!value || value === '—' || value === '') return null;
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">{label}</div>
      <div className="text-slate-700 text-sm leading-snug">{value}</div>
    </div>
  );
};

export default function TripModal({ trip, onClose }) {
  const [open, setOpen] = useState({ accom: false, flights: false, budget: false, notes: false });

  const toggle = (key) => setOpen(prev => ({ ...prev, [key]: !prev[key] }));

  // Reset accordion when trip changes
  useEffect(() => {
    setOpen({ accom: false, flights: false, budget: false, notes: false });
  }, [trip]);

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

  const hasFlights = trip.flights && trip.flights !== '—' && trip.flights !== '';
  const hasTransport = trip.groundTransport && trip.groundTransport !== '—' && trip.groundTransport !== '';

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

        {/* Quick-glance strip — always visible */}
        <div className="px-6 py-4 grid grid-cols-3 gap-4 border-b border-slate-100 bg-white">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">Dates</div>
            <div className="text-slate-700 text-sm font-medium">{formatDateRange(trip.startDate, trip.endDate)}</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">Nights</div>
            <div className="text-slate-700 text-sm font-medium">{trip.nights}</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">Type</div>
            <div className="text-slate-700 text-sm font-medium">{trip.tripType}</div>
          </div>
        </div>

        {/* Accordion sections */}
        <div className="px-6 py-5 space-y-3">

          {/* Accommodation */}
          <AccordionSection icon="🏨" title="Accommodation" open={open.accom} onToggle={() => toggle('accom')}>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Name" value={trip.accommodationName} />
              <Field label="Type" value={trip.accommodationType} />
              {trip.accommodationAddress && (
                <div className="col-span-2">
                  <Field label="Address" value={trip.accommodationAddress} />
                </div>
              )}
              <Field label="Cost" value={trip.accomCost} />
            </div>
          </AccordionSection>

          {/* Flights & Transport */}
          {(hasFlights || hasTransport) && (
            <AccordionSection icon="✈️" title="Flights & Transport" open={open.flights} onToggle={() => toggle('flights')}>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Flights" value={trip.flights} />
                <Field label="Ground Transport" value={trip.groundTransport} />
              </div>
            </AccordionSection>
          )}

          {/* Budget */}
          <AccordionSection icon="💰" title="Budget" open={open.budget} onToggle={() => toggle('budget')}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Field label="Accommodation" value={trip.accomCost} />
              <Field label="Flights" value={trip.flights} />
              <Field label="Ground Transport" value={trip.groundTransport} />
              <Field label="Food & Activities" value={trip.foodActivEst} />
              <Field label="Total Estimate" value={trip.totalEst} />
              {trip.expensed && trip.expensed !== '$0' && (
                <Field label="Expensed Via" value={trip.expensed} />
              )}
            </div>
            <div className="p-4 rounded-xl bg-navy/5 border border-navy/10">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-0.5">Out of Pocket</div>
              <div className="text-2xl font-display font-bold text-navy">{trip.outOfPocket}</div>
            </div>
          </AccordionSection>

          {/* Notes & Activities */}
          {trip.notes && (
            <AccordionSection icon="📝" title="Notes & Activities" open={open.notes} onToggle={() => toggle('notes')}>
              <p className="text-slate-600 text-sm leading-relaxed">{trip.notes}</p>
            </AccordionSection>
          )}

        </div>
      </div>
    </div>
  );
}
