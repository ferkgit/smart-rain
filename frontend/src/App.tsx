
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import CustomersCRM from './components/CustomersCRM';
import Leads from './components/Leads';
import PriceLists from './components/PriceLists';
import Discounts from './components/Discounts';
import Deliveries from './components/Deliveries';
import Integrations from './components/Integrations';
import MapView, { Lead, RouteGeoJSON } from './components/map/MapView';
import RoutePlanner from './components/map/RoutePlanner';

const initialLeads: Lead[] = [
  { id: 1, name: 'Lead 1', lat: 40.0, lon: -74.0, status: 'pending', owner: 'Alice' },
  { id: 2, name: 'Lead 2', lat: 41.0, lon: -73.5, status: 'assigned', owner: 'Bob' }
];

const TABS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'crm', label: 'Kupci & CRM' },
  { key: 'leads', label: 'Leadovi' },
  { key: 'pricelists', label: 'Cenovnici' },
  { key: 'discounts', label: 'Rabati' },
  { key: 'deliveries', label: 'Isporuke' },
  { key: 'integrations', label: 'Integracije' },
  { key: 'map', label: 'Mapa/Planer ruta' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads] = useState<Lead[]>(initialLeads);
  const [route, setRoute] = useState<RouteGeoJSON | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200 shadow-lg">
        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="inline-block w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md">SR</span>
            <span className="font-bold text-xl text-blue-900 tracking-tight">Smart Rain Distribution</span>
          </div>
          <nav className="flex gap-1 md:gap-2">
            {TABS.map(tab => (
              <button
                key={tab.key}
                className={`transition-all px-3 md:px-4 py-2 rounded-xl font-medium tracking-wide shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50
                  ${activeTab === tab.key
                    ? 'bg-blue-600 text-white scale-105 shadow-lg border border-blue-700'
                    : 'bg-slate-100 text-blue-700 hover:bg-blue-100 hover:text-blue-900 border border-transparent'}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="p-4 max-w-7xl mx-auto">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'crm' && <CustomersCRM />}
        {activeTab === 'leads' && <Leads />}
        {activeTab === 'pricelists' && <PriceLists />}
        {activeTab === 'discounts' && <Discounts />}
        {activeTab === 'deliveries' && <Deliveries />}
        {activeTab === 'integrations' && <Integrations />}
        {activeTab === 'map' && (
          <div className="flex flex-col md:flex-row gap-4">
            <RoutePlanner leads={leads} onRoute={setRoute} />
            <MapView leads={leads} route={route} />
          </div>
        )}
      </main>
    </div>
  );
}
