import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { categories } from '../data/mockData';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import ProductMap from '../components/ProductMap';
import { useLanguage } from '../context/LanguageContext';

export default function Marketplace() {
  const { products } = useApp();
  const { categoryLabel, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [distance, setDistance] = useState(20);
  const [freshness, setFreshness] = useState(50);
  const [price, setPrice] = useState(200);

  const filtered = useMemo(() => products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) &&
    (category === 'All' || product.category === category) &&
    product.distance <= distance &&
    product.freshness >= freshness &&
    product.price <= price
  ), [products, query, category, distance, freshness, price]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <p className="font-bold text-accent">{t('marketplaceEyebrow')}</p>
        <h1 className="text-3xl font-black text-dark">{t('navMarketplace')}</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[310px_1fr]">
        <aside className="panel h-fit space-y-5 p-4">
          <div className="flex items-center gap-2 font-black"><SlidersHorizontal size={18} />{t('filters')}</div>
          <label className="block text-sm font-bold">{t('search')}<div className="relative mt-2"><Search className="absolute left-3 top-3 text-slate-400" size={18} /><input className="input pl-10" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('searchPlaceholder')} /></div></label>
          <label className="block text-sm font-bold">{t('category')}<select className="input mt-2" value={category} onChange={(e) => setCategory(e.target.value)}><option value="All">{t('all')}</option>{categories.map((item) => <option key={item} value={item}>{categoryLabel(item)}</option>)}</select></label>
          <label className="block text-sm font-bold">{t('withinKm', { distance })}<input className="mt-2 w-full accent-primary" type="range" min="5" max="20" step="5" value={distance} onChange={(e) => setDistance(Number(e.target.value))} /></label>
          <label className="block text-sm font-bold">{t('freshness', { freshness })}<input className="mt-2 w-full accent-primary" type="range" min="50" max="100" step="10" value={freshness} onChange={(e) => setFreshness(Number(e.target.value))} /></label>
          <label className="block text-sm font-bold">{t('maxPrice', { price })}<input className="mt-2 w-full accent-primary" type="range" min="30" max="220" step="10" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></label>
        </aside>
        <section className="space-y-6">
          <ProductMap products={filtered.length ? filtered : products.slice(0, 8)} />
          <div className="flex items-center justify-between"><p className="font-bold text-slate-600">{t('productsFound', { count: filtered.length })}</p><p className="text-sm text-slate-500">{t('simulatedLocation')}</p></div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </section>
      </div>
    </div>
  );
}
