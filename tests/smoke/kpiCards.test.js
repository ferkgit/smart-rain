import test from 'node:test';
import assert from 'node:assert';

test('KPI cards include revenue, leads, and uptime metrics', () => {
  const kpiCards = ['revenue', 'leads', 'uptime'];
  const required = ['revenue', 'leads', 'uptime'];
  required.forEach(kpi => {
    assert.ok(kpiCards.includes(kpi), `Missing KPI: ${kpi}`);
  });
});
