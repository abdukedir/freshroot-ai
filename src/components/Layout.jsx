import { Link, NavLink, Outlet } from 'react-router-dom';
import { Leaf, Menu, ShoppingCart, UserRound } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

const nav = [
  ['/', 'Home'],
  ['/marketplace', 'Marketplace'],
  ['/coach', 'AI Coach'],
  ['/wellness', 'Wellness'],
  ['/farmer', 'Farmer'],
  ['/profile', 'Profile'],
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { cart } = useApp();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f7faf6]">
      <header className="sticky top-0 z-50 border-b border-green-900/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-black text-primary">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-white"><Leaf size={22} /></span>
            <span>FreshRoots AI</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => `rounded-lg px-3 py-2 text-sm font-semibold ${isActive ? 'bg-green-50 text-primary' : 'text-slate-600 hover:text-primary'}`}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/cart" className="btn-secondary relative px-3" aria-label="Cart">
              <ShoppingCart size={18} />
              {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-xs text-white">{count}</span>}
            </Link>
            <Link to="/profile" className="hidden rounded-lg bg-dark px-3 py-3 text-white md:inline-flex" aria-label="Profile"><UserRound size={18} /></Link>
            <button onClick={() => setOpen(!open)} className="btn-secondary px-3 md:hidden" aria-label="Menu"><Menu size={18} /></button>
          </div>
        </div>
        {open && (
          <div className="border-t border-slate-100 bg-white px-4 pb-3 md:hidden">
            {nav.map(([to, label]) => <NavLink onClick={() => setOpen(false)} key={to} to={to} className="block rounded-lg px-3 py-3 font-semibold text-slate-700">{label}</NavLink>)}
          </div>
        )}
      </header>
      <Outlet />
    </div>
  );
}
