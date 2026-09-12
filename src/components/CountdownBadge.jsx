import { daysUntil } from '../utils/dateUtils';

export default function CountdownBadge({ startDate }) {
  const days = daysUntil(startDate);
  if (days === null) return null;

  const urgent = days <= 30;
  const soon   = days <= 90;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
      urgent ? 'bg-red-100 text-red-600' :
      soon   ? 'bg-orange-100 text-orange-600' :
               'bg-sky-pale text-sky'
    }`}>
      ✈ {days}d away
    </span>
  );
}
