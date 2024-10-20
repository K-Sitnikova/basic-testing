import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const acc = getBankAccount(100);
    expect(acc.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(100);
    expect(() => acc.withdraw(150)).toThrowError(
      new Error(
        `Insufficient funds: cannot withdraw more than ${acc.getBalance()}`,
      ),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const acc = getBankAccount(100);
    expect(() => acc.transfer(150, acc)).toThrowError(
      new Error('Transfer failed'),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(100);
    expect(() => acc.transfer(100, acc)).toThrowError(
      new Error('Transfer failed'),
    );
  });

  test('should deposit money', () => {
    const acc = getBankAccount(100);
    acc.deposit(50);
    expect(acc.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(100);
    acc.withdraw(10);
    expect(acc.getBalance()).toBe(90);
  });

  test('should transfer money', () => {
    const acc = getBankAccount(100);
    const anotherAcc = getBankAccount(10);
    acc.transfer(20, anotherAcc);
    expect(anotherAcc.getBalance()).toBe(30);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(100);
    const fetchBalanceMock = jest
      .spyOn(acc, 'fetchBalance')
      .mockResolvedValue(100);
    const balance = await acc.fetchBalance();
    expect(balance).not.toBeNull();
    expect(typeof balance).toBe('number');
    expect(balance).toBe(100);
    fetchBalanceMock.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(100);
    const fetchBalanceMock = jest
      .spyOn(acc, 'fetchBalance')
      .mockResolvedValue(150);

    await acc.synchronizeBalance();
    expect(acc.getBalance()).toStrictEqual(150);
    fetchBalanceMock.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(100);
    const fetchBalanceMock = jest
      .spyOn(acc, 'fetchBalance')
      .mockResolvedValue(null);
    await expect(acc.synchronizeBalance()).rejects.toThrowError(
      new Error('Synchronization failed'),
    );
    fetchBalanceMock.mockRestore();
  });
});
