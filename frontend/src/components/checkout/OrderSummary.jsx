/**
 * OrderSummary
 * Read-only sidebar shown on the checkout page.
 * Accepts cart items + computed totals as props.
 */
export default function OrderSummary({ cart, subtotal, discount, deliveryCharge, grandTotal, deliveryType }) {
  return (
    <aside
      aria-label="Order summary"
      className="bg-white rounded-2xl shadow-md p-6 space-y-5 sticky top-24"
    >
      <h2 className="font-montserrat font-extrabold text-charcoal text-lg border-b border-gray-100 pb-4">
        Order Summary
        <span className="ml-2 font-opensans font-normal text-gray-400 text-sm">
          ({cart.reduce((s, i) => s + i.quantity, 0)} items)
        </span>
      </h2>

      {/* Items list */}
      <ul className="space-y-3 max-h-56 overflow-y-auto pr-1">
        {cart.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            {/* Tiny thumbnail */}
            <div className="w-10 h-10 shrink-0 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={item.image || 'https://via.placeholder.com/40x40?text=🍗'}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-opensans text-charcoal text-xs font-semibold truncate">{item.name}</p>
              <p className="font-opensans text-gray-400 text-xs">×{item.quantity}</p>
            </div>
            <span className="font-montserrat font-bold text-charcoal text-xs shrink-0">
              Rs.{(item.price * item.quantity).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>

      {/* Totals */}
      <div className="space-y-2 pt-4 border-t border-gray-100">
        <SummaryRow label="Subtotal"           value={`Rs.${subtotal.toLocaleString()}`} />
        {discount > 0 && (
          <SummaryRow label="Promo Discount"   value={`−Rs.${discount.toLocaleString()}`} valueClass="text-green-600" />
        )}
        <SummaryRow
          label={deliveryType === 'delivery' ? 'Delivery Fee' : 'Pickup'}
          value={deliveryCharge > 0 ? `Rs.${deliveryCharge.toLocaleString()}` : 'Free'}
          valueClass={deliveryCharge === 0 ? 'text-green-600' : ''}
        />
        <div className="flex justify-between pt-3 border-t border-gray-100">
          <span className="font-montserrat font-extrabold text-charcoal text-base">Grand Total</span>
          <span className="font-montserrat font-extrabold text-primary text-xl">
            Rs.{grandTotal.toLocaleString()}
          </span>
        </div>
      </div>
    </aside>
  );
}

function SummaryRow({ label, value, valueClass = '' }) {
  return (
    <div className="flex justify-between">
      <span className="font-opensans text-gray-500 text-sm">{label}</span>
      <span className={`font-opensans font-semibold text-sm text-charcoal ${valueClass}`}>{value}</span>
    </div>
  );
}
