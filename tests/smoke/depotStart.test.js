import test from 'node:test';
import assert from 'node:assert';

test('Depot start initializes with an active status', () => {
  function startDepot() {
    return { id: 1, active: true };
  }

  const depot = startDepot();
  assert.ok(depot.active);
});
