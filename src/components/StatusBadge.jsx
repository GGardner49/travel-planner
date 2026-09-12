export default function StatusBadge({ status }) {
  const styles = {
    COMPLETE: 'bg-emerald-100 text-emerald-700 border border-emerald-300',
    BOOKED:   'bg-navy text-white',
    PLAN:     'bg-gold-pale text-gold border border-gold',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${styles[status] || styles.PLAN}`}>
      {status === 'COMPLETE' && '✓ '}
      {status}
    </span>
  );
}
