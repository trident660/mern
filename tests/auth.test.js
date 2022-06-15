// this is the file we're checking
const auth = require('../middleware/auth');

describe('auth', function() {
    // simple test 1
    it('should exist', function() {
        expect(auth).toBeDefined();
    });
    // simple test 2
    it('should be a function', function() {
        expect(typeof auth).toBe('function');
    });
});