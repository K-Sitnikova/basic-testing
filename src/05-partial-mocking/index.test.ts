import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(() => 10),
    mockTwo: jest.fn(() => 10),
    mockThree: jest.fn(() => 10),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    jest.spyOn(console, 'log').mockImplementation(() => null);
    mockOne();
    mockTwo();
    mockThree();
    expect(console.log).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    jest.spyOn(console, 'log').mockImplementation(() => null);
    unmockedFunction();
    expect(console.log).toHaveBeenCalledWith('I am not mocked');
  });
});
