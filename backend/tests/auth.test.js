const test = require('node:test');
const assert = require('node:assert/strict');
const { createToken, verifyToken, requiresAuth } = require('../utils/auth');

test('creates and verifies a JWT token', () => {
  const token = createToken({ userId: 1, email: 'demo@example.com' }, 'test-secret');
  const payload = verifyToken(token, 'test-secret');

  assert.equal(payload.userId, 1);
  assert.equal(payload.email, 'demo@example.com');
});

test('allows public GET requests without auth and requires auth for write methods', () => {
  assert.equal(requiresAuth('GET'), false);
  assert.equal(requiresAuth('POST'), true);
  assert.equal(requiresAuth('PUT'), true);
  assert.equal(requiresAuth('DELETE'), true);
});
