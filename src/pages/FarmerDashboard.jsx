import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, PackagePlus, Pencil, ShieldCheck, Trash2 } from 'lucide-react';
import { categories } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { trustBadge } from '../utils/scoring';

export default function FarmerDashboard() {
  const { products, orders, addProduct, editProduct, deleteProduct, farmerTrust, farmers } = useApp();
  const farmer = farmers[0];
  const trust = farmerTrust(farmer);
  const badge = trustBadge(trust);
  const farmerProducts = products.filter((product) => product.farmerId === farmer.id);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { name: 'Kale', category: 'Vegetable', price: 45, quantity: 20, harvestDate: new Date().toISOString().slice(0, 10), nutrition: 'Fresh local produce for balanced meals.' },
  });

  const onSubmit = (data) => {
    const payload = { ...data, price: Number(data.price), quantity: Number(data.quantity), tags: ['immunity'], unit: data.category === 'Fruit' ? 'piece' : 'kg', rating: 4.7 };
    if (editing) editProduct(editing, payload); else addProduct(payload);
    setEditing(null);
    reset();
  };

  const checks = [
    ['Product image uploaded', farmerProducts.every((product) => product.image)],
    ['Harvest date validation', farmerProducts.every((product) => new Date(product.harvestDate) <= new Date())],
    ['Quantity validation', farmerProducts.every((product) => product.quantity > 0)],
    ['Price validation', farmerProducts.every((product) => product.price > 0)],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><p className="font-bold text-accent">Farmer workspace</p><h1 className="text-3xl font-black text-dark">Dashboard</h1></div>
        <span className={`w-fit rounded-lg px-4 py-3 font-black ${badge.className}`}><ShieldCheck className="mr-2 inline" size={18} />{trust} {badge.label}</span>
      </div>
      <div className="grid gap-5 md:grid-cols-4">
        {[['Products', farmerProducts.length], ['Rating', farmer.rating], ['Complaints', farmer.complaints], ['Quality', `${farmer.quality}%`]].map(([label, value]) => <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} key={label} className="panel p-5"><p className="text-sm font-bold text-slate-500">{label}</p><p className="mt-2 text-3xl font-black text-dark">{value}</p></motion.div>)}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[390px_1fr]">
        <section className="panel h-fit p-5">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><PackagePlus size={20} />{editing ? 'Edit product' : 'Add product'}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input className="input" {...register('name', { required: true })} placeholder="Product name" />
            <select className="input" {...register('category')}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
            <input className="input" type="number" {...register('price', { min: 1 })} placeholder="Price" />
            <input className="input" type="number" {...register('quantity', { min: 1 })} placeholder="Quantity" />
            <input className="input" type="date" {...register('harvestDate', { required: true, validate: (value) => new Date(value) <= new Date() })} />
            <textarea className="input min-h-24" {...register('nutrition')} placeholder="Nutrition note" />
            {Object.keys(errors).length > 0 && <p className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">Please pass all pre-posted checks before publishing.</p>}
            <button className="btn-primary w-full">{editing ? 'Save changes' : 'Publish product'}</button>
          </form>
        </section>
        <section className="space-y-6">
          <div className="grid gap-3 md:grid-cols-2">{checks.map(([label, ok]) => <div key={label} className="panel flex items-center gap-3 p-4">{ok ? <CheckCircle2 className="text-primary" /> : <AlertTriangle className="text-accent" />}<span className="font-bold">{label}</span></div>)}</div>
          <div className="panel overflow-hidden"><div className="border-b p-4"><h2 className="font-black">Manage products</h2></div>{farmerProducts.map((product) => <div key={product.id} className="flex items-center gap-3 border-b p-4 last:border-b-0"><img src={product.image} alt={product.name} className="h-14 w-14 rounded-lg object-cover" /><div className="flex-1"><p className="font-black">{product.name}</p><p className="text-sm text-slate-500">{product.quantity} units · {product.price} ETB · freshness {product.freshness}</p></div><button onClick={() => { setEditing(product.id); reset(product); }} className="rounded-lg border p-2 text-primary"><Pencil size={16} /></button><button onClick={() => deleteProduct(product.id)} className="rounded-lg border p-2 text-red-600"><Trash2 size={16} /></button></div>)}</div>
          <div className="panel overflow-hidden"><div className="border-b p-4"><h2 className="font-black">Orders</h2></div>{orders.map((order) => <div key={order.id} className="grid gap-2 border-b p-4 text-sm last:border-b-0 md:grid-cols-4"><strong>{order.id}</strong><span>{order.customer}</span><span>{order.items}</span><span className="font-bold text-primary">{order.status}</span></div>)}</div>
        </section>
      </div>
    </div>
  );
}
