import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../context/AppContext';

const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function ProductMap({ products }) {
  const { userLocation } = useApp();
  const uniqueFarmers = [...new Map(products.map((product) => [product.farmer.id, product.farmer])).values()];
  return (
    <div className="h-80 overflow-hidden rounded-lg border border-slate-200">
      <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={10} scrollWheelZoom={false}>
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {uniqueFarmers.map((farmer) => (
          <Marker key={farmer.id} position={[farmer.lat, farmer.lng]} icon={icon}>
            <Popup>
              <strong>{farmer.name}</strong><br />{farmer.region}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
