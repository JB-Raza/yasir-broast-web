import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { confirmDanger } from '../../utils/confirm';

/**
 * CartItem
 * Single row inside the cart: image | name+desc | qty adjuster | line total | remove
 */
export default function CartItem({ item }) {
  const { updateQty, removeItem } = useCart();
  const { id, name, description, image, price, quantity } = item;

  const lineTotal = price * quantity;

  function dec() {
    if (quantity <= 1) removeItem(id);
    else updateQty(id, quantity - 1);
  }
  function inc() {
    if (quantity < 10) updateQty(id, quantity + 1);
  }

  return (
    <li className="flex gap-4 py-5 border-b border-gray-100 last:border-0">

      {/* Image */}
      <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-100">
        <img
          src={image || 'https://via.placeholder.com/80x80?text=🍗'}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <h3 className="font-montserrat font-bold text-charcoal text-sm leading-tight truncate">
          {name}
        </h3>
        {description && (
          <p className="font-opensans text-gray-400 text-xs truncate">{description}</p>
        )}

        {/* Qty adjuster */}
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={dec}
            aria-label={`Decrease quantity of ${name}`}
            className="w-7 h-7 rounded-lg border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-150 disabled:opacity-40"
          >
            <FiMinus size={12} aria-hidden="true" />
          </button>

          <span
            className="font-montserrat font-bold text-charcoal text-sm w-6 text-center"
            aria-live="polite"
            aria-label={`Quantity: ${quantity}`}
          >
            {quantity}
          </span>

          <button
            onClick={inc}
            aria-label={`Increase quantity of ${name}`}
            disabled={quantity >= 10}
            className="w-7 h-7 rounded-lg border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-150 disabled:opacity-40"
          >
            <FiPlus size={12} aria-hidden="true" />
          </button>

          <span className="font-opensans text-gray-400 text-xs ml-1">
            × Rs.{price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Right: line total + remove */}
      <div className="flex flex-col items-end justify-between shrink-0">
        <span className="font-montserrat font-extrabold text-primary text-sm">
          Rs.{lineTotal.toLocaleString()}
        </span>
        <button
          onClick={async () => {
            const ok = await confirmDanger({
              title:       `Remove "${name}"?`,
              text:        'This item will be removed from your cart.',
              confirmText: 'Remove',
              cancelText:  'Keep it',
            });
            if (ok) removeItem(id);
          }}
          aria-label={`Remove ${name} from cart`}
          className="text-gray-300 hover:text-red-500 transition-colors duration-200 p-1 rounded-lg hover:bg-red-50"
        >
          <FiTrash2 size={15} aria-hidden="true" />
        </button>
      </div>

    </li>
  );
}
