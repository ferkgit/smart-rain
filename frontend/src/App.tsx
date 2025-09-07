import React, { useState } from 'react';
import MapView, { Lead, RouteGeoJSON } from './components/map/MapView';
import RoutePlanner from './components/map/RoutePlanner';

const initialLeads: Lead[] = [
  { id: 1, name: 'Lead 1', lat: 40.0, lon: -74.0, status: 'pending', owner: 'Alice' },
  { id: 2, name: 'Lead 2', lat: 41.0, lon: -73.5, status: 'assigned', owner: 'Bob' }
];

export default function App() {
  const [leads] = useState<Lead[]>(initialLeads);
  const [route, setRoute] = useState<RouteGeoJSON | null>(null);

  return (
    <div style={{ display: 'flex' }}>
      <RoutePlanner leads={leads} onRoute={setRoute} />
      <MapView leads={leads} route={route} />
    </div>
  );
}
