
import React, { useEffect, useState } from 'react';

type Customer = {
  id: number;
  name: string;
  pib: string;
  grad: string;
  tier: string;
};

const CustomersCRM = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/crm/customers')
      .then(res => {
        if (!res.ok) throw new Error('Greška u API pozivu');
        return res.json();
      })
      .then(data => {
        setCustomers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-2 md:p-4">
      <h1 className="text-3xl font-bold mb-6 tracking-tight text-blue-900">Kupci & CRM</h1>
      {loading && <div>Učitavanje...</div>}
      {error && <div className="text-red-500">Greška: {error}</div>}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-semibold text-lg text-blue-800">Lista kupaca</span>
          <span className="text-xs text-slate-400">Ukupno: {customers.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-blue-50/80">
              <tr>
                <th className="text-left p-2 font-semibold text-blue-700">Naziv</th>
                <th className="text-left p-2 font-semibold text-blue-700">PIB</th>
                <th className="text-left p-2 font-semibold text-blue-700">Grad</th>
                <th className="text-left p-2 font-semibold text-blue-700">Tier</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <tr key={c.id} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                  <td className="p-2 font-medium text-blue-900">{c.name}</td>
                  <td className="p-2 font-mono text-blue-700">{c.pib}</td>
                  <td className="p-2">{c.grad}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${c.tier === 'A' ? 'bg-green-100 text-green-700' : c.tier === 'B' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{c.tier}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersCRM;
