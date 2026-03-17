import { useRef } from 'react';
import { CATEGORIES } from '../../data/menuData';

/**
 * CategoryTabs  (desktop only — hidden below lg breakpoint)
 *
 * ─ Evenly spaced full-width tabs with emoji icon, label, item count
 * ─ Active tab: bold text + gold bottom border
 * ─ Clicking a specific category: sets the URL filter
 * ─ When a category is set: scrolls smoothly to its section in the grid
 *   (the section uses class "category-section" with scroll-margin-top
 *    defined in index.css to account for the sticky bars)
 */
export default function CategoryTabs({ activeCategory, setCategory, categoryCounts }) {
  const tabListRef = useRef(null);

  const handleClick = (catId) => {
    setCategory(catId);

    // Scroll to the section heading after the state/DOM updates
    if (catId !== 'all') {
      setTimeout(() => {
        const el = document.getElementById(`category-${catId}`);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    /* Desktop only */
    <nav
      ref={tabListRef}
      aria-label="Menu categories"
      className="hidden lg:block border-t border-gray-100 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul
          role="tablist"
          className="flex items-stretch overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* "All" tab */}
          <li role="presentation" className="shrink-0">
            <button
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => handleClick('all')}
              className={`flex flex-col items-center gap-0.5 px-5 py-3 text-xs font-montserrat font-semibold border-b-2 transition-all duration-200 whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'border-gold text-charcoal'
                  : 'border-transparent text-gray-500 hover:text-charcoal hover:border-gray-300'
              }`}
            >
              <span className="text-base" aria-hidden="true">🍽️</span>
              <span>All</span>
              <span className={`text-[10px] ${activeCategory === 'all' ? 'text-primary' : 'text-gray-400'}`}>
                {Object.values(categoryCounts).reduce((a, b) => a + b, 0)}
              </span>
            </button>
          </li>

          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = categoryCounts[cat.id] ?? 0;
            return (
              <li key={cat.id} role="presentation" className="shrink-0">
                <button
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={isActive}
                  aria-controls={`category-${cat.id}`}
                  onClick={() => handleClick(cat.id)}
                  className={`flex flex-col items-center gap-0.5 px-5 py-3 text-xs font-montserrat font-semibold border-b-2 transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'border-gold text-charcoal'
                      : 'border-transparent text-gray-500 hover:text-charcoal hover:border-gray-300'
                  }`}
                >
                  <span className="text-base" aria-hidden="true">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`text-[10px] ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
