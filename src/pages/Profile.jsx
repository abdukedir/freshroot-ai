import { Link } from 'react-router-dom';
import { Brain, Heart, MapPin, PackageCheck, UserRound } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mindfulnessSessions, moodCheckins, pregnancyProfile } from '../data/wellnessData';
import { generateWellnessRecommendations, unifiedWellnessScore } from '../utils/wellnessAI';

export default function Profile() {
  const { orders, products, saved } = useApp();
  const savedProducts = products.filter((product) => saved.includes(product.id));
  const wellnessScore = unifiedWellnessScore({
    moodEntries: moodCheckins,
    pregnancyProfile,
    breathingSessions: mindfulnessSessions,
    nutritionScore: 84,
    marketplaceFreshness: Math.round(products.slice(0, 8).reduce((sum, product) => sum + product.freshness, 0) / 8),
  });
  const [topRecommendation] = generateWellnessRecommendations({ moodEntries: moodCheckins, pregnancyProfile, breathingSessions: mindfulnessSessions, products });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="panel flex flex-col gap-4 p-6 md:flex-row md:items-center">
        <span className="grid h-20 w-20 place-items-center rounded-lg bg-primary text-white"><UserRound size={36} /></span>
        <div className="flex-1"><h1 className="text-3xl font-black text-dark">Demo Consumer</h1><p className="flex items-center gap-2 text-slate-600"><MapPin size={16} />Bole, Addis Ababa</p></div>
        <Link to="/wellness" className="btn-secondary"><Brain size={18} />Wellness score {wellnessScore}</Link>
        <Link to="/marketplace" className="btn-primary">Shop again</Link>
      </div>
      <section className="panel mt-6 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold text-accent">Unified wellness profile</p>
            <h2 className="text-2xl font-black text-dark">Nutrition, mood, pregnancy, breathing, activity, and freshness are connected.</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{topRecommendation}</p>
          </div>
          <Link to="/wellness" className="btn-secondary shrink-0">View dashboard</Link>
        </div>
      </section>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="panel overflow-hidden">
          <div className="flex items-center gap-2 border-b p-4"><PackageCheck className="text-primary" /><h2 className="font-black">Orders</h2></div>
          {orders.map((order) => <div key={order.id} className="border-b p-4 last:border-b-0"><div className="flex justify-between gap-4"><strong>{order.id}</strong><span className="font-bold text-primary">{order.status}</span></div><p className="text-sm text-slate-600">{order.items}</p><p className="text-sm font-bold">{order.total} ETB</p></div>)}
        </section>
        <section className="panel overflow-hidden">
          <div className="flex items-center gap-2 border-b p-4"><Heart className="text-accent" /><h2 className="font-black">Saved products</h2></div>
          {savedProducts.map((product) => <Link to={`/product/${product.id}`} key={product.id} className="flex gap-3 border-b p-4 last:border-b-0"><img src={product.image} alt={product.name} className="h-16 w-16 rounded-lg object-cover" /><div><p className="font-black">{product.name}</p><p className="text-sm text-slate-600">{product.farmer.name} · {product.distance} km</p></div></Link>)}
          {!savedProducts.length && <p className="p-4 text-slate-600">No saved products yet.</p>}
        </section>
      </div>
    </div>
  );
}
