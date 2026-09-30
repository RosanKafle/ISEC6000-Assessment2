const mockGet = jest.fn();
const mockListen = jest.fn();

jest.mock('express', () => {
  return jest.fn(() => ({
    get: mockGet,
    listen: mockListen
  }));
});

test('GET / returns Hello World!', () => {
  require('../app');

  expect(mockGet).toHaveBeenCalledWith('/', expect.any(Function));

  const handler = mockGet.mock.calls[0][1];

  const res = {
    send: jest.fn()
  };

  handler({}, res);

  expect(res.send).toHaveBeenCalledWith('Hello World!');
  expect(mockListen).toHaveBeenCalledWith(8080);
});

