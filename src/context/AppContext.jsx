import { createContext, useContext, useMemo, useState } from 'react';
import { farmers as seedFarmers, products as seedProducts, sampleOrders, userLocation } from '../data/mockData';
import { freshnessScore, distanceKm } from '../utils/scoring';

const AppContext = createContext(null);

function load(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function farmerTrust(farmer) {
  const verified = farmer.verified ? 8 : -8;
  const rating = farmer.rating * 12;
  const complaints = farmer.complaints * 4;
  return Math.max(45, Math.min(100, Math.round(farmer.quality * 0.45 + rating + verified - complaints)));
}

export function AppProvider({ children }) {
  const [farmers] = useState(() => load('freshroots:farmers', seedFarmers));
  const [products, setProducts] = useState(() => load('freshroots:products', seedProducts));
  const [cart, setCart] = useState(() => load('freshroots:cart', []));
  const [orders, setOrders] = useState(() => load('freshroots:orders', sampleOrders));
  const [saved, setSaved] = useState(() => load('freshroots:saved', ['p2', 'p5']));

  const enrichedProducts = useMemo(
    () =>
      products.map((product) => {
        const farmer = farmers.find((item) => item.id === product.farmerId);
        return {
          ...product,
          farmer,
          freshness: freshnessScore(product.harvestDate),
          distance: distanceKm(userLocation, farmer),
          trustScore: farmerTrust(farmer),
        };
      }),
    [farmers, products],
  );

  const addToCart = (product, quantity = 1) => {
    setCart((current) => {
      const next = current.some((item) => item.id === product.id)
        ? current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
        : [...current, { ...product, quantity }];
      save('freshroots:cart', next);
      return next;
    });
  };

  const addProductsToCart = (nextProducts) => {
    setCart((current) => {
      const next = nextProducts.reduce((items, product) => {
        return items.some((item) => item.id === product.id)
          ? items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
          : [...items, { ...product, quantity: 1 }];
      }, current);
      save('freshroots:cart', next);
      return next;
    });
  };

  const updateQuantity = (id, quantity) => {
    const next = cart.map((item) => (item.id === id ? { ...item, quantity } : item)).filter((item) => item.quantity > 0);
    setCart(next);
    save('freshroots:cart', next);
  };

  const clearCart = () => {
    setCart([]);
    save('freshroots:cart', []);
  };

  const addProduct = (product) => {
    const next = [{ ...product, id: `custom-${Date.now()}`, farmerId: 'f1', image: product.image || seedProducts[0].image }, ...products];
    setProducts(next);
    save('freshroots:products', next);
  };

  const editProduct = (id, patch) => {
    const next = products.map((item) => (item.id === id ? { ...item, ...patch } : item));
    setProducts(next);
    save('freshroots:products', next);
  };

  const deleteProduct = (id) => {
    const next = products.filter((item) => item.id !== id);
    setProducts(next);
    save('freshroots:products', next);
  };

  const completeCheckout = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const nextOrder = {
      id: `ORD-${Math.floor(2000 + Math.random() * 7000)}`,
      customer: 'Demo Consumer',
      items: cart.map((item) => item.name).join(', '),
      total,
      status: 'Confirmed',
    };
    const next = [nextOrder, ...orders];
    setOrders(next);
    save('freshroots:orders', next);
    clearCart();
    return nextOrder;
  };

  const toggleSaved = (id) => {
    const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id];
    setSaved(next);
    save('freshroots:saved', next);
  };

  const value = {
    farmers,
    products: enrichedProducts,
    rawProducts: products,
    cart,
    orders,
    saved,
    userLocation,
    addToCart,
    addProductsToCart,
    updateQuantity,
    clearCart,
    completeCheckout,
    addProduct,
    editProduct,
    deleteProduct,
    toggleSaved,
    farmerTrust,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
