export default function FilterChips({ options, activeFilter, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all border ${
            activeFilter === option
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
