

import React, { useEffect, useState } from 'react';

type KPI = {
  monthly_revenue: number;
  lead_count: number;
  stock_level: number;
  active_customers: number;
};

const icons = [
  (
    <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2M16 11V7a4 4 0 10-8 0v4M12 17v.01"/></svg>
  ),
  (
    <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 4a4 4 0 110 8 4 4 0 010-8z"/></svg>
  ),
  (
    <svg className="w-7 h-7 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3v18h18V3H3zm3 3h12v12H6V6z"/></svg>
  ),
  (
    <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 4a4 4 0 110 8 4 4 0 010-8z"/></svg>
  ),
];

const Dashboard = () => {
  const [kpi, setKpi] = useState<KPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/dashboard/kpi')
      .then(res => {
        if (!res.ok) throw new Error('Greška u API pozivu');
        return res.json();
      })
      .then(data => {
        setKpi(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-2 md:p-4">
      <h1 className="text-3xl font-bold mb-6 tracking-tight text-blue-900">Dashboard</h1>
      {loading && <div>Učitavanje...</div>}
      {error && <div className="text-red-500">Greška: {error}</div>}
      {kpi && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div className="group bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-2 items-start transition-transform hover:scale-105 hover:shadow-2xl border border-slate-100">
              {icons[0]}
              <div className="text-gray-500 text-xs">Mesečni promet</div>
              <div className="text-2xl font-bold text-blue-800">{kpi.monthly_revenue.toLocaleString()} RSD</div>
            </div>
            <div className="group bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-2 items-start transition-transform hover:scale-105 hover:shadow-2xl border border-slate-100">
              {icons[1]}
              <div className="text-gray-500 text-xs">Broj leadova</div>
              <div className="text-2xl font-bold text-green-700">{kpi.lead_count}</div>
            </div>
            <div className="group bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-2 items-start transition-transform hover:scale-105 hover:shadow-2xl border border-slate-100">
              {icons[2]}
              <div className="text-gray-500 text-xs">Nivo zaliha</div>
              <div className="text-2xl font-bold text-yellow-700">{kpi.stock_level}</div>
            </div>
            <div className="group bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-2 items-start transition-transform hover:scale-105 hover:shadow-2xl border border-slate-100">
              {icons[3]}
              <div className="text-gray-500 text-xs">Aktivni kupci</div>
              <div className="text-2xl font-bold text-purple-700">{kpi.active_customers}</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[180px] flex items-center justify-center text-slate-400 text-lg border border-slate-100">
            Grafikon rasta/promena (uskoro)
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
