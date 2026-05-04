const YEAR_STYLES = {
  2026: { active: 'bg-gold text-white',         inactive: 'text-gold hover:bg-gold-pale' },
  2027: { active: 'bg-sage text-white',         inactive: 'text-sage hover:bg-sage-pale' },
  2028: { active: 'bg-sky text-white',          inactive: 'text-sky hover:bg-sky-pale'   },
  2029: { active: 'bg-rose text-white',         inactive: 'text-rose hover:bg-rose-pale' },
};

export default function YearTabs({ activeYear, onYearChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {[2026, 2027, 2028, 2029].map(year => (
        <button
          key={year}
          onClick={() => onYearChange(year)}
          className={`flex-shrink-0 px-5 py-2 rounded-full font-semibold text-sm transition-all ${
            activeYear === year
              ? YEAR_STYLES[year].active + ' shadow-sm'
              : YEAR_STYLES[year].inactive
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  );
}
