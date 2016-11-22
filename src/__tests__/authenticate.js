import assert from 'assert';
import { authenticate } from '../authenticate';

test('authenticate is a function', () => {
  assert.equal(typeof authenticate, 'function');
});
