import React from 'react';

export interface IntegrationCardProps {
  name: string;
  status: string;
  uptime: string;
  errorRate: string;
  lastSync: string;
  nextSync: string;
  authMethod: string;
  onTestConnection: () => Promise<void>;
  onTriggerSync: () => Promise<void>;
}

export function IntegrationCard({
  name,
  status,
  uptime,
  errorRate,
  lastSync,
  nextSync,
  authMethod,
  onTestConnection,
  onTriggerSync,
}: IntegrationCardProps) {
  return (
    <div className="border rounded p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p>Status: {status}</p>
      <p>Uptime: {uptime}</p>
      <p>Error rate: {errorRate}</p>
      <p>Last sync: {lastSync}</p>
      <p>Next sync: {nextSync}</p>
      <p>Auth method: {authMethod}</p>
      <div className="mt-2 flex gap-2">
        <button onClick={onTestConnection} className="px-2 py-1 border rounded">
          Test Connection
        </button>
        <button onClick={onTriggerSync} className="px-2 py-1 border rounded">
          Trigger Sync
        </button>
      </div>
    </div>
  );
}
