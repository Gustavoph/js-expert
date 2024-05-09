import { createSandbox } from 'sinon'
import assert from 'node:assert'

import { Fibonacci } from './fibonacci.js'

const sinon = createSandbox()
const fibonacci = new Fibonacci()

;(async () => {
  {
    const spy = sinon.spy(
      fibonacci,
      fibonacci.execute.name
    )

    for (const sequencia of fibonacci.execute(5)) {}

    const expectedCallCount = 6
    assert.deepStrictEqual(spy.callCount, expectedCallCount)

    const { args } = spy.getCall(2)
    const expectedParams =  [3, 1, 2]
    assert.deepStrictEqual(args, expectedParams)
  }
})()