const lib = require('../lib');

// Testing numbers
describe('absolute', () => {
    it('should return positive number for positive input', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('should return positive number for negative input', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('should return 0 for input 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

// Testing string
describe('greet', () => {
    it('should return a proper string', () => {
        const result = lib.greet('Nishan');
        expect(result).toContain('Nishan');
    });
});

// Testing array
describe('getCurrencies', () => {
    it('should return an array of supported currencies', () => {
        const result = lib.getCurrencies();
        expect(result).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']));
    });
});

// Testing Object
describe('getProduct', () => {
    it('should return correct object', () => {
        const result = lib.getProduct(1);
        expect(result).toMatchObject({ 'id': 1, 'price': 10 });
        expect(result).toHaveProperty('id', 1);
    });
});

// Testing exception with "each" method
describe('registerUser', () => {
    it.each([
        null,
        '',
        NaN,
        0,
        undefined,
        false
    ])('should throw exception for "%s" value', a => {
        expect(() => {
            lib.registerUser(a);
        }).toThrow();
    });
});

