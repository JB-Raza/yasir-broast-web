import { createContext, useContext, useReducer, useEffect } from 'react';

/* ─── Shape of a cart item ─────────────────────────────────────────── */
// { id, name, price, image, quantity }

const CartContext = createContext(null);

/* ─── Reducer ──────────────────────────────────────────────────────── */
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Destructure quantity from payload so items stored in the cart
      // don't have a stale `quantity` key from the product data itself.
      const { quantity: addQty = 1, ...itemData } = action.payload;
      const existingIdx = state.findIndex((i) => i.id === itemData.id);
      if (existingIdx >= 0) {
        const updated = [...state];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + addQty,
        };
        return updated;
      }
      return [...state, { ...itemData, quantity: addQty }];
    }

    case 'REMOVE_ITEM':
      return state.filter((i) => i.id !== action.payload);

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) return state.filter((i) => i.id !== id);
      return state.map((i) => (i.id === id ? { ...i, quantity } : i));
    }

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
}

/* ─── Initialise from localStorage ─────────────────────────────────── */
function initCart() {
  try {
    const raw = localStorage.getItem('yasirBroastCart');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/* ─── Provider ─────────────────────────────────────────────────────── */
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, initCart);

  // Persist cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem('yasirBroastCart', JSON.stringify(cart));
  }, [cart]);

  /* Convenience helpers */
  const addItem    = (item)        => dispatch({ type: 'ADD_ITEM',         payload: item });
  const removeItem = (id)          => dispatch({ type: 'REMOVE_ITEM',      payload: id   });
  const updateQty  = (id, quantity)=> dispatch({ type: 'UPDATE_QUANTITY',  payload: { id, quantity } });
  const clearCart  = ()            => dispatch({ type: 'CLEAR_CART' });

  /* Derived values */
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const total     = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQty, clearCart, itemCount, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ─── Hook ─────────────────────────────────────────────────────────── */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}

export default CartContext;
