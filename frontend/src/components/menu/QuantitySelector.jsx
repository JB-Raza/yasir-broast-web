/**
 * QuantitySelector
 *
 * Controlled +/− stepper with accessible labels.
 * Enforces min/max bounds (default: 1–10).
 * Manages NO internal state — the parent owns the value.
 */
export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
  ariaLabel = 'Quantity',
}) {
  return (
    <div
      className="inline-flex items-center border-2 border-primary rounded-lg overflow-hidden"
      role="group"
      aria-label={ariaLabel}
    >
      {/* Decrement */}
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="w-8 h-9 flex items-center justify-center text-primary font-bold text-lg hover:bg-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        −
      </button>

      {/* Count */}
      <span
        aria-live="polite"
        aria-atomic="true"
        className="w-9 text-center font-montserrat font-bold text-charcoal text-sm select-none"
      >
        {value}
      </span>

      {/* Increment */}
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="w-8 h-9 flex items-center justify-center text-primary font-bold text-lg hover:bg-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        +
      </button>
    </div>
  );
}
