const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const app = require('../server');

test('route optimization returns per-vehicle summaries', async () => {
  const depots = [{ id: 'd1', lat: 0, lng: 0 }];
  const vehicles = [{ id: 'v1', capacity: 10, depotId: 'd1' }];
  const stops = [
    { id: 's1', lat: 0, lng: 1, load: 3 },
    { id: 's2', lat: 0, lng: 2, load: 4 },
    { id: 's3', lat: 0, lng: 3, load: 2 }
  ];

  const res = await request(app).post('/api/routes').send({ depots, vehicles, stops });
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.routes.length, 1);
  const summary = res.body.routes[0];
  assert.strictEqual(summary.vehicleId, 'v1');
  assert(summary.distance > 0);
  assert(summary.etaHours > 0);
  assert(summary.load <= summary.capacity);
  assert.strictEqual(summary.stops.length, stops.length);
});
