export default function TripTypeIcon({ tripType }) {
  const isWork = tripType?.includes('Work');
  if (!isWork) return null;

  const labels = {
    'Work-GST':     { label: 'GST',     color: 'bg-slate-100 text-slate-600' },
    'Work-WAH':     { label: 'WAH',     color: 'bg-slate-100 text-slate-600' },
    'Work-Precise': { label: 'Precise', color: 'bg-slate-100 text-slate-600' },
  };
  const config = labels[tripType] || { label: 'Work', color: 'bg-slate-100 text-slate-600' };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${config.color}`}>
      💼 {config.label}
    </span>
  );
}
