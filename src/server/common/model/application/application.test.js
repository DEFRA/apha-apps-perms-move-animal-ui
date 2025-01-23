import { ApplicationModel } from './application.js'
import { LicenceSection } from '../section/licence/licence.js'
import { OriginSection } from '../section/origin/origin.js'
import { DestinationSection } from '../section/destination/destination.js'

/** @import {OnOffFarmData} from '../answer/on-off-farm/on-off-farm.js' */
const originDefaultState = {
  onOffFarm: /** @type {OnOffFarmData} */ ('on'),
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

/** @type {import('../section/destination/destination.js').DestinationData} */
const destinationDefaultState = {
  destinationType: 'dedicated-sale'
}

describe('Application', () => {
  it('should create an Application instance from a valid state', () => {
    const state = {
      origin: originDefaultState,
      licence: licenceDefaultState,
      destination: destinationDefaultState
    }

    const application = ApplicationModel.fromState(state)

    expect(application).toBeInstanceOf(ApplicationModel)

    expect(application.tasks.origin).toBeInstanceOf(OriginSection)
    expect(application.tasks.licence).toBeInstanceOf(LicenceSection)
    expect(application.tasks.destination).toBeInstanceOf(DestinationSection)
  })
})
