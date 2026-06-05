import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Marketplace from './pages/Marketplace';
import ProductDetails from './pages/ProductDetails';
import FarmerDashboard from './pages/FarmerDashboard';
import Coach from './pages/Coach';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';

function Page({ children }) {
  return (
    <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22 }}>
      {children}
    </motion.main>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route index element={<Page><Landing /></Page>} />
          <Route path="marketplace" element={<Page><Marketplace /></Page>} />
          <Route path="product/:id" element={<Page><ProductDetails /></Page>} />
          <Route path="farmer" element={<Page><FarmerDashboard /></Page>} />
          <Route path="coach" element={<Page><Coach /></Page>} />
          <Route path="cart" element={<Page><Cart /></Page>} />
          <Route path="checkout" element={<Page><Checkout /></Page>} />
          <Route path="profile" element={<Page><Profile /></Page>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
