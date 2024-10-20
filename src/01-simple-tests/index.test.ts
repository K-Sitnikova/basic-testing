import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = {
      a: 2,
      b: 3,
      action: Action.Add,
    };
    expect(simpleCalculator(input)).toBe(5);
  });

  test('should subtract two numbers', () => {
    const input = {
      a: 6,
      b: 3,
      action: Action.Subtract,
    };
    const resultBelowZero = {
      a: 3,
      b: 6,
      action: Action.Subtract,
    };
    const substractNegativeNum = {
      a: -3,
      b: 6,
      action: Action.Subtract,
    };
    expect(simpleCalculator(input)).toBe(3);
    expect(simpleCalculator(resultBelowZero)).toBe(-3);
    expect(simpleCalculator(substractNegativeNum)).toBe(-9);
  });

  test('should multiply two numbers', () => {
    const input = {
      a: 2,
      b: 3,
      action: Action.Multiply,
    };
    expect(simpleCalculator(input)).toBe(6);
  });

  test('should divide two numbers', () => {
    const input = {
      a: 8,
      b: 2,
      action: Action.Divide,
    };
    expect(simpleCalculator(input)).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    const input = {
      a: 3,
      b: 3,
      action: Action.Exponentiate,
    };
    expect(simpleCalculator(input)).toBe(27);
  });

  test('should return null for invalid action', () => {
    const input = {
      a: 2,
      b: 3,
      action: 'delete',
    };
    expect(simpleCalculator(input)).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const inputString = {
      a: '2',
      b: 3,
      action: Action.Exponentiate,
    };
    const divideZero = {
      a: 2,
      b: 0,
      action: Action.Divide,
    };
    expect(simpleCalculator(inputString)).toBe(null);
    expect(simpleCalculator(divideZero)).toBe(Infinity);
  });
});
