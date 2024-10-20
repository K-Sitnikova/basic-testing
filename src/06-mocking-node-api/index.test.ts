import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  const callback = () => null;
  const timeout = 1000;
  let spyTimeout: jest.SpyInstance;

  beforeEach(() => (spyTimeout = jest.spyOn(global, 'setTimeout')));
  afterEach(() => jest.clearAllMocks());

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, timeout);
    expect(spyTimeout).toBeCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const mockedCallback = jest.fn(callback);
    doStuffByTimeout(mockedCallback, timeout);
    expect(mockedCallback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(mockedCallback).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  const callback = () => null;
  const interval = 500;
  let spyInterval = jest.spyOn(global, 'setInterval');
  beforeEach(() => (spyInterval = jest.spyOn(global, 'setInterval')));
  afterEach(() => jest.clearAllMocks());
  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, interval);
    expect(spyInterval).toBeCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockedCallback = jest.fn(callback);
    doStuffByInterval(mockedCallback, interval);
    expect(mockedCallback).not.toBeCalled();
    jest.advanceTimersByTime(interval);
    expect(mockedCallback).toBeCalledTimes(1);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'test.txt';
  const fileContent = 'test123';

  let mockJoin: jest.SpyInstance;
  let mockFileExist: jest.SpyInstance;
  let mockReadFile;

  beforeEach(() => {
    mockJoin = jest.spyOn(path, 'join');

    mockFileExist = jest.spyOn(fs, 'existsSync');
    mockFileExist.mockReturnValue(false);

    mockReadFile = jest.spyOn(fs.promises, 'readFile');
    mockReadFile.mockResolvedValue(Buffer.from(fileContent));
  });
  afterEach(() => jest.clearAllMocks());

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(pathToFile);
    expect(mockJoin).toBeCalled();
  });

  test('should return null if file does not exist', async () => {
    await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    mockFileExist.mockReturnValueOnce(true);
    await expect(readFileAsynchronously(pathToFile)).resolves.toBe(fileContent);
  });
});
