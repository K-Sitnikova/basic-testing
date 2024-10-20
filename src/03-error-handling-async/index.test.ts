import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(resolveValue('some val')).resolves.toBe('some val');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'failed';
    expect(() => throwError(message)).toThrowError(new Error(message));
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMsg = 'Oops!';
    expect(() => throwError()).toThrowError(new Error(defaultMsg));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(() => rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
