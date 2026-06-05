import { Link, useParams } from 'react-router-dom';
import { Calendar, MapPin, Plus, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { freshnessMeta, trustBadge } from '../utils/scoring';

export default function ProductDetails() {
  const { id } = useParams();
  const { products, addToCart } = useApp();
  const product = products.find((item) => item.id === id) || products[0];
  const fresh = freshnessMeta(product.freshness);
  const trust = trustBadge(product.trustScore);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link to="/marketplace" className="text-sm font-bold text-primary">Back to marketplace</Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <img src={product.image} alt={product.name} className="h-[430px] w-full rounded-lg object-cover shadow-soft" />
        <section className="space-y-6">
          <div><p className="font-bold text-accent">{product.category}</p><h1 className="text-4xl font-black text-dark">{product.name}</h1><p className="text-lg text-slate-600">{product.price} ETB per {product.unit}</p></div>
          <div className="grid gap-3 sm:grid-cols-2">
            <span className={`rounded-lg px-4 py-3 font-bold ${fresh.className}`}>Freshness {product.freshness}: {fresh.label}</span>
            <span className={`rounded-lg px-4 py-3 font-bold ${trust.className}`}>Trust {product.trustScore}: {trust.label}</span>
            <span className="rounded-lg bg-slate-100 px-4 py-3 font-bold text-slate-700"><Calendar className="mr-2 inline" size={18} />Harvested {product.harvestDate}</span>
            <span className="rounded-lg bg-slate-100 px-4 py-3 font-bold text-slate-700"><MapPin className="mr-2 inline" size={18} />{product.distance} km away</span>
          </div>
          <div className="panel p-5"><h2 className="mb-2 font-black text-dark">Nutrition facts</h2><p className="text-slate-600">{product.nutrition}</p><div className="mt-3 flex flex-wrap gap-2">{product.tags.map((tag) => <span key={tag} className="rounded-lg bg-green-50 px-3 py-2 text-sm font-bold text-primary">{tag}</span>)}</div></div>
          <div className="panel flex gap-4 p-5"><img src={product.farmer.avatar} alt={product.farmer.name} className="h-16 w-16 rounded-lg object-cover" /><div><h2 className="font-black text-dark">{product.farmer.name}</h2><p className="text-sm text-slate-600">{product.farmer.region}</p><p className="mt-1 text-sm font-bold text-primary"><ShieldCheck className="mr-1 inline" size={16} />{trust.label}</p></div></div>
          <button onClick={() => addToCart(product)} className="btn-primary w-full text-base"><Plus size={20} />Add to cart</button>
        </section>
      </div>
    </div>
  );
}
