import { ApplicationModel } from './application.js'
import { LicenceSection } from '../section/licence/licence.js'
import { OriginSection } from '../section/origin/origin.js'
import { DestinationSection } from '../section/destination/destination.js'
import { BiosecuritySection } from '../section/biosecurity/biosecurity.js'

/**
 * @import { Request } from '@hapi/hapi'
 */

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

const biosecurityDefaultState = {
  keptSeparately: 'yes'
}

describe('Application', () => {
  it('should create an Application instance from a valid state', () => {
    const state = {
      origin: originDefaultState,
      licence: licenceDefaultState,
      destination: destinationDefaultState,
      biosecurity: biosecurityDefaultState
    }

    const request = /** @type {Request} */ {
      ...jest.requireActual('@hapi/hapi'),
      yar: {
        get: jest.fn().mockImplementation((key) => state[key])
      }
    }

    const application = ApplicationModel.fromState(request)

    expect(application).toBeInstanceOf(ApplicationModel)

    expect(application.tasks.origin).toBeInstanceOf(OriginSection)
    expect(application.tasks.licence).toBeInstanceOf(LicenceSection)
    expect(application.tasks.destination).toBeInstanceOf(DestinationSection)
    expect(application.tasks.biosecurity).toBeInstanceOf(BiosecuritySection)
  })
})
