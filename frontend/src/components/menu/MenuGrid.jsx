import { FiRefreshCw } from 'react-icons/fi';
import MenuItemCard from './MenuItemCard';
import SkeletonLoader from '../common/SkeletonLoader';

/* ─── Loading state ─────────────────────────────────────────────────── */
function LoadingState() {
  return (
    <section aria-label="Loading menu items">
      <SkeletonLoader
        type="card"
        count={8}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      />
    </section>
  );
}

/* ─── Error state ───────────────────────────────────────────────────── */
function ErrorState({ onRetry }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center py-20 text-center gap-4"
    >
      <span className="text-5xl" aria-hidden="true">⚠️</span>
      <h2 className="font-montserrat font-bold text-charcoal text-xl">
        Failed to load menu
      </h2>
      <p className="font-opensans text-gray-500 text-sm max-w-xs">
        Something went wrong while fetching menu items. Please try again.
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-montserrat font-bold py-2.5 px-6 rounded-xl transition-all duration-200 hover:scale-105"
      >
        <FiRefreshCw size={15} aria-hidden="true" /> Retry
      </button>
    </div>
  );
}

/* ─── Empty state ───────────────────────────────────────────────────── */
function EmptyState({ searchQuery }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <span className="text-6xl" aria-hidden="true" role="img" aria-label="No results">
        🔍
      </span>
      <h2 className="font-montserrat font-bold text-charcoal text-xl">
        No items found
      </h2>
      <p className="font-opensans text-gray-500 text-sm max-w-xs">
        {searchQuery
          ? `No dishes match "${searchQuery}". Try a different keyword or clear your filters.`
          : 'No items in this category yet. Please check back later.'}
      </p>
    </div>
  );
}

/* ─── Category section header ───────────────────────────────────────── */
function CategoryHeader({ category }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-3xl" aria-hidden="true">{category.icon}</span>
      <div>
        <h2
          className="font-montserrat font-extrabold text-charcoal text-2xl leading-tight"
          id={`heading-${category.id}`}
        >
          {category.label}
        </h2>
        <p className="font-opensans text-gray-400 text-sm">{category.description}</p>
      </div>
      <span className="ml-auto font-montserrat font-bold text-primary text-sm bg-primary/10 px-3 py-1 rounded-full">
        {category.items.length} item{category.items.length !== 1 ? 's' : ''}
      </span>
    </div>
  );
}

/* ─── MenuGrid ──────────────────────────────────────────────────────── */
/**
 * Renders all visible category sections, each with their own Load More.
 * "category-section" class provides scroll-margin-top (defined in index.css)
 * so that sticky bars don't obscure the heading when scrolled-to.
 */
export default function MenuGrid({
  groupedCategories,
  isLoading,
  error,
  onRetry,
  getVisibleCount,
  loadMoreForCategory,
  searchQuery,
}) {
  if (isLoading) return <LoadingState />;
  if (error)     return <ErrorState onRetry={onRetry} />;
  if (groupedCategories.length === 0) return <EmptyState searchQuery={searchQuery} />;

  return (
    <div className="space-y-14">
      {groupedCategories.map((group) => {
        const visibleCount = getVisibleCount(group.id);
        const visibleItems = group.items.slice(0, visibleCount);
        const hasMore      = group.items.length > visibleCount;
        const remaining    = group.items.length - visibleCount;

        return (
          <section
            key={group.id}
            id={`category-${group.id}`}
            aria-labelledby={`heading-${group.id}`}
            className="category-section"
          >
            {/* Divider + category header */}
            <div className="border-t-2 border-gold/30 pt-8">
              <CategoryHeader category={group} />
            </div>

            {/* Items grid */}
            <div
              role="list"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleItems.map((item) => (
                <div key={item.id} role="listitem">
                  <MenuItemCard item={item} />
                </div>
              ))}
            </div>

            {/* Inline Load More button */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => loadMoreForCategory(group.id)}
                  aria-label={`Load more ${group.label} items`}
                  className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-montserrat font-bold text-sm py-2.5 px-8 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Load More
                  <span className="bg-primary/10 group-hover:bg-white/20 text-primary font-bold text-xs px-2 py-0.5 rounded-full ml-1">
                    +{remaining}
                  </span>
                </button>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
