import { StateManager } from './state-manager.js'

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

describe('StateManager', () => {
  it('extracts the raw application state from a request', () => {
    const request = /** @type {Request} */ {
      ...jest.requireActual('@hapi/hapi'),
      yar: {
        get: jest.fn().mockImplementation((key) => validState[key])
      }
    }
    const state = new StateManager(request)
    expect(state.toState()).toEqual(validState)
  })
})
