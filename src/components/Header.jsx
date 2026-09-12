import { trips } from '../data/trips';

export default function Header() {
  const total = trips.length;
  const complete = trips.filter(t => t.status === 'COMPLETE').length;
  const booked = trips.filter(t => t.status === 'BOOKED').length;

  return (
    <header className="bg-navy text-white">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-gold text-sm font-semibold tracking-widest uppercase mb-1">✈ Gardner Travel</div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              Our Adventures
              <span className="text-gold"> 2026–2029</span>
            </h1>
            <p className="text-slate-300 mt-2 text-sm">The trips that keep us going.</p>
          </div>
          <div className="flex gap-6 sm:text-right">
            <div>
              <div className="text-2xl font-bold text-white">{total}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">Trips</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{complete}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">Done</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gold">{booked}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">Booked</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
