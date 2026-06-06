import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export default function Checkout() {
  const { cart, completeCheckout } = useApp();
  const { t } = useLanguage();
  const [order, setOrder] = useState(null);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 45;
  if (order) {
    return <div className="mx-auto max-w-xl px-4 py-16"><div className="panel p-8 text-center"><CheckCircle2 className="mx-auto text-primary" size={64} /><h1 className="mt-4 text-3xl font-black text-dark">{t('paymentSuccessful')}</h1><p className="mt-2 text-lg font-bold text-slate-600">{t('orderConfirmed', { id: order.id })}</p><Link to="/profile" className="btn-primary mt-6">{t('viewProfile')}</Link></div></div>;
  }
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-black text-dark">{t('checkout')}</h1>
      <div className="panel mt-6 space-y-5 p-6">
        <div className="flex items-center gap-3"><CreditCard className="text-primary" /><div><h2 className="font-black">{t('mockPayment')}</h2><p className="text-sm text-slate-500">{t('mockPaymentCopy')}</p></div></div>
        <input className="input" value="Demo Consumer" readOnly />
        <input className="input" value="Bole, Addis Ababa" readOnly />
        <input className="input" value="4242 4242 4242 4242" readOnly />
        <div className="flex justify-between rounded-lg bg-green-50 p-4 font-black text-primary"><span>{t('total')}</span><span>{total} ETB</span></div>
        <button disabled={!cart.length} onClick={() => setOrder(completeCheckout())} className="btn-primary w-full disabled:opacity-50">{t('payConfirm')}</button>
      </div>
    </div>
  );
}
