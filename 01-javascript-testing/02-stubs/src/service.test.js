import assert from 'node:assert'
import { createSandbox } from 'sinon'

import alderaan from '../mocks/alderaan.json' assert { type: 'json' }
import tatooine from '../mocks/tatooine.json' assert { type: 'json' }
import { Service } from './service.js'

const sinon = createSandbox()

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/'
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/'

;(async () => {
  const service = new Service()
  
  const stub = sinon.stub(
    service,
    service.makeRequest.name
  )

  stub
    .withArgs(BASE_URL_1)
    .resolves(tatooine)
  
  stub
    .withArgs(BASE_URL_2)
    .resolves(alderaan)

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appeardIn: 5
    }

    const result = await service.getPlanets(BASE_URL_1)

    assert.deepStrictEqual(result, expected)
  }

  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appeardIn: 2
    }

    const result = await service.getPlanets(BASE_URL_2)

    assert.deepStrictEqual(result, expected)
  }
})()