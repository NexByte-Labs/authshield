const authenticate = require('../middleware/authenticate');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

test('returns 401 when no Authorization header', () => {
  const req = { headers: {} };
  const res = mockRes();
  const next = jest.fn();

  authenticate(req, res, next);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({ error: 'Authorization header missing' });
});
