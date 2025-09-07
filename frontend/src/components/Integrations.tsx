
import React, { useEffect, useState } from 'react';

type Integration = {
  name: string;
  status: string;
  uptime: string;
  error_rate: string;
  last_sync: string;
  next_sync: string;
  auth_method: string;
};

const statusColor = (status: string) => {
  if (status === 'connected') return 'bg-green-500';
  if (status === 'degraded') return 'bg-yellow-500';
  return 'bg-red-500';
};

const Integrations = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/integrations/status')
      .then(res => {
        if (!res.ok) throw new Error('Greška u API pozivu');
        return res.json();
      })
      .then(data => {
        setIntegrations(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Integracije</h1>
      {loading && <div>Učitavanje...</div>}
      {error && <div className="text-red-500">Greška: {error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map(intg => (
          <div key={intg.name} className="bg-white rounded shadow p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className={`inline-block w-3 h-3 rounded-full ${statusColor(intg.status)}`}></span>
              <span className="font-semibold text-lg">{intg.name}</span>
              <span className="ml-auto text-sm text-gray-500">{intg.status}</span>
            </div>
            <div className="text-sm text-gray-600">Uptime: {intg.uptime} | Error rate: {intg.error_rate}</div>
            <div className="text-sm text-gray-600">Poslednji sync: {new Date(intg.last_sync).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Sledeći sync: {new Date(intg.next_sync).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Auth metoda: {intg.auth_method}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Integrations;
