import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Baby, Bot, Brain, MapPin, ShieldCheck, ShoppingBasket, Sprout, TrendingUp, Wind } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function Landing() {
  const { products } = useApp();
  const featured = products.slice(0, 3);
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-4 py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-7">
            <span className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-bold text-primary"><Sprout size={16} />Farm-to-wellness marketplace</span>
            <div className="space-y-4">
              <h1 className="text-4xl font-black leading-tight text-dark md:text-6xl">FreshRoots AI</h1>
              <p className="max-w-xl text-lg leading-8 text-slate-600">Connect directly with Ethiopian smallholder farmers and get AI nutrition recommendations based on fresh, local food near you.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary" to="/marketplace"><ShoppingBasket size={18} />Shop fresh food</Link>
              <Link className="btn-secondary" to="/coach"><Bot size={18} />Ask AI coach</Link>
              <Link className="btn-secondary" to="/wellness"><Brain size={18} />Wellness hub</Link>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2">
              {['30 products', '10 farmers', '20 km discovery'].map((item) => <div key={item} className="rounded-lg bg-slate-50 p-3 text-sm font-bold text-dark">{item}</div>)}
            </div>
          </div>
          <div className="relative">
            <img className="h-[460px] w-full rounded-lg object-cover shadow-soft" src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85" alt="Fresh farm produce" />
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/95 p-4 shadow-soft">
              <p className="text-sm font-bold text-primary">Today near Addis Ababa</p>
              <p className="text-2xl font-black text-dark">Teff, spinach, lentils and honey harvested within 48 hours.</p>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-4">
          {[['Browse nearby', MapPin], ['AI nutrition', Bot], ['Verified farmers', ShieldCheck], ['Impact metrics', TrendingUp]].map(([label, Icon]) => (
            <motion.div whileHover={{ y: -4 }} key={label} className="panel p-5">
              <Icon className="text-primary" /><h3 className="mt-4 font-black text-dark">{label}</h3>
              <p className="mt-2 text-sm text-slate-600">A practical workflow for healthier households and stronger farmer income.</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-bold text-accent">Advanced wellness</p>
              <h2 className="text-3xl font-black text-dark">Mood, pregnancy, and mindfulness now inform food recommendations</h2>
            </div>
            <Link to="/wellness" className="btn-secondary w-fit">Open dashboard</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['Mood Tracking AI', Brain, 'Daily check-ins, energy, sleep, stress trends, burnout detection, and AI recommendations.'],
              ['Pregnancy AI Coach', Baby, 'Due date, week-by-week guidance, iron, water, symptoms, appointment reminders, and food safety.'],
              ['Breathing System', Wind, 'Timestamped breathing and meditation sessions with streaks, stress reduction, and badges.'],
            ].map(([title, Icon, copy]) => (
              <motion.div whileHover={{ y: -4 }} key={title} className="rounded-lg bg-slate-50 p-5">
                <Icon className="text-primary" />
                <h3 className="mt-4 font-black text-dark">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div><p className="font-bold text-accent">Live marketplace</p><h2 className="text-3xl font-black text-dark">Fresh picks for the demo</h2></div>
            <Link to="/marketplace" className="btn-secondary">View all</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {['Farmers keep more value by selling direct.', 'Consumers see freshness, distance, and trust before buying.', 'Nutrition guidance turns local crops into wellness plans.'].map((text) => <div key={text} className="rounded-lg bg-primary p-6 text-xl font-black text-white">{text}</div>)}
        </div>
      </section>
    </>
  );
}
