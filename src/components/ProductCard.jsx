import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, Plus, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { freshnessMeta, trustBadge } from '../utils/scoring';

export default function ProductCard({ product }) {
  const { addToCart, saved, toggleSaved } = useApp();
  const fresh = freshnessMeta(product.freshness);
  const trust = trustBadge(product.trustScore);
  return (
    <motion.article layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="panel overflow-hidden">
      <Link to={`/product/${product.id}`} className="block">
        <img src={product.image} alt={product.name} className="h-44 w-full object-cover" />
      </Link>
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-accent">{product.category}</p>
            <Link to={`/product/${product.id}`} className="text-lg font-black text-dark hover:text-primary">{product.name}</Link>
            <p className="text-sm text-slate-500">by {product.farmer.name}</p>
          </div>
          <button onClick={() => toggleSaved(product.id)} className="rounded-lg border border-slate-200 p-2 text-slate-500" aria-label="Save product">
            <Heart size={18} className={saved.includes(product.id) ? 'fill-accent text-accent' : ''} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
          <span className={`rounded-lg px-2 py-2 ${fresh.className}`}><Sparkles size={14} className="mr-1 inline" />{product.freshness} {fresh.label}</span>
          <span className={`rounded-lg px-2 py-2 ${trust.className}`}><ShieldCheck size={14} className="mr-1 inline" />{product.trustScore}</span>
          <span className="rounded-lg bg-slate-100 px-2 py-2 text-slate-700"><MapPin size={14} className="mr-1 inline" />{product.distance} km</span>
          <span className="rounded-lg bg-green-50 px-2 py-2 text-primary">{product.price} ETB/{product.unit}</span>
        </div>
        <button onClick={() => addToCart(product)} className="btn-primary w-full"><Plus size={18} />Add to cart</button>
      </div>
    </motion.article>
  );
}
