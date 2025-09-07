import React, { useEffect, useState } from 'react';
import { IntegrationCard } from '../components/IntegrationCard';

interface StatusResponse {
  status: string;
  uptime: string;
  errorRate: string;
  lastSync: string;
  nextSync: string;
  authMethod: string;
}

async function fetchStatus(endpoint: string): Promise<StatusResponse> {
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error('Failed to load status');
  }
  return res.json();
}

const placeholder: StatusResponse = {
  status: 'unknown',
  uptime: '0%',
  errorRate: '0%',
  lastSync: '-',
  nextSync: '-',
  authMethod: '-',
};

export default function SettingsIntegrations() {
  const [pantheon, setPantheon] = useState<StatusResponse>(placeholder);
  const [merchant, setMerchant] = useState<StatusResponse>(placeholder);

  useEffect(() => {
    fetchStatus('/api/pantheon/status').then(setPantheon).catch(() => null);
    fetchStatus('/api/merchantpro/status').then(setMerchant).catch(() => null);
  }, []);

  const testPantheon = async () => {
    await fetch('/api/pantheon/test', { method: 'POST' });
    setPantheon(await fetchStatus('/api/pantheon/status'));
  };

  const syncPantheon = async () => {
    await fetch('/api/pantheon/sync', { method: 'POST' });
    setPantheon(await fetchStatus('/api/pantheon/status'));
  };

  const testMerchant = async () => {
    await fetch('/api/merchantpro/test', { method: 'POST' });
    setMerchant(await fetchStatus('/api/merchantpro/status'));
  };

  const syncMerchant = async () => {
    await fetch('/api/merchantpro/sync', { method: 'POST' });
    setMerchant(await fetchStatus('/api/merchantpro/status'));
  };

  return (
    <div className="p-4">
      {pantheon && (
        <IntegrationCard
          name="Pantheon"
          status={pantheon.status}
          uptime={pantheon.uptime}
          errorRate={pantheon.errorRate}
          lastSync={pantheon.lastSync}
          nextSync={pantheon.nextSync}
          authMethod={pantheon.authMethod}
          onTestConnection={testPantheon}
          onTriggerSync={syncPantheon}
        />
      )}
      {merchant && (
        <IntegrationCard
          name="MerchantPro"
          status={merchant.status}
          uptime={merchant.uptime}
          errorRate={merchant.errorRate}
          lastSync={merchant.lastSync}
          nextSync={merchant.nextSync}
          authMethod={merchant.authMethod}
          onTestConnection={testMerchant}
          onTriggerSync={syncMerchant}
        />
      )}
    </div>
  );
}
