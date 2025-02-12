import { StateManager } from './state-manager.js'

/** @import {RawApplicationState} from './state-manager.js' */

const origin = {
  onOffFarm: 'on'
}

const licence = {
  emailAddress: 'test@test.com'
}

const destination = {
  destinationType: 'afu'
}

const biosecurity = {
  keptSeperately: 'yes'
}

const validState = {
  origin,
  destination,
  licence,
  biosecurity
}

/**
 * @param {RawApplicationState} state
 * @returns {any}
 */
const testRequest = (state) => ({
  yar: {
    get: jest.fn().mockImplementation((key) => state[key])
  }
})

describe('StateManager', () => {
  it('extracts the raw application state from a request', () => {
    const request = testRequest(validState)
    const state = new StateManager(request)
    expect(state.toState()).toEqual(validState)
  })

  it('filters out missing sections', () => {
    const partialState = { origin }
    const request = testRequest(partialState)
    const state = new StateManager(request)
    expect(state.toState()).toEqual(partialState)
  })

  it('returns an empty object if no sections are available', () => {
    const request = testRequest({})
    const state = new StateManager(request)
    expect(state.toState()).toEqual({})
  })

  it("should ignore keys it isn't tracking", () => {
    const request = testRequest({ ...validState, someOtherKey: {} })
    const state = new StateManager(request)
    expect(state.toState()).toEqual(validState)
  })
})
