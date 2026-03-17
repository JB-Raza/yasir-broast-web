/**
 * orderStorage.js
 * All localStorage helpers for order persistence and simulated status.
 */

const ORDERS_KEY = 'yasirBroastOrders';

/* ─── CRUD ───────────────────────────────────────────────────────── */

export function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveOrder(order) {
  const orders = getOrders();
  orders.unshift(order); // most recent first
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function cancelOrder(orderId) {
  const orders = getOrders().map((o) =>
    o.id === orderId ? { ...o, status: 'cancelled' } : o
  );
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function getActiveOrder() {
  return (
    getOrders().find(
      (o) => !['delivered', 'cancelled'].includes(getSimulatedStatus(o))
    ) ?? null
  );
}

/* ─── Status simulation ──────────────────────────────────────────── */
/*
  Simulates status based on minutes elapsed since placedAt.
  Pickup:  confirmed(0) → preparing(2) → ready(8)  → delivered(28)
  Delivery: confirmed(0) → preparing(2) → ready(8) → out-for-delivery(20) → delivered(40)
*/

const PICKUP_THRESHOLDS   = [2, 8, 28];          // minutes
const DELIVERY_THRESHOLDS = [2, 8, 20, 40];

const PICKUP_STATUSES   = ['confirmed', 'preparing', 'ready', 'delivered'];
const DELIVERY_STATUSES = ['confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered'];

export function getSimulatedStatus(order) {
  if (order.status === 'cancelled') return 'cancelled';

  const elapsed = (Date.now() - new Date(order.placedAt).getTime()) / 60000; // minutes
  const isDelivery = order.deliveryType === 'delivery';

  const thresholds = isDelivery ? DELIVERY_THRESHOLDS : PICKUP_THRESHOLDS;
  const statuses   = isDelivery ? DELIVERY_STATUSES   : PICKUP_STATUSES;

  let idx = 0;
  for (let i = 0; i < thresholds.length; i++) {
    if (elapsed >= thresholds[i]) idx = i + 1;
  }
  return statuses[idx];
}

/* ─── Timeline builder ───────────────────────────────────────────── */
/*
  Returns completed status events with computed timestamps.
*/

const PICKUP_OFFSETS = { confirmed: 0, preparing: 2, ready: 8, delivered: 28 };
const DELIVERY_OFFSETS = {
  confirmed: 0, preparing: 2, ready: 8, 'out-for-delivery': 20, delivered: 40,
};

export function buildTimeline(order) {
  const isDelivery   = order.deliveryType === 'delivery';
  const offsets      = isDelivery ? DELIVERY_OFFSETS : PICKUP_OFFSETS;
  const currentStatus = getSimulatedStatus(order);
  const allStatuses  = Object.keys(offsets);
  const currentIdx   = allStatuses.indexOf(currentStatus);
  const placedAt     = new Date(order.placedAt).getTime();

  return allStatuses.slice(0, currentIdx + 1).map((status) => ({
    status,
    timestamp: new Date(placedAt + offsets[status] * 60000),
  }));
}

/* ─── Step definitions ───────────────────────────────────────────── */

export const PICKUP_STEPS = [
  { id: 'confirmed',  icon: '✅', label: 'Confirmed',  desc: "We've received your order"   },
  { id: 'preparing',  icon: '🍳', label: 'Preparing',  desc: 'Your food is being cooked'   },
  { id: 'ready',      icon: '📦', label: 'Ready',      desc: 'Order packed & ready'         },
  { id: 'delivered',  icon: '🎉', label: 'Picked Up',  desc: 'Enjoy your meal!'             },
];

export const DELIVERY_STEPS = [
  { id: 'confirmed',          icon: '✅', label: 'Confirmed',         desc: "We've received your order" },
  { id: 'preparing',          icon: '🍳', label: 'Preparing',         desc: 'Your food is being cooked' },
  { id: 'ready',              icon: '📦', label: 'Packed',            desc: 'Order packed & ready'       },
  { id: 'out-for-delivery',   icon: '🛵', label: 'Out for Delivery',  desc: 'Rider is on the way'        },
  { id: 'delivered',          icon: '🎉', label: 'Delivered',         desc: 'Enjoy your meal!'           },
];

/* ─── Badge styles ───────────────────────────────────────────────── */

export const STATUS_BADGE = {
  confirmed:        { label: 'Confirmed',         bg: 'bg-blue-100',   text: 'text-blue-700'   },
  preparing:        { label: 'Preparing',         bg: 'bg-orange-100', text: 'text-orange-700' },
  ready:            { label: 'Ready',             bg: 'bg-purple-100', text: 'text-purple-700' },
  'out-for-delivery':{ label: 'Out for Delivery', bg: 'bg-indigo-100', text: 'text-indigo-700' },
  delivered:        { label: 'Delivered',         bg: 'bg-green-100',  text: 'text-green-700'  },
  cancelled:        { label: 'Cancelled',         bg: 'bg-red-100',    text: 'text-red-600'    },
};

/* ─── Helpers ────────────────────────────────────────────────────── */

export function formatTime(date) {
  return new Date(date).toLocaleTimeString('en-PK', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

export function isWithinCancellationWindow(order) {
  const limit = new Date(order.placedAt).getTime() + 15 * 60000; // 15 min
  return Date.now() < limit && !['delivered', 'cancelled'].includes(getSimulatedStatus(order));
}
