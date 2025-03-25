import { onOffFarmPage } from '~/src/server/origin/on-off-farm/index.js'
import { StateManager } from './state-manager.js'

/** @import {RawApplicationState} from './state-manager.js' */

const origin = {
  onOffFarm: 'on',
  originType: 'afu'
}

const licence = {
  emailAddress: 'test@test.com'
}

const destination = {
  destinationType: 'afu'
}

const identification = {
  earTags: 'yes'
}

const biosecurity = {
  keptSeperately: 'yes'
}

const validState = {
  origin,
  destination,
  identification,
  licence,
  biosecurity
}

/**
 * @param {RawApplicationState} state
 * @returns {any}
 */
const testRequest = (state) => ({
  yar: {
    get: jest.fn().mockReturnValue(state),
    set: jest.fn()
  }
})

describe('StateManager.toState', () => {
  it('extracts the raw application state from a request', () => {
    const request = testRequest(validState)
    const state = new StateManager(request)
    expect(state.toState()).toEqual(validState)
  })

  it('filters out missing sections', () => {
    const partialState = { origin }
    const request = testRequest(partialState)
    const state = new StateManager(request)
    expect(state.toState()).toStrictEqual(partialState)
  })

  it('returns an empty object if no sections are available', () => {
    const request = testRequest({})
    const state = new StateManager(request)
    expect(state.toState()).toEqual({})
  })
})

describe('StateManager.set', () => {
  it('should preserve the existing state and add set the new values', () => {
    const request = testRequest(validState)
    const state = new StateManager(request)

    state.set(onOffFarmPage, new onOffFarmPage.Answer({ onOffFarm: 'off' }))

    expect(request.yar.set).toHaveBeenCalledWith('application', {
      ...validState,
      origin: {
        ...validState.origin,
        onOffFarm: 'off'
      }
    })
  })
})
