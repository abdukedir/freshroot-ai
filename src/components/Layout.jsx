import { Link, NavLink, Outlet } from 'react-router-dom';
import { Languages, Leaf, Menu, ShoppingCart, UserRound } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

const nav = [
  ['/', 'navHome'],
  ['/marketplace', 'navMarketplace'],
  ['/coach', 'navCoach'],
  ['/wellness', 'navWellness'],
  ['/farmer', 'navFarmer'],
  ['/profile', 'navProfile'],
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { cart } = useApp();
  const { language, languages, setLanguage, t } = useLanguage();
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
            {nav.map(([to, labelKey]) => (
              <NavLink key={to} to={to} className={({ isActive }) => `rounded-lg px-3 py-2 text-sm font-semibold ${isActive ? 'bg-green-50 text-primary' : 'text-slate-600 hover:text-primary'}`}>
                {t(labelKey)}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <label className="relative hidden items-center md:flex">
              <Languages className="pointer-events-none absolute left-3 text-slate-500" size={16} />
              <span className="sr-only">{t('language')}</span>
              <select
                className="h-11 rounded-lg border border-green-900/10 bg-white pl-9 pr-8 text-sm font-bold text-slate-700 outline-none transition focus:border-primary"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                aria-label={t('language')}
              >
                {languages.map((item) => (
                  <option key={item.code} value={item.code}>{item.label}</option>
                ))}
              </select>
            </label>
            <Link to="/cart" className="btn-secondary relative px-3" aria-label={t('cart')}>
              <ShoppingCart size={18} />
              {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-xs text-white">{count}</span>}
            </Link>
            <Link to="/profile" className="hidden rounded-lg bg-dark px-3 py-3 text-white md:inline-flex" aria-label={t('profile')}><UserRound size={18} /></Link>
            <button onClick={() => setOpen(!open)} className="btn-secondary px-3 md:hidden" aria-label={t('menu')}><Menu size={18} /></button>
          </div>
        </div>
        {open && (
          <div className="space-y-2 border-t border-slate-100 bg-white px-4 pb-3 md:hidden">
            <label className="relative mt-3 flex items-center">
              <Languages className="pointer-events-none absolute left-3 text-slate-500" size={16} />
              <span className="sr-only">{t('language')}</span>
              <select
                className="input pl-9"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                aria-label={t('language')}
              >
                {languages.map((item) => (
                  <option key={item.code} value={item.code}>{item.label}</option>
                ))}
              </select>
            </label>
            {nav.map(([to, labelKey]) => <NavLink onClick={() => setOpen(false)} key={to} to={to} className="block rounded-lg px-3 py-3 font-semibold text-slate-700">{t(labelKey)}</NavLink>)}
          </div>
        )}
      </header>
      <Outlet />
    </div>
  );
}
