import { Link } from 'react-router-dom';
import { FiShoppingCart, FiArrowRight, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

/**
 * CartSummary  (desktop sticky sidebar — hidden below xl)
 *
 * ─ Always shows: item count, subtotal, View Cart + Order buttons
 * ─ Expands on hover to reveal last 3 items added
 */
export default function CartSummary() {
  const { cart, itemCount, total, removeItem } = useCart();

  // Last 3 items added (most recent first)
  const recentItems = [...cart].reverse().slice(0, 3);

  /* ── Empty cart ───────────────────────────────────────────────────── */
  if (itemCount === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center">
        <span className="text-5xl block mb-3" aria-hidden="true">🛍️</span>
        <p className="font-montserrat font-bold text-charcoal text-base mb-1">Your cart is empty</p>
        <p className="font-opensans text-gray-400 text-sm mb-4">
          Add items from the menu to get started.
        </p>
        <Link
          to="/menu"
          className="inline-block bg-primary hover:bg-primary-dark text-white font-montserrat font-semibold text-sm py-2 px-5 rounded-lg transition-colors duration-200"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  /* ── Filled cart ──────────────────────────────────────────────────── */
  return (
    <div className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">

      {/* Header */}
      <div className="bg-primary text-white px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiShoppingCart size={16} aria-hidden="true" />
          <span className="font-montserrat font-bold text-sm">
            Cart
            <span className="ml-1.5 bg-white/20 rounded-full px-2 py-0.5 text-xs">
              {itemCount}
            </span>
          </span>
        </div>
        <span className="font-montserrat font-extrabold text-gold text-base">
          {formatPrice(total)}
        </span>
      </div>

      {/* Hover-expanded last-3 items */}
      <div
        className="max-h-0 overflow-hidden group-hover:max-h-72 transition-all duration-400 ease-in-out"
        aria-label="Recently added items"
      >
        <ul className="divide-y divide-gray-50 px-4 py-2">
          {recentItems.map((item) => (
            <li key={item.id} className="flex items-center gap-3 py-2.5">
              {/* Thumbnail */}
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded-lg object-cover shrink-0"
              />
              {/* Name + qty */}
              <div className="flex-1 min-w-0">
                <p className="font-montserrat font-semibold text-charcoal text-xs truncate">
                  {item.name}
                </p>
                <p className="font-opensans text-gray-400 text-xs">
                  {item.quantity} × {formatPrice(item.price)}
                </p>
              </div>
              {/* Remove */}
              <button
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name} from cart`}
                className="text-gray-300 hover:text-primary transition-colors duration-200 shrink-0"
              >
                <FiTrash2 size={13} />
              </button>
            </li>
          ))}
        </ul>

        {itemCount > 3 && (
          <p className="font-opensans text-gray-400 text-xs text-center pb-2">
            + {itemCount - 3} more item{itemCount - 3 !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Always-visible footer */}
      <div className="px-4 py-4 border-t border-gray-100 space-y-2.5">
        {/* Subtotal */}
        <div className="flex justify-between font-opensans text-sm text-gray-500">
          <span>Subtotal</span>
          <span className="font-montserrat font-bold text-charcoal">{formatPrice(total)}</span>
        </div>

        {/* View Cart */}
        <Link
          to="/cart"
          className="flex items-center justify-center gap-2 w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-montserrat font-bold text-sm py-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          View Cart <FiArrowRight size={14} aria-hidden="true" />
        </Link>

        {/* Checkout */}
        <Link
          to="/checkout"
          className="flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold-dark text-charcoal font-montserrat font-extrabold text-sm py-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
        >
          Checkout Now
        </Link>
      </div>
    </div>
  );
}
