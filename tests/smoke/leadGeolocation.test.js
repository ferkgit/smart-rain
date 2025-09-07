import test from 'node:test';
import assert from 'node:assert';

test('Lead has valid latitude and longitude', () => {
  const lead = { lat: 40.7128, lng: -74.0060 };
  assert.strictEqual(typeof lead.lat, 'number');
  assert.strictEqual(typeof lead.lng, 'number');
  assert.ok(lead.lat >= -90 && lead.lat <= 90);
  assert.ok(lead.lng >= -180 && lead.lng <= 180);
});
