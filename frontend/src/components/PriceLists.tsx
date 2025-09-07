
import React, { useEffect, useState } from 'react';

type PriceItem = {
  sku: string;
  name: string;
  group: string;
  price: number;
  with_vat: number;
};

type PriceList = {
  id: number;
  type: string;
  name: string;
  items: PriceItem[];
};

const itemIcon = (group: string) => {
  if (group === 'Cevi') return <svg className="inline w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="4"/><path d="M4 12h16"/></svg>;
  if (group === 'Spojnice') return <svg className="inline w-5 h-5 mr-1 text-cyan-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M8 12h8"/></svg>;
  return <svg className="inline w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="10" width="12" height="4" rx="2"/></svg>;
};

const PriceLists = () => {
  const [pricelists, setPricelists] = useState<PriceList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetch('/pricing/pricelists')
      .then(res => {
        if (!res.ok) throw new Error('Greška u API pozivu');
        return res.json();
      })
      .then(data => {
        setPricelists(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = filter === 'all' ? pricelists : pricelists.filter(pl => pl.type === filter);

  return (
    <div className="p-2 md:p-4">
      <h1 className="text-3xl font-bold mb-6 tracking-tight text-blue-900">Cenovnici</h1>
      <div className="mb-4 flex gap-2">
        <button className={`px-3 py-1 rounded-xl font-semibold transition-all shadow-sm border border-blue-200
          ${filter === 'all' ? 'bg-blue-600 text-white scale-105' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`} onClick={() => setFilter('all')}>Svi</button>
        <button className={`px-3 py-1 rounded-xl font-semibold transition-all shadow-sm border border-blue-200
          ${filter === 'VP' ? 'bg-blue-600 text-white scale-105' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`} onClick={() => setFilter('VP')}>Veleprodajni</button>
        <button className={`px-3 py-1 rounded-xl font-semibold transition-all shadow-sm border border-blue-200
          ${filter === 'MP' ? 'bg-blue-600 text-white scale-105' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`} onClick={() => setFilter('MP')}>Maloprodajni</button>
      </div>
      {loading && <div>Učitavanje...</div>}
      {error && <div className="text-red-500">Greška: {error}</div>}
      {filtered.map(pl => (
        <div key={pl.id} className="mb-8">
          <div className={`rounded-2xl shadow-lg border p-6 mb-2 flex items-center gap-4
            ${pl.type === 'VP' ? 'bg-blue-50 border-blue-200' : 'bg-cyan-50 border-cyan-200'}`}>
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="4"/><path d="M4 12h16"/></svg>
            <div>
              <h2 className="text-lg font-semibold text-blue-900">{pl.name} <span className="text-xs font-bold px-2 py-1 rounded bg-blue-100 text-blue-700 ml-2">{pl.type}</span></h2>
              <div className="text-xs text-slate-500">Ukupno artikala: {pl.items.length}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 overflow-x-auto border border-slate-100">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 bg-blue-100/80">
                <tr>
                  <th className="text-left p-2 font-semibold text-blue-700">Šifra</th>
                  <th className="text-left p-2 font-semibold text-blue-700">Naziv</th>
                  <th className="text-left p-2 font-semibold text-blue-700">Grupa</th>
                  <th className="text-left p-2 font-semibold text-blue-700">Cena bez PDV</th>
                  <th className="text-left p-2 font-semibold text-blue-700">Cena sa PDV</th>
                </tr>
              </thead>
              <tbody>
                {pl.items.map(item => (
                  <tr key={item.sku} className="border-t hover:bg-blue-50 transition">
                    <td className="p-2 font-mono text-blue-700">{item.sku}</td>
                    <td className="p-2 font-medium text-blue-900">{itemIcon(item.group)}{item.name}</td>
                    <td className="p-2">{item.group}</td>
                    <td className="p-2">{item.price.toLocaleString()} RSD</td>
                    <td className="p-2">{item.with_vat.toLocaleString()} RSD</td>
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

export default PriceLists;
