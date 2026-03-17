import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiPackage } from 'react-icons/fi';
import { getActiveOrder, getSimulatedStatus, STATUS_BADGE } from '../../utils/orderStorage';

/**
 * ActiveOrderFloat
 * Fixed pill (bottom-left) that appears whenever there's a non-completed order.
 * Polls localStorage every 30 seconds to stay fresh.
 * Hidden on the /order-status page itself.
 */
export default function ActiveOrderFloat() {
  const [active, setActive] = useState(null);
  const navigate  = useNavigate();
  const { pathname } = useLocation();

  // Don't show on the order-status page
  const hidden = pathname === '/order-status';

  function refresh() {
    setActive(getActiveOrder());
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 30_000);
    // Also refresh when tab regains focus
    window.addEventListener('focus', refresh);
    // Custom event fired by CheckoutScreen after saving an order
    window.addEventListener('yasir-order-placed', refresh);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('yasir-order-placed', refresh);
    };
  }, []);

  if (!active || hidden) return null;

  const status    = getSimulatedStatus(active);
  const badge     = STATUS_BADGE[status] ?? STATUS_BADGE.confirmed;
  const isActive  = !['delivered', 'cancelled'].includes(status);

  return (
    <button
      onClick={() => navigate('/order-status')}
      aria-label={`Track your order ${active.id} — currently ${badge.label}`}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-white border border-gray-200 rounded-2xl shadow-xl px-4 py-3 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 max-w-[220px]"
    >
      {/* Icon with pulse */}
      <div className="relative shrink-0">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${badge.bg}`}>
          <FiPackage className={badge.text} size={20} aria-hidden="true" />
        </div>
        {isActive && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary animate-ping" aria-hidden="true" />
        )}
        {isActive && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary" aria-hidden="true" />
        )}
      </div>

      {/* Text */}
      <div className="text-left min-w-0">
        <p className="font-montserrat font-extrabold text-charcoal text-xs leading-none mb-0.5 truncate">
          {active.id}
        </p>
        <p className={`font-opensans font-semibold text-[11px] ${badge.text} truncate`}>
          {badge.label}
        </p>
      </div>
    </button>
  );
}
