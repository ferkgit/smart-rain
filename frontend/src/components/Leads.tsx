

import React, { useEffect, useState } from 'react';

type Lead = {
  id: number;
  name: string;
  status: string;
  source: string;
  owner: string;
  address: string;
  lat: number;
  lon: number;
};

// SVG ikonice
const statusIcon = (status: string) => {
  if (status === 'novi') return <svg className="inline w-5 h-5 mr-1 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>;
  if (status === 'kontaktiran') return <svg className="inline w-5 h-5 mr-1 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/></svg>;
  if (status === 'u obradi') return <svg className="inline w-5 h-5 mr-1 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
  return <svg className="inline w-5 h-5 mr-1 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>;
};

const sourceIcon = (source: string) => {
  if (source === 'web') return <svg className="inline w-4 h-4 mr-1 text-cyan-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/></svg>;
  if (source === 'email') return <svg className="inline w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>;
  if (source === 'telefon') return <svg className="inline w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 01-2.18 2A19.86 19.86 0 013 5.18 2 2 0 015 3h2.09a2 2 0 012 1.72c.13.81.36 1.6.7 2.34a2 2 0 01-.45 2.11l-.27.27a16 16 0 006.29 6.29l.27-.27a2 2 0 012.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0121 16.92z"/></svg>;
  return <svg className="inline w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>;
};

const ownerIcon = <svg className="inline w-4 h-4 mr-1 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0113 0"/></svg>;

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/crm/leads')
      .then(res => {
        if (!res.ok) throw new Error('Greška u API pozivu');
        return res.json();
      })
      .then(data => {
        setLeads(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-2 md:p-4">
      <h1 className="text-3xl font-bold mb-6 tracking-tight text-green-900">Leadovi</h1>
      {loading && <div>Učitavanje...</div>}
      {error && <div className="text-red-500">Greška: {error}</div>}
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-cyan-100 rounded-2xl shadow-lg p-6 border border-green-100">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-semibold text-lg text-green-800">Tabela leadova</span>
          <span className="text-xs text-slate-400">Ukupno: {leads.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-green-100/80">
              <tr>
                <th className="text-left p-2 font-semibold text-green-700">Naziv</th>
                <th className="text-left p-2 font-semibold text-green-700">Status</th>
                <th className="text-left p-2 font-semibold text-green-700">Izvor</th>
                <th className="text-left p-2 font-semibold text-green-700">Vlasnik</th>
                <th className="text-left p-2 font-semibold text-green-700">Adresa</th>
                <th className="text-left p-2 font-semibold text-green-700">Lat</th>
                <th className="text-left p-2 font-semibold text-green-700">Lon</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l, i) => (
                <tr key={l.id} className={i % 2 === 0 ? 'bg-white' : 'bg-green-50 hover:bg-green-100 transition'}>
                  <td className="p-2 font-medium text-green-900">{l.name}</td>
                  <td className="p-2">
                    {statusIcon(l.status)}
                    <span className={`px-2 py-1 rounded text-xs font-bold shadow-sm
                      ${l.status === 'novi' ? 'bg-green-200 text-green-800' :
                        l.status === 'kontaktiran' ? 'bg-blue-200 text-blue-800' :
                        l.status === 'u obradi' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-gray-200 text-gray-800'}`}>{l.status}</span>
                  </td>
                  <td className="p-2">
                    {sourceIcon(l.source)}
                    <span className="px-2 py-1 rounded text-xs bg-cyan-100 text-cyan-800 font-semibold">{l.source}</span>
                  </td>
                  <td className="p-2">
                    {ownerIcon}
                    {l.owner}
                  </td>
                  <td className="p-2">{l.address}</td>
                  <td className="p-2 font-mono text-blue-700">{l.lat}</td>
                  <td className="p-2 font-mono text-blue-700">{l.lon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leads;
