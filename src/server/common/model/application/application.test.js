import { ApplicationModel } from './application.js'
import { OnOffFarmAnswer } from '../answer/on-off-farm/on-off-farm.js'

/**
 * @import {Origin} from '../section/origin/origin.js'
 */

const originDefaultState = {
  onOffFarm: new OnOffFarmAnswer({ onOffFarm: 'on' }).toState(),
  cphNumber: '12/123/1234',
  address: {
    addressLine1: 'Starfleet Headquarters',
    addressLine2: '24-593 Federation Drive',
    addressTown: 'San Francisco',
    addressCounty: 'San Francisco',
    addressPostcode: 'RG24 8RR'
  }
}

const licenceDefaultState = {
  emailAddress: 'name@example.com'
}

describe('Application', () => {
  it('should create an Application instance from a valid state', () => {
    const state = {
      origin: originDefaultState,
      licence: licenceDefaultState
    }

    const application = ApplicationModel.fromState(state)

    expect(application).toBeInstanceOf(ApplicationModel)

    const origin = application.origin
    const licence = application.licence

    expect(origin.address.value).toBeDefined()
    expect(origin.cphNumber.value).toBeDefined()
    expect(origin.onOffFarm.value).toBeDefined()
    expect(licence.emailAddress.value).toBeDefined()
  })

  it('should create an Application instance with undefined sections from an undefined state', () => {
    const application = ApplicationModel.fromState(undefined)

    expect(application).toBeInstanceOf(ApplicationModel)
    expect(application._data.origin._data.address.value).toBeUndefined()
    expect(application._data.licence._data.emailAddress.value).toBeUndefined()
  })
})
