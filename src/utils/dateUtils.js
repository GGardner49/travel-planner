export function parseStartDate(dateStr) {
  if (!dateStr || dateStr.startsWith('TBD') || dateStr.startsWith('~') || dateStr.includes('OR')) return null;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

export function daysUntil(dateStr) {
  const d = parseStartDate(dateStr);
  if (!d) return null;
  const diff = Math.ceil((d - new Date()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : null;
}

export function formatDateRange(start, end) {
  if (!start || start.startsWith('TBD')) return 'Dates TBD';
  if (!end || end.startsWith('TBD')) return start;
  return `${start} – ${end}`;
}
