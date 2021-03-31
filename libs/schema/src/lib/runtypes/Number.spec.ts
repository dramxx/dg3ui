import { Int, PositiveInt, PositiveZeroInt } from './Number';

describe('Number runtype helpers', () => {
  describe('Int', () => {
    it('matches integer', () => {
      Int.check(5);
    });
    it('does not match floating point', () => {
      expect(() => Int.check(25.214)).toThrow();
    });
    it('does not match infinity', () => {
      expect(() => Int.check(Number.NEGATIVE_INFINITY)).toThrow();
    });
  });
  describe('PositiveInt', () => {
    it('matches positive integer', () => {
      PositiveInt.check(5);
    });
    it('does not match zero', () => {
      expect(() => PositiveInt.check(0)).toThrow();
    });
    it('does not match negative integer', () => {
      expect(() => PositiveInt.check(-5)).toThrow();
    });
    it('does not match floating point', () => {
      expect(() => PositiveInt.check(25.24)).toThrow();
    });
  });
  describe('PositiveZeroInt', () => {
    it('matches positive integer', () => {
      PositiveZeroInt.check(5);
    });
    it('matches zero', () => {
      PositiveZeroInt.check(0);
    });
    it('does not match negative integer', () => {
      expect(() => PositiveZeroInt.check(-5)).toThrow();
    });
    it('does not match floating point', () => {
      expect(() => PositiveZeroInt.check(25.24)).toThrow();
    });
  });
});
