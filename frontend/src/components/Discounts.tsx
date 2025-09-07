
import React, { useEffect, useState } from 'react';

type Discount = {
  id: number;
  type: string;
  name: string;
  value: number;
  policy: string;
};

const Discounts = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/discounts/rules')
      .then(res => {
        if (!res.ok) throw new Error('Greška u API pozivu');
        return res.json();
      })
      .then(data => {
        setDiscounts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rabati</h1>
      {loading && <div>Učitavanje...</div>}
      {error && <div className="text-red-500">Greška: {error}</div>}
      <div className="bg-white rounded shadow p-4 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Tip</th>
              <th className="text-left p-2">Naziv</th>
              <th className="text-left p-2">Vrednost (%)</th>
              <th className="text-left p-2">Politika</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map(d => (
              <tr key={d.id} className="border-t">
                <td className="p-2">{d.type}</td>
                <td className="p-2">{d.name}</td>
                <td className="p-2">{d.value}</td>
                <td className="p-2">{d.policy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Discounts;
