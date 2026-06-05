import { Link } from 'react-router-dom';
import { Heart, MapPin, PackageCheck, UserRound } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const { orders, products, saved } = useApp();
  const savedProducts = products.filter((product) => saved.includes(product.id));
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="panel flex flex-col gap-4 p-6 md:flex-row md:items-center">
        <span className="grid h-20 w-20 place-items-center rounded-lg bg-primary text-white"><UserRound size={36} /></span>
        <div className="flex-1"><h1 className="text-3xl font-black text-dark">Demo Consumer</h1><p className="flex items-center gap-2 text-slate-600"><MapPin size={16} />Bole, Addis Ababa</p></div>
        <Link to="/marketplace" className="btn-primary">Shop again</Link>
      </div>
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
