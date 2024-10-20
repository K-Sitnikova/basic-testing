import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: '2', action: Action.Add, expected: null },
  { a: 3, b: -2, action: Action.Add, expected: 1 },
  { a: 3, b: 3, action: Action.Subtract, expected: 0 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 0, b: 3, action: Action.Subtract, expected: -3 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 5, b: 0, action: Action.Divide, expected: Infinity },
  { a: -12, b: 0, action: Action.Divide, expected: -Infinity },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 8, b: 4, action: Action.Multiply, expected: 32 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 0, b: 1, action: '123', expected: null },
  { a: 3, b: '3', action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('test simple calc', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
