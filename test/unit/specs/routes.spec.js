const assert = require('assert');
const server = require('../../../app');

describe('Api routes', () => {
  it('Endpoint /', () => {
    const request = {
      method: 'GET',
      url: '/',
    };

    return server.inject(request).then((response) => {
      assert.equal(200, response.statusCode);
    });
  });
});
