
import React, { useEffect, useState } from 'react';

type DeliveryStop = {
  address: string;
  eta: string;
  cargo: number;
  capacity: number;
};

type Delivery = {
  id: number;
  vehicle: string;
  stops: DeliveryStop[];
  distance_km: number;
  start_depot: string;
  total_eta: string;
};

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/routing/deliveries')
      .then(res => {
        if (!res.ok) throw new Error('Greška u API pozivu');
        return res.json();
      })
      .then(data => {
        setDeliveries(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Isporuke</h1>
      {loading && <div>Učitavanje...</div>}
      {error && <div className="text-red-500">Greška: {error}</div>}
      {deliveries.map(delivery => (
        <div key={delivery.id} className="mb-8">
          <h2 className="text-lg font-semibold mb-2">{delivery.vehicle} (depo: {delivery.start_depot})</h2>
          <div className="mb-2 text-sm text-gray-600">Ukupna distanca: {delivery.distance_km} km, ETA: {delivery.total_eta}</div>
          <div className="bg-white rounded shadow p-4 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Adresa</th>
                  <th className="text-left p-2">ETA</th>
                  <th className="text-left p-2">Teret</th>
                  <th className="text-left p-2">Kapacitet vozila</th>
                </tr>
              </thead>
              <tbody>
                {delivery.stops.map((stop, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{stop.address}</td>
                    <td className="p-2">{stop.eta}</td>
                    <td className="p-2">{stop.cargo} kg</td>
                    <td className="p-2">{stop.capacity} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Deliveries;
