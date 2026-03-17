/**
 * Loader  — spinning indicator component
 *
 * Props:
 *  fullPage  {boolean}  — centers inside the full viewport (default: false)
 *  overlay   {boolean}  — dark transparent overlay over existing content (default: false)
 *  size      {'sm'|'md'|'lg'}  — spinner diameter (default: 'md')
 *  message   {string}   — optional label rendered below the spinner
 *  light     {boolean}  — use white spinner (for dark backgrounds, default: false)
 *
 * Usage examples:
 *
 *   // Full-page blocking loader (e.g. while a page is loading data)
 *   <Loader fullPage message="Loading menu..." />
 *
 *   // Transparent overlay on top of content (e.g. form submitting)
 *   <Loader overlay />
 *
 *   // Small inline spinner inside a button
 *   <Loader size="sm" light />
 *
 *   // Default — centers inside its parent container
 *   <Loader />
 */

const sizeMap = {
  sm: 'w-5 h-5 border-2',
  md: 'w-10 h-10 border-4',
  lg: 'w-16 h-16 border-4',
};

export default function Loader({
  fullPage = false,
  overlay  = false,
  size     = 'md',
  message  = '',
  light    = false,
}) {
  /* ── Spinner ring ───────────────────────────────────────────────── */
  const spinnerColor = light
    ? 'border-white/30 border-t-white'
    : 'border-primary/20 border-t-primary';

  const spinner = (
    <div
      role="status"
      aria-label={message || 'Loading…'}
      className="flex flex-col items-center gap-3"
    >
      <div
        className={`${sizeMap[size]} ${spinnerColor} rounded-full animate-spin`}
      />
      {message && (
        <p
          className={`font-opensans text-sm font-medium animate-pulse ${
            light ? 'text-white/80' : 'text-charcoal/60'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );

  /* ── Full-page variant ──────────────────────────────────────────── */
  if (fullPage) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-lightgray"
        aria-live="polite"
      >
        {spinner}
      </div>
    );
  }

  /* ── Overlay variant ────────────────────────────────────────────── */
  if (overlay) {
    return (
      <div
        className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-inherit"
        aria-live="polite"
      >
        {spinner}
      </div>
    );
  }

  /* ── Default — inline, centered inside parent ───────────────────── */
  return (
    <div className="flex items-center justify-center p-8" aria-live="polite">
      {spinner}
    </div>
  );
}
