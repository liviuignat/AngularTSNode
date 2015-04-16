var supertest = require('./init').getRequest();
var expect = require('chai').expect;

describe('when server starts', function () {
  beforeEach(function () {});

  describe('when calling /api/v1/', function () {
    var request;
    beforeEach(function () {
      request = supertest.get('/api/v1/');
    });

    it('should return 200 status code', function * () {
      yield supertest.get('/api/v1/').expect(200).end();
    });

    describe('when request is completed', function () {
      var response;
      beforeEach(function * () {
        response = yield supertest.get('/api/v1/').end();
      });

      it('should return a json', function * () {
        expect(response.body.index).to.equals(true);
      });
    });

  });
});
