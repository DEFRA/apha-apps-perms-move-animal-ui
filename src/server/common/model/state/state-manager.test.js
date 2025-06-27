import { onOffFarmPage } from '~/src/server/tb/origin/on-off-farm/index.js'
import { StateManagerAbstract } from './state-manager.js'
import { NotImplementedError } from '../../helpers/not-implemented-error.js'

/** @import {RawApplicationState} from './state-manager.js' */
/** @import {Request} from '@hapi/hapi' */

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

class TestStateManager extends StateManagerAbstract {
  get key(){
    return 'test-key'
  }
}

describe('StateManager.toState', () => {
  it('extracts the raw application state from a request', () => {
    const request = testRequest(validState)
    const state = new TestStateManager(request)
    expect(state.toState()).toEqual(validState)
    expect(request.yar.get).toHaveBeenCalledWith('test-key')
  })

  it('filters out missing sections', () => {
    const partialState = { origin }
    const request = testRequest(partialState)
    const state = new TestStateManager(request)
    expect(state.toState()).toStrictEqual(partialState)
    expect(request.yar.get).toHaveBeenCalledWith('test-key')
  })

  it('returns an empty object if no sections are available', () => {
    const request = testRequest({})
    const state = new TestStateManager(request)
    expect(state.toState()).toEqual({})
    expect(request.yar.get).toHaveBeenCalledWith('test-key')
  })
})

describe('StateManager.set', () => {
  it('should preserve the existing state and add set the new values', () => {
    const request = testRequest(validState)
    const state = new TestStateManager(request)

    state.set(onOffFarmPage, new onOffFarmPage.Answer({ onOffFarm: 'off' }))

    expect(request.yar.set).toHaveBeenCalledWith('test-key', {
      ...validState,
      origin: {
        ...validState.origin,
        onOffFarm: 'off'
      }
    })
  })
})

describe('StateManager.key', () => {
  it('should throw NotImplementedError', () => {
    expect(() => new StateManagerAbstract(/** @type {Request} */({})).key).toThrow(NotImplementedError)
  })
})
