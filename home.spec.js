"use strict";

const home      = require('./home');
const assert    = require('assert');

const brackets                      = home.brackets,
      identical                     = home.identical,
      maxThreeNumbersComposition    = home.maxThreeNumbersComposition,
      workOpn                       = home.workOpn;

describe('maxThreeNumbersComposition', function () {
    let arr = [99, 11, 42, -17, 27, 78, -16];

    it('should return null if arr is empty', function () {
      let result = maxThreeNumbersComposition([]);
      assert(result === null, 'Should be null');
    });

    it('should return null if arr length < 3', function () {
        let result = maxThreeNumbersComposition([1, 3]);
        assert(result === null, 'Should be null');
    });
    
    it('should return number', function () {
        let result = maxThreeNumbersComposition(arr);
        assert(typeof result === 'number', 'Should be number')
    });

    it('should return 324324 as correct result', function () {
        let result = maxThreeNumbersComposition(arr);
        assert(result === 324324, 'Should be 324324');
    });

});

describe('identical', function () {
    let one = [2, 2, 4, 1];
    let two = [1, 2, 0, 2];

    it('should return null if both arrays are empty', function () {
        let result = identical([], []);
        assert(result === null, 'Should be null');
    });

    it('should return null if one or both params are not arrays', function () {
        let result = identical(one, 23);
        assert(result === null, 'Should be null');
    });

    it('should return array', function () {
        let result = identical(one, two);
        assert(Array.isArray(result), 'Should be array')
    });

    it('should return [2,1] as correct value', function () {
        let result = identical(one, two);
        assert(result.length === 2 && result[0] === 2 && result[1] === 1, 'Should be [2,1]');
    });

});

describe('brackets', function () {
    it('should return null if param is not string', function () {
        let result = brackets(23);
        assert(result === null, 'Should be null');
    });

    it('should return null if in string not only brackets', function () {
        let result = brackets('{2}2');
        assert(result === null, 'Should be null');
    });

    it('should return false if first symbol is }', function () {
        let result = brackets('}{}{}}');
        assert(result === false, 'Should be false');
    });

    it('should return false if string length is uneven', function () {
        let result = brackets('{{}{}');
        assert(result === false, 'Should be false');
    });

    it('should return false if string has incorrect brackets order', function () {
        let result = brackets('{{}{}}}{');
        assert(result === false, 'Should be false');
    });

    it('should return true for string with correct string order', function () {
        let result = brackets('{{}{}}{}');
        assert(result === true, 'Should be true');
    });

});

describe('workOpn', function () {
    it('should return 1 if param is not string', function () {
        let result = workOpn(23);
        assert(result === 1, 'Should be 1');
    });

    it('should return 2 if string contain 2 digit number', function () {
        let result = workOpn('22+33');
        assert(result === 2, 'Should be 2');
    });

    it('should return 3 if string contain not digit and not correct symbol', function () {
        let result = workOpn('(2+t)');
        assert(result === 3, 'Should be 3');
    });

    it('should return 14 as correct result expression "7 + 7" ', function () {
        let result = workOpn('7+7');
        assert(result === 14, 'Should be 14');
    });

    it('should return 5 as correct result expression "(7+9-4)/(1+1*2)+1" ', function () {
        let result = workOpn('(7+9-4)/(1+1*2)+1');
        assert(result === 5, 'Should be 5');
    });
});

