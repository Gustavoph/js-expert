const Service = require('./service');
const sinon = require('sinon');
const assert = require('assert');
const BASE_URL = 'https://swapi.dev/api';

const mocks = {
  luke: require('./mocks/luke.json'),
  c3po: require('./mocks/c3po.json'),
};

;(async () => {
  const service = await new Service()
  const stub = sinon.stub(service, service.makeRequest.name)

  stub.withArgs(`${BASE_URL}/people/1`).resolves(mocks.luke)
  stub.withArgs(`${BASE_URL}/people/2`).resolves(mocks.c3po)

  {
    {
      const expected = {
        name: "Luke Skywalker",
        birth_year:"19BBY",
        gender: "male",
      }

      const result = await service.getPeoples(`${BASE_URL}/people/1`)
      assert.deepStrictEqual(result, expected)
    }

    {
      const expected = {
        name: "C-3PO",
        birth_year:"112BBY",
        gender: "n/a",
      }

      const result = await service.getPeoples(`${BASE_URL}/people/2`)
      assert.deepStrictEqual(result, expected)
    }
  }
})()
