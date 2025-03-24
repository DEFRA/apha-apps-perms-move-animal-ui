import { onOffFarmPage } from '~/src/server/origin/on-off-farm/index.js'
import { StateManager } from './state-manager.js'
import { originTypePage } from '~/src/server/origin/origin-type/index.js'

/** @import {RawApplicationState} from './state-manager.js' */
/** @import {RawSectionState} from './state-manager.js' */

/** @type {RawSectionState} */
const origin = {
  onOffFarm: 'on'
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

const validSections = {
  origin,
  destination,
  identification,
  licence,
  biosecurity
}

/** @type {RawApplicationState} */
const validState = {
  application: validSections
}

/**
 * @param {RawApplicationState} state
 * @returns {any}
 */
const testRequest = (state) => ({
  yar: {
    get: jest.fn().mockImplementation((key) => state[key]),
    set: jest.fn()
  }
})

describe('StateManager.toState', () => {
  it('extracts the raw application state from a request', () => {
    const request = testRequest(validState)
    const state = new StateManager(request)
    expect(state.toState()).toEqual(validSections)
  })

  it('filters out missing sections', () => {
    const partialState = { application: { origin } }
    const request = testRequest(partialState)
    const state = new StateManager(request)
    expect(state.toState()).toEqual(partialState.application)
  })

  it('returns an empty object if no sections are available', () => {
    const request = testRequest({ application: {} })
    const state = new StateManager(request)
    expect(state.toState()).toEqual({})
  })

  it("should ignore keys it isn't tracking", () => {
    const request = testRequest({ ...validState, ...{ someOtherKey: {} } })
    const state = new StateManager(request)
    expect(state.toState()).toEqual(validSections)
  })
})

describe('StateManager.update', () => {
  it('extracts the raw application state from a request', () => {
    const request = testRequest(validState)
    const state = new StateManager(request)

    state.set(onOffFarmPage, new onOffFarmPage.Answer({ onOffFarm: 'off' }))

    expect(request.yar.set).toHaveBeenCalledWith(
      'application',
      expect.objectContaining({
        origin: {
          onOffFarm: 'off'
        }
      })
    )
  })

  it('should preserve the existing state', () => {
    const request = testRequest(validState)
    const state = new StateManager(request)

    state.set(originTypePage, new originTypePage.Answer({ originType: 'afu' }))

    expect(request.yar.set).toHaveBeenCalledWith(
      'application',
      expect.objectContaining({
        origin: {
          onOffFarm: 'on',
          originType: 'afu'
        }
      })
    )
  })
})
