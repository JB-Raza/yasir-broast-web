import { useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { CATEGORIES } from '../../data/menuData';

/**
 * SearchFilter
 * ─ Search input (debounce handled in useMenu via useDebounce)
 * ─ Horizontally scrollable category pills (visible on all screens;
 *   CategoryTabs provides the larger desktop tab bar below this)
 */
export default function SearchFilter({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setCategory,
  clearFilters,
  isFiltersActive,
  totalCount,
}) {
  const inputRef = useRef(null);

  const handleClear = () => {
    clearFilters();
    inputRef.current?.focus();
  };

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 pt-3 pb-2">

      {/* ── Search row ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 max-w-7xl mx-auto">
        {/* Input */}
        <div className="relative flex-1">
          <FiSearch
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for your favourite dish…"
            aria-label="Search menu items"
            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl font-opensans text-sm text-charcoal placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
          {/* Inline clear button (search active only) */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-200"
            >
              <FiX size={16} />
            </button>
          )}
        </div>

        {/* Clear all filters button (shown when any filter is active) */}
        {isFiltersActive && (
          <button
            onClick={handleClear}
            className="shrink-0 font-montserrat font-semibold text-xs text-primary hover:text-primary-dark border border-primary hover:border-primary-dark px-3 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ── Results count ────────────────────────────────────────────── */}
      {isFiltersActive && (
        <p
          className="font-opensans text-gray-400 text-xs max-w-7xl mx-auto mt-1.5 px-0.5"
          aria-live="polite"
          aria-atomic="true"
        >
          {totalCount === 0
            ? 'No items match your search'
            : `${totalCount} item${totalCount !== 1 ? 's' : ''} found`}
        </p>
      )}

      {/* ── Category pills (hidden on lg+ where CategoryTabs takes over) */}
      <div
        className="lg:hidden flex gap-2 overflow-x-auto pt-2.5 pb-1 max-w-7xl mx-auto scrollbar-hide"
        role="group"
        aria-label="Filter by category"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* "All" pill */}
        <button
          onClick={() => setCategory('all')}
          aria-pressed={activeCategory === 'all'}
          className={`shrink-0 font-montserrat font-semibold text-xs px-4 py-2 rounded-full transition-all duration-200 ${
            activeCategory === 'all'
              ? 'bg-primary text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            aria-pressed={activeCategory === cat.id}
            className={`shrink-0 flex items-center gap-1.5 font-montserrat font-semibold text-xs px-4 py-2 rounded-full transition-all duration-200 ${
              activeCategory === cat.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span aria-hidden="true">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
