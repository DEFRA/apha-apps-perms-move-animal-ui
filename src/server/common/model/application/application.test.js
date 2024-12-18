import { ApplicationModel } from './application.js'
import { OnOffFarmAnswer } from '../answer/on-off-farm/on-off-farm.js'
import { LicenceSection } from '../section/licence/licence.js'
import { OriginSection } from '../section/origin/origin.js'

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

    expect(application.origin).toBeInstanceOf(OriginSection)
    expect(application.licence).toBeInstanceOf(LicenceSection)
  })

  it('should create an Application instance with undefined sections from an undefined state', () => {
    const application = ApplicationModel.fromState(undefined)

    expect(application).toBeInstanceOf(ApplicationModel)
    expect(application._data.origin._data.address.value).toBeUndefined()
    expect(application._data.licence._data.emailAddress.value).toBeUndefined()
  })
})
