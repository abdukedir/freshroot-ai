export function freshnessScore(harvestDate) {
  const start = new Date(harvestDate);
  const today = new Date();
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const days = Math.max(0, Math.floor((today - start) / 86400000));
  if (days === 0) return 100;
  if (days === 1) return 90;
  if (days === 2) return 80;
  if (days === 3) return 70;
  if (days === 4) return 60;
  return 50;
}

export function freshnessMeta(score) {
  if (score >= 80) return { label: 'Fresh', className: 'bg-green-100 text-green-800' };
  if (score >= 60) return { label: 'Moderate', className: 'bg-yellow-100 text-yellow-800' };
  return { label: 'Old', className: 'bg-red-100 text-red-800' };
}

export function trustBadge(score) {
  if (score >= 90) return { label: 'Verified Fresh', className: 'bg-green-100 text-green-800' };
  if (score >= 75) return { label: 'Trusted Farmer', className: 'bg-orange-100 text-orange-800' };
  return { label: 'Needs Review', className: 'bg-red-100 text-red-800' };
}

export function distanceKm(a, b) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return Number((R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))).toFixed(1));
}
