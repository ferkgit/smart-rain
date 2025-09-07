import test from 'node:test';
import assert from 'node:assert';

test('Price list contains at least one item', () => {
  const priceList = [{ id: 1, price: 100 }];
  assert.ok(Array.isArray(priceList));
  assert.ok(priceList.length > 0);
});
