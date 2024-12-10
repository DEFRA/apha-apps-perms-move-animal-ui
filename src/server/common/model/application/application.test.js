import { Application } from './application.js'
import { OnOffFarm } from '../answer/on-off-farm.js'

const originDefaultState = {
  onOffFarm: new OnOffFarm({ onOffFarm: 'on' }).toState(),
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

    const application = Application.fromState(state)

    expect(application).toBeInstanceOf(Application)
    expect(application._data.origin._data.address.value).toBeDefined()
    expect(application._data.origin._data.cphNumber.value).toBeDefined()
    expect(application._data.origin._data.onOffFarm.value).toBeDefined()
    expect(application._data.licence._data.emailAddress.value).toBeDefined()
  })

  it('should create an Application instance with undefined sections from an undefined state', () => {
    const application = Application.fromState(undefined)

    expect(application).toBeInstanceOf(Application)
    expect(application._data.origin._data.address.value).toBeUndefined()
    expect(application._data.licence._data.emailAddress.value).toBeUndefined()
  })
})
