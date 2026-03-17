/**
 * Filter menu items by search query and/or active category.
 *
 * @param {Array}  items     - Full MENU_ITEMS array
 * @param {Object} filters
 * @param {string} filters.query    - Raw search string (already debounced)
 * @param {string} filters.category - Active category id, or "all"
 * @returns {Array} Filtered items
 */
export function filterItems(items, { query = '', category = 'all' } = {}) {
  let result = items;

  // Category filter
  if (category && category !== 'all') {
    result = result.filter((i) => i.category === category);
  }

  // Search filter (name, description, category label)
  const q = query.trim().toLowerCase();
  if (q) {
    result = result.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
    );
  }

  return result;
}

/**
 * Group a filtered items array into category buckets.
 * Categories with zero matching items are omitted.
 *
 * @param {Array} items      - Already-filtered items
 * @param {Array} categories - Full CATEGORIES array (for ordering & metadata)
 * @returns {Array} [{ id, label, icon, description, items: [...] }]
 */
export function groupByCategory(items, categories) {
  return categories
    .map((cat) => ({
      ...cat,
      items: items.filter((i) => i.category === cat.id),
    }))
    .filter((group) => group.items.length > 0);
}

/**
 * Build a category → item-count lookup from the raw (unfiltered) items.
 * Used for displaying counts in CategoryTabs.
 *
 * @param {Array} items      - MENU_ITEMS (unfiltered)
 * @param {Array} categories - CATEGORIES array
 * @returns {Object} { [categoryId]: number }
 */
export function buildCategoryCounts(items, categories) {
  return Object.fromEntries(
    categories.map((cat) => [
      cat.id,
      items.filter((i) => i.category === cat.id).length,
    ])
  );
}
