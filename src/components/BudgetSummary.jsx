import { yearTotals } from '../data/trips';

const YEAR_STYLES = {
  2026: { bg: 'bg-gold-pale', border: 'border-gold', text: 'text-gold' },
  2027: { bg: 'bg-sage-pale', border: 'border-sage', text: 'text-sage' },
  2028: { bg: 'bg-sky-pale',  border: 'border-sky',  text: 'text-sky'  },
  2029: { bg: 'bg-rose-pale', border: 'border-rose',  text: 'text-rose' },
};

export default function BudgetSummary({ year, trips }) {
  const total = yearTotals[year];
  const style = YEAR_STYLES[year] || YEAR_STYLES[2026];

  const complete = trips.filter(t => t.status === 'COMPLETE').length;
  const booked   = trips.filter(t => t.status === 'BOOKED').length;
  const plan     = trips.filter(t => t.status === 'PLAN').length;
  const personal = trips.filter(t => !t.tripType?.includes('Work')).length;
  const work     = trips.filter(t => t.tripType?.includes('Work')).length;

  return (
    <div className={`rounded-2xl border ${style.border} ${style.bg} p-5 mb-6`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">Estimated Personal OOP</div>
          <div className={`font-display text-3xl font-bold ${style.text}`}>{total?.label}</div>
          {total?.notes && <div className="text-xs text-slate-500 mt-1 max-w-md">{total.notes}</div>}
        </div>
        <div className="flex flex-wrap gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-emerald-600">{complete}</div>
            <div className="text-xs text-slate-500">Complete</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-navy">{booked}</div>
            <div className="text-xs text-slate-500">Booked</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gold">{plan}</div>
            <div className="text-xs text-slate-500">Planned</div>
          </div>
          <div className="border-l border-slate-200 pl-4">
            <div className="text-2xl font-bold text-slate-700">{personal}</div>
            <div className="text-xs text-slate-500">Personal</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-400">{work}</div>
            <div className="text-xs text-slate-500">Work</div>
          </div>
        </div>
      </div>
    </div>
  );
}
