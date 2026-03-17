/**
 * SkeletonLoader  — shimmer placeholder component
 *
 * Props:
 *  type    {'card'|'list-item'|'text'|'banner'|'circle'|'branch-card'}
 *            — shape preset that mirrors actual content (default: 'card')
 *  count   {number}  — how many skeletons to render (default: 1)
 *  className {string} — extra classes on the wrapper
 *
 * Uses the `.skeleton` CSS class defined in index.css (shimmer animation).
 *
 * ─── Usage examples ────────────────────────────────────────────────
 *
 *   // 6 menu-item card placeholders
 *   <SkeletonLoader type="card" count={6} />
 *
 *   // 3 cart / order list-item rows
 *   <SkeletonLoader type="list-item" count={3} />
 *
 *   // Full-width hero banner placeholder
 *   <SkeletonLoader type="banner" />
 *
 *   // Paragraph of text lines
 *   <SkeletonLoader type="text" count={4} />
 *
 *   // Avatar / icon circle
 *   <SkeletonLoader type="circle" />
 *
 *   // Branch card placeholder
 *   <SkeletonLoader type="branch-card" count={3} />
 */

/* ── Shared shorthand ───────────────────────────────────────────────── */
const S = ({ className = '' }) => (
  <div className={`skeleton ${className}`} aria-hidden="true" />
);

/* ── Shape presets ──────────────────────────────────────────────────── */

/** Menu item card — image + title + description + button */
function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md">
      {/* image area */}
      <S className="h-44 w-full rounded-none" />
      <div className="p-4 space-y-3">
        {/* title */}
        <S className="h-5 w-3/4" />
        {/* description lines */}
        <S className="h-3.5 w-full" />
        <S className="h-3.5 w-5/6" />
        {/* price + button row */}
        <div className="flex items-center justify-between pt-1">
          <S className="h-5 w-16" />
          <S className="h-9 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/** Cart / order list row — small image + text + price */
function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
      <S className="w-16 h-16 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <S className="h-4 w-1/2" />
        <S className="h-3 w-1/3" />
      </div>
      <div className="space-y-2 items-end flex flex-col">
        <S className="h-4 w-16" />
        <S className="h-3 w-10" />
      </div>
    </div>
  );
}

/** Hero / banner — full-width tall block */
function BannerSkeleton() {
  return (
    <div className="relative w-full">
      <S className="h-[420px] sm:h-[520px] w-full rounded-none" />
      {/* Simulate slide text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8">
        <S className="h-8 w-64 sm:w-96" />
        <S className="h-4 w-48 sm:w-72" />
        <div className="flex gap-3 mt-2">
          <S className="h-11 w-32 rounded-xl" />
          <S className="h-11 w-32 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/** Plain text block — multiple lines, last one shorter */
function TextSkeleton({ count }) {
  return (
    <div className="space-y-2.5">
      {Array.from({ length: count }).map((_, i) => (
        <S
          key={i}
          className={`h-3.5 ${i === count - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

/** Avatar / icon circle */
function CircleSkeleton() {
  return <S className="w-12 h-12 rounded-full" />;
}

/** Branch card — icon area + three lines + two button slots */
function BranchCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      {/* header row */}
      <div className="flex items-center gap-3">
        <S className="w-10 h-10 rounded-full flex-shrink-0" />
        <S className="h-5 w-40" />
      </div>
      {/* info lines */}
      <div className="space-y-2">
        <S className="h-3.5 w-full" />
        <S className="h-3.5 w-4/5" />
        <S className="h-3.5 w-1/2" />
      </div>
      {/* action buttons */}
      <div className="flex gap-3 pt-1">
        <S className="h-9 flex-1 rounded-lg" />
        <S className="h-9 flex-1 rounded-lg" />
      </div>
    </div>
  );
}

/* ── Map type → component ───────────────────────────────────────────── */
const presets = {
  'card':        CardSkeleton,
  'list-item':   ListItemSkeleton,
  'banner':      BannerSkeleton,
  'text':        TextSkeleton,
  'circle':      CircleSkeleton,
  'branch-card': BranchCardSkeleton,
};

/* ── Main export ────────────────────────────────────────────────────── */
export default function SkeletonLoader({ type = 'card', count = 1, className = '' }) {
  const Preset = presets[type] ?? CardSkeleton;

  return (
    <div
      className={className}
      role="status"
      aria-label="Loading content…"
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Preset key={i} count={count} />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
