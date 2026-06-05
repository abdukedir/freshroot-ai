import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Eye, MapPin, PackageCheck, Send, ShoppingCart, Sparkles, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { freshnessMeta } from '../utils/scoring';

const prompts = [
  'What foods improve iron?',
  'What should I eat for better immunity?',
  'What foods help weight loss?',
  'What foods increase energy?',
];

const goalCopy = {
  iron: 'Iron supports healthy blood oxygen levels and steady daily energy.',
  immunity: 'Immunity-focused foods bring vitamin C, antioxidants, and traditional wellness staples into the basket.',
  'weight loss': 'Weight-friendly picks prioritize fiber, protein, and nutrient density without feeling sparse.',
  energy: 'Energy foods combine slow-release carbohydrates, protein, and healthy fats for balanced meals.',
};

const productBenefits = {
  Teff: 'Iron-rich grain with slow-release carbohydrates.',
  Spinach: 'Leafy greens with iron, folate, and vitamin C.',
  Lentils: 'Plant protein and fiber for fullness and steady energy.',
  Honey: 'Raw sweetness for quick energy and soothing drinks.',
  Avocado: 'Healthy fats and potassium for satisfying meals.',
  Tomato: 'Vitamin C and lycopene for everyday immunity.',
  Onion: 'Antioxidant-rich staple for stews and sauces.',
  Carrot: 'Beta carotene for immune-supportive family meals.',
  Cabbage: 'Fiber-rich vegetable for light, filling dishes.',
  Garlic: 'Traditional immunity staple with bold flavor.',
};

function intent(text) {
  const value = text.toLowerCase();
  if (value.includes('iron')) return 'iron';
  if (value.includes('immunity') || value.includes('immune')) return 'immunity';
  if (value.includes('weight')) return 'weight loss';
  if (value.includes('energy')) return 'energy';
  return 'immunity';
}

function bestUniqueProducts(products, tag) {
  const ranked = products
    .filter((product) => product.tags.includes(tag) && product.quantity > 0)
    .sort((a, b) => {
      const freshnessDelta = b.freshness - a.freshness;
      if (freshnessDelta !== 0) return freshnessDelta;
      return a.distance - b.distance;
    });

  return [...new Map(ranked.map((product) => [product.name, product])).values()].slice(0, 3);
}

function RecommendationCard({ product, onAdd }) {
  const fresh = freshnessMeta(product.freshness);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-lg border border-slate-200 bg-white"
    >
      <img src={product.image} alt={product.name} className="h-32 w-full object-cover" />
      <div className="space-y-3 p-3">
        <div>
          <h3 className="text-base font-black text-dark">{product.name}</h3>
          <p className="text-xs font-semibold text-slate-500">from {product.farmer.name}</p>
        </div>
        <p className="text-sm leading-5 text-slate-600">{productBenefits[product.name] || product.nutrition}</p>
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <span className={`rounded-lg px-2 py-1.5 ${fresh.className}`}>
            <Sparkles className="mr-1 inline" size={13} />
            {product.freshness}% {fresh.label}
          </span>
          <span className="rounded-lg bg-slate-100 px-2 py-1.5 text-slate-700">
            <MapPin className="mr-1 inline" size={13} />
            {product.distance} km
          </span>
          <span className="rounded-lg bg-green-50 px-2 py-1.5 text-primary">
            {product.price} ETB/{product.unit}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => onAdd(product)} className="btn-primary px-3 py-2 text-xs">
            <ShoppingCart size={15} />
            Add
          </button>
          <Link to={`/product/${product.id}`} className="btn-secondary px-3 py-2 text-xs">
            <Eye size={15} />
            View
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function RecommendationMessage({ message, onAdd, onAddBundle }) {
  const total = message.products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="w-full max-w-3xl rounded-lg bg-slate-100 p-4 text-slate-700">
      <p className="text-xs font-black uppercase tracking-wide text-primary">Recommended Foods Near You</p>
      <h2 className="mt-1 text-xl font-black text-dark">{message.title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{message.explanation}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {message.products.map((product) => (
          <RecommendationCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-green-200 bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 font-black text-dark">
              <PackageCheck className="text-primary" size={18} />
              Healthy Bundle
            </p>
            <p className="mt-1 text-sm text-slate-600">{message.products.map((product) => product.name).join(' + ')}</p>
            <p className="mt-1 text-sm font-black text-primary">Total Price: {total} ETB</p>
          </div>
          <button onClick={() => onAddBundle(message.products)} className="btn-primary shrink-0">
            <ShoppingCart size={18} />
            Add Bundle to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Coach() {
  const { products, addToCart, addProductsToCart } = useApp();
  const [input, setInput] = useState('');
  const [toast, setToast] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      type: 'text',
      text: 'Hi, I am your FreshRoots AI coach. Ask me about iron, immunity, energy, or weight loss and I will recommend nearby foods you can add to cart instantly.',
    },
  ]);

  const showToast = (text) => {
    setToast(text);
    window.setTimeout(() => setToast(''), 2200);
  };

  const handleAdd = (product) => {
    addToCart(product);
    showToast(`${product.name} added to cart.`);
  };

  const handleAddBundle = (bundleProducts) => {
    addProductsToCart(bundleProducts);
    showToast(`${bundleProducts.map((product) => product.name).join(', ')} added to cart.`);
  };

  const ask = (question = input) => {
    if (!question.trim()) return;
    const tag = intent(question);
    const matches = bestUniqueProducts(products, tag);
    const response = {
      role: 'ai',
      type: 'recommendations',
      title: `${tag[0].toUpperCase()}${tag.slice(1)} support bundle`,
      explanation: goalCopy[tag],
      products: matches,
    };
    setMessages((items) => [...items, { role: 'user', type: 'text', text: question }, response]);
    setInput('');
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[330px_1fr]">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed right-4 top-20 z-[60] rounded-lg bg-dark px-4 py-3 text-sm font-bold text-white shadow-soft"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
      <aside className="panel h-fit p-5">
        <Bot className="text-primary" size={32} />
        <h1 className="mt-4 text-3xl font-black text-dark">AI Nutrition Coach</h1>
        <p className="mt-2 text-slate-600">Recommendations use marketplace availability, freshness, distance, and nutrition tags.</p>
        <div className="mt-6 space-y-2">
          {prompts.map((prompt) => (
            <button key={prompt} onClick={() => ask(prompt)} className="btn-secondary w-full justify-start text-left">
              {prompt}
            </button>
          ))}
        </div>
      </aside>
      <section className="panel flex min-h-[620px] flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={`${message.role}-${index}`}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
            >
              {message.role === 'ai' && (
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-green-100 text-primary">
                  <Bot size={18} />
                </span>
              )}
              {message.type === 'recommendations' ? (
                <RecommendationMessage message={message} onAdd={handleAdd} onAddBundle={handleAddBundle} />
              ) : (
                <div className={`max-w-[82%] whitespace-pre-line rounded-lg px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'}`}>
                  {message.text}
                </div>
              )}
              {message.role === 'user' && (
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-dark text-white">
                  <User size={18} />
                </span>
              )}
            </motion.div>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); ask(); }} className="flex gap-2 border-t border-slate-100 p-4">
          <input className="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about iron, immunity, energy..." />
          <button className="btn-primary px-4" aria-label="Send">
            <Send size={18} />
          </button>
        </form>
      </section>
    </div>
  );
}
