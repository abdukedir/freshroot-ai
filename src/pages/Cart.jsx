import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { cart, updateQuantity } = useApp();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-black text-dark">Cart</h1>
      {cart.length === 0 ? (
        <div className="panel mt-6 p-8 text-center"><ShoppingCart className="mx-auto text-primary" size={44} /><p className="mt-4 font-bold text-slate-600">Your cart is empty.</p><Link className="btn-primary mt-5" to="/marketplace">Browse marketplace</Link></div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="space-y-3">{cart.map((item) => <article key={item.id} className="panel flex gap-4 p-4"><img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" /><div className="flex-1"><h2 className="font-black text-dark">{item.name}</h2><p className="text-sm text-slate-500">{item.farmer.name}</p><p className="font-bold text-primary">{item.price} ETB/{item.unit}</p></div><div className="flex items-center gap-2"><button className="rounded-lg border p-2" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={16} /></button><span className="w-6 text-center font-bold">{item.quantity}</span><button className="rounded-lg border p-2" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={16} /></button><button className="rounded-lg border p-2 text-red-600" onClick={() => updateQuantity(item.id, 0)}><Trash2 size={16} /></button></div></article>)}</section>
          <aside className="panel h-fit space-y-4 p-5"><h2 className="text-xl font-black">Order summary</h2><div className="flex justify-between text-slate-600"><span>Subtotal</span><strong>{total} ETB</strong></div><div className="flex justify-between text-slate-600"><span>Delivery</span><strong>45 ETB</strong></div><div className="flex justify-between border-t pt-4 text-lg font-black"><span>Total</span><span>{total + 45} ETB</span></div><Link to="/checkout" className="btn-primary w-full">Checkout</Link></aside>
        </div>
      )}
    </div>
  );
}
