export const userLocation = { lat: 9.0348, lng: 38.759, label: 'Addis Ababa' };

export const farmers = [
  { id: 'f1', name: 'Aster Bekele', region: 'Sululta, Oromia', lat: 9.18, lng: 38.74, verified: true, quality: 96, rating: 4.9, complaints: 0, avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80' },
  { id: 'f2', name: 'Tesfaye Alemu', region: 'Holeta, Oromia', lat: 9.07, lng: 38.49, verified: true, quality: 91, rating: 4.8, complaints: 1, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
  { id: 'f3', name: 'Mekdes Tadesse', region: 'Bishoftu, Oromia', lat: 8.75, lng: 38.98, verified: true, quality: 88, rating: 4.6, complaints: 1, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' },
  { id: 'f4', name: 'Hailu Gebre', region: 'Debre Zeit, Oromia', lat: 8.78, lng: 38.99, verified: false, quality: 79, rating: 4.2, complaints: 2, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' },
  { id: 'f5', name: 'Selamawit Kebede', region: 'Sendafa, Oromia', lat: 9.15, lng: 39.03, verified: true, quality: 93, rating: 4.8, complaints: 0, avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=80' },
  { id: 'f6', name: 'Dawit Mengistu', region: 'Sebeta, Oromia', lat: 8.91, lng: 38.62, verified: true, quality: 84, rating: 4.4, complaints: 1, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80' },
  { id: 'f7', name: 'Rahel Desta', region: 'Entoto, Addis Ababa', lat: 9.09, lng: 38.77, verified: true, quality: 95, rating: 4.9, complaints: 0, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
  { id: 'f8', name: 'Yonas Abebe', region: 'Akaki Kality, Addis Ababa', lat: 8.88, lng: 38.79, verified: false, quality: 72, rating: 4.1, complaints: 3, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
  { id: 'f9', name: 'Genet Assefa', region: 'Chancho, Oromia', lat: 9.31, lng: 38.75, verified: true, quality: 90, rating: 4.7, complaints: 1, avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80' },
  { id: 'f10', name: 'Biruk Worku', region: 'Adama, Oromia', lat: 8.54, lng: 39.27, verified: true, quality: 86, rating: 4.5, complaints: 1, avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=300&q=80' },
];

export const categories = ['Grain', 'Vegetable', 'Legume', 'Fruit', 'Pantry'];

const imageByName = {
  Teff: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80',
  Spinach: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=80',
  Lentils: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=900&q=80',
  Honey: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=900&q=80',
  Avocado: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=900&q=80',
  Tomato: 'https://images.unsplash.com/photo-1546470427-e212b9c6d10b?auto=format&fit=crop&w=900&q=80',
  Onion: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=900&q=80',
  Carrot: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=900&q=80',
  Cabbage: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=900&q=80',
  Garlic: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=900&q=80',
};

const specs = [
  ['Teff', 'Grain', 118, 'kg', ['iron', 'energy', 'fiber'], 'Iron-rich ancient grain with slow-release carbohydrates.'],
  ['Spinach', 'Vegetable', 42, 'bundle', ['iron', 'immunity', 'weight loss'], 'Leafy greens rich in folate, iron, and vitamin C.'],
  ['Lentils', 'Legume', 75, 'kg', ['iron', 'energy', 'weight loss'], 'Plant protein and fiber for steady energy.'],
  ['Honey', 'Pantry', 165, 'jar', ['immunity', 'energy'], 'Raw forest honey for natural sweetness.'],
  ['Avocado', 'Fruit', 55, 'piece', ['energy', 'weight loss'], 'Healthy fats and potassium for balanced meals.'],
  ['Tomato', 'Vegetable', 35, 'kg', ['immunity', 'weight loss'], 'Vitamin C and lycopene for everyday cooking.'],
  ['Onion', 'Vegetable', 28, 'kg', ['immunity'], 'Aromatic staple with antioxidants.'],
  ['Carrot', 'Vegetable', 32, 'kg', ['immunity', 'energy'], 'Beta carotene and crunch for family meals.'],
  ['Cabbage', 'Vegetable', 30, 'head', ['weight loss', 'immunity'], 'Fiber-rich brassica for stews and salads.'],
  ['Garlic', 'Vegetable', 85, 'kg', ['immunity'], 'Bold flavor with traditional wellness value.'],
];

export const products = Array.from({ length: 30 }, (_, index) => {
  const spec = specs[index % specs.length];
  const farmer = farmers[index % farmers.length];
  const daysAgo = index % 6;
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return {
    id: `p${index + 1}`,
    name: spec[0],
    category: spec[1],
    price: spec[2] + (index % 4) * 6,
    unit: spec[3],
    tags: spec[4],
    nutrition: spec[5],
    farmerId: farmer.id,
    harvestDate: date.toISOString().slice(0, 10),
    quantity: 18 + index * 2,
    image: imageByName[spec[0]],
    rating: Number((4.1 + (index % 9) / 10).toFixed(1)),
  };
});

export const sampleOrders = [
  { id: 'ORD-1024', customer: 'Mimi H.', items: 'Teff, Spinach', total: 232, status: 'Preparing' },
  { id: 'ORD-1025', customer: 'Kaleb R.', items: 'Honey, Garlic', total: 268, status: 'Ready' },
  { id: 'ORD-1026', customer: 'Sara N.', items: 'Lentils, Tomato', total: 139, status: 'Delivered' },
];
