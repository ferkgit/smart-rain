import React, { useState } from 'react';
import { Lead, RouteGeoJSON } from './MapView';

interface Props {
  leads: Lead[];
  onRoute: (route: RouteGeoJSON) => void;
}

export default function RoutePlanner({ leads, onRoute }: Props) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [depotLat, setDepotLat] = useState('');
  const [depotLon, setDepotLon] = useState('');

  function toggleLead(id: number) {
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const depot = { lat: parseFloat(depotLat), lon: parseFloat(depotLon) };
    try {
      const res = await fetch('/api/optimize-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadIds: selectedIds, depot })
      });
      const data = await res.json();
      if (data.route) onRoute(data.route);
    } catch (err) {
      console.error('Failed to fetch route', err);
    }
  }

  return (
    <div style={{ width: 250, padding: '1rem', background: '#f4f4f4' }}>
      <h3>Route Planner</h3>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Leads</legend>
          {leads.map((lead) => (
            <label key={lead.id} style={{ display: 'block' }}>
              <input
                type="checkbox"
                checked={selectedIds.includes(lead.id)}
                onChange={() => toggleLead(lead.id)}
              />
              {lead.name}
            </label>
          ))}
        </fieldset>
        <div>
          <label>
            Depot Lat
            <input
              type="number"
              value={depotLat}
              onChange={(e) => setDepotLat(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Depot Lon
            <input
              type="number"
              value={depotLon}
              onChange={(e) => setDepotLon(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={!selectedIds.length || !depotLat || !depotLon}>
          Optimize
        </button>
      </form>
    </div>
  );
}
