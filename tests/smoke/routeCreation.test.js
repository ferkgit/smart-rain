import test from 'node:test';
import assert from 'node:assert';

test('Route creation returns a route with start and end points', () => {
  function createRoute(start, end) {
    return { start, end, distanceKm: 5 };
  }

  const route = createRoute('A', 'B');
  assert.deepStrictEqual(route, { start: 'A', end: 'B', distanceKm: 5 });
});
