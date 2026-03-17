/**
 * Format a numeric amount as a Pakistani Rupee string.
 * e.g. 3000 → "PKR 3,000"
 */
export function formatPrice(amount) {
  return `PKR ${Number(amount).toLocaleString('en-PK')}`;
}

/**
 * Truncate text to a max length, appending "…" if needed.
 */
export function truncate(text, maxLength = 80) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}
