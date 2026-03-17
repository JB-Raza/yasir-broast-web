import { Helmet } from 'react-helmet-async';

// ── Hook ────────────────────────────────────────────────────────────
import { useMenu } from '../hooks/useMenu';

// ── Components ──────────────────────────────────────────────────────
import MenuHeader    from '../components/menu/MenuHeader';
import SearchFilter  from '../components/menu/SearchFilter';
import CategoryTabs  from '../components/menu/CategoryTabs';
import MenuGrid      from '../components/menu/MenuGrid';
import DietaryInfo   from '../components/menu/DietaryInfo';
import CartSummary   from '../components/order/CartSummary';
import MiniCart      from '../components/order/MiniCart';

/**
 * MenuScreen  (/menu)
 *
 * Layout:
 *  ┌─────────────────────────────────────────────────┐
 *  │  MenuHeader (red banner)                        │
 *  │  ─── sticky ──────────────────────────────────  │
 *  │  SearchFilter  +  CategoryTabs (lg+)            │
 *  │  ─── main content ─────────────────────────── ─ │
 *  │  MenuGrid (flex-1)     │  CartSummary (xl+)     │
 *  │  DietaryInfo           │  (sticky sidebar)      │
 *  └─────────────────────────────────────────────────┘
 *  MiniCart (fixed bottom bar — mobile/tablet)
 */
export default function MenuScreen() {
  const {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    activeCategory,
    setCategory,
    clearFilters,
    isFiltersActive,
    groupedCategories,
    totalCount,
    isLoading,
    getVisibleCount,
    loadMoreForCategory,
    categoryCounts,
    categories,
  } = useMenu();

  return (
    <>
      {/* ── SEO ─────────────────────────────────────────────────── */}
      <Helmet>
        <title>Menu | Yasir Broast – Lahore's Finest Broast</title>
        <meta
          name="description"
          content="Browse our full menu: broast, karahi, BBQ, handi, biryani, fast food, soups, drinks and family platters. Fresh daily at 20+ Lahore locations."
        />
        <meta property="og:title"       content="Yasir Broast Menu" />
        <meta property="og:description" content="36+ dishes across 9 categories — order online or visit a branch." />
        <link rel="canonical"           href="https://yasirbroast.com/menu" />

        {/* JSON-LD – Menu schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'Menu',
            name:       'Yasir Broast Menu',
            description:'Full menu of broast, karahi, BBQ, rice, soups and more.',
            hasMenuSection: categories.map((cat) => ({
              '@type': 'MenuSection',
              name: cat.label,
              description: cat.description,
            })),
          })}
        </script>
      </Helmet>

      {/* ── 1. Page header ─────────────────────────────────────── */}
      <MenuHeader />

      {/* ── 2. Sticky search + filter bar ─────────────────────── */}
      <div className="sticky top-16 z-40 bg-white shadow-sm border-b border-gray-100">
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setCategory={setCategory}
          clearFilters={clearFilters}
          isFiltersActive={isFiltersActive}
          totalCount={totalCount}
        />
        {/* Desktop category tabs (lg+) */}
        <CategoryTabs
          activeCategory={activeCategory}
          setCategory={setCategory}
          categoryCounts={categoryCounts}
        />
      </div>

      {/* ── 3. Main content area ────────────────────────────────── */}
      {/*
          pb-24 xl:pb-8 ensures the fixed MiniCart doesn't overlap
          content on mobile; on xl the MiniCart is hidden.
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 xl:pb-10">
        <div className="flex gap-8 items-start">

          {/* ── Menu items + dietary info ─────────────────────── */}
          <main
            id="menu-content"
            className="flex-1 min-w-0"
            aria-label="Menu items"
          >
            <MenuGrid
              groupedCategories={groupedCategories}
              isLoading={isLoading}
              error={null}
              onRetry={() => window.location.reload()}
              getVisibleCount={getVisibleCount}
              loadMoreForCategory={loadMoreForCategory}
              searchQuery={debouncedQuery}
            />
            <DietaryInfo />
          </main>

          {/* ── Desktop cart sidebar (xl+) ────────────────────── */}
          <aside
            className="hidden xl:block w-80 shrink-0"
            aria-label="Cart summary"
          >
            {/*
                sticky top-[180px]:
                  64px  navbar
                + ~68px SearchFilter
                + ~48px CategoryTabs
                = ~180px
            */}
            <div className="sticky top-[180px]">
              <CartSummary />
            </div>
          </aside>

        </div>
      </div>

      {/* ── 4. Mobile / tablet cart bar ─────────────────────────── */}
      <MiniCart />
    </>
  );
}
