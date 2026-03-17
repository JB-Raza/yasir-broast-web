import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
import { filterItems, groupByCategory, buildCategoryCounts } from '../utils/menuHelpers';
import { useDebounce } from './useDebounce';

const ITEMS_PER_PAGE = 6; // items shown per category before "Load More"

/**
 * Central hook for all menu state:
 *  - search query (debounced, 300 ms)
 *  - active category (synced with URL ?category=...)
 *  - filtered + grouped results
 *  - per-category load-more counter
 *  - simulated loading state
 */
export function useMenu() {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ── Search ───────────────────────────────────────────────────────── */
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  /* ── Active category (URL-driven) ───────────────────────────────── */
  const activeCategory = searchParams.get('category') || 'all';

  const setCategory = useCallback(
    (catId) => {
      const next = new URLSearchParams(searchParams);
      if (!catId || catId === 'all') {
        next.delete('category');
      } else {
        next.set('category', catId);
      }
      setSearchParams(next, { replace: true });
      // Reset load-more counters when the category changes
      setLoadMore({});
    },
    [searchParams, setSearchParams]
  );

  /* ── Clear all filters ───────────────────────────────────────────── */
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    const next = new URLSearchParams(searchParams);
    next.delete('category');
    setSearchParams(next, { replace: true });
    setLoadMore({});
  }, [searchParams, setSearchParams]);

  /* ── Load-more per category ──────────────────────────────────────── */
  const [loadMore, setLoadMore] = useState({});

  const getVisibleCount = useCallback(
    (categoryId) => loadMore[categoryId] || ITEMS_PER_PAGE,
    [loadMore]
  );

  const loadMoreForCategory = useCallback((categoryId) => {
    setLoadMore((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] || ITEMS_PER_PAGE) + ITEMS_PER_PAGE,
    }));
  }, []);

  /* ── Simulated loading state ─────────────────────────────────────── */
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  /* ── Filtered + grouped results (memoised) ───────────────────────── */
  const filteredItems = useMemo(
    () => filterItems(MENU_ITEMS, { query: debouncedQuery, category: activeCategory }),
    [debouncedQuery, activeCategory]
  );

  const groupedCategories = useMemo(
    () => groupByCategory(filteredItems, CATEGORIES),
    [filteredItems]
  );

  /* ── Static counts (unfiltered, for tabs) ────────────────────────── */
  const categoryCounts = useMemo(
    () => buildCategoryCounts(MENU_ITEMS, CATEGORIES),
    []
  );

  /* ── Derived flags ───────────────────────────────────────────────── */
  const isFiltersActive =
    debouncedQuery.trim().length > 0 || activeCategory !== 'all';

  return {
    /* search */
    searchQuery,
    setSearchQuery,
    debouncedQuery,

    /* category */
    activeCategory,
    setCategory,

    /* combined */
    clearFilters,
    isFiltersActive,

    /* results */
    filteredItems,
    groupedCategories,
    totalCount: filteredItems.length,

    /* load more */
    getVisibleCount,
    loadMoreForCategory,

    /* meta */
    isLoading,
    categoryCounts,
    categories: CATEGORIES,
  };
}
