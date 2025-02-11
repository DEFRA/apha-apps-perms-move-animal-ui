import { ApplicationModel } from './application.js'
import { LicenceSection } from '../section/licence/licence.js'
import { OriginSection } from '../section/origin/origin.js'
import { DestinationSection } from '../section/destination/destination.js'
import { BiosecuritySection } from '../section/biosecurity/biosecurity.js'

/**
 * @import { Request } from '@hapi/hapi'
 * @import { OriginData } from '../section/origin/origin.js'
 * @import { LicenceData } from '../section/licence/licence.js'
 * @import { DestinationData } from '../section/destination/destination.js'
 * @import { BiosecurityData } from '../section/biosecurity/biosecurity.js'
 */

/** @type {OriginData} */
const originDefaultState = {
  onOffFarm: 'on',
  cphNumber: '12/123/1234',
  address: {
    addressLine1: 'Starfleet Headquarters',
    addressLine2: '24-593 Federation Drive',
    addressTown: 'San Francisco',
    addressCounty: 'San Francisco',
    addressPostcode: 'RG24 8RR'
  }
}

/** @type {LicenceData} */
const licenceDefaultState = {
  emailAddress: 'name@example.com'
}

/** @type {DestinationData} */
const destinationDefaultState = {
  destinationType: 'dedicated-sale'
}

/** @type {BiosecurityData} */
const biosecurityDefaultState = {
  keptSeparately: 'yes',
  grazing: 'yes',
  lastGrazed: 'yesterday',
  manureAndSlurry: 'yes',
  grazingFieldHowSeparated: 'some details'
}

describe('Application.fromRequest', () => {
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

    const application = ApplicationModel.fromRequest(request)

    expect(application).toBeInstanceOf(ApplicationModel)

    expect(application.tasks.origin).toBeInstanceOf(OriginSection)
    expect(application.tasks.licence).toBeInstanceOf(LicenceSection)
    expect(application.tasks.destination).toBeInstanceOf(DestinationSection)
    expect(application.tasks.biosecurity).toBeInstanceOf(BiosecuritySection)

    expect(application.tasks.origin.questionPageAnswers).toEqual(
      OriginSection.fromState(originDefaultState).questionPageAnswers
    )
    expect(application.tasks.licence.questionPageAnswers).toEqual(
      LicenceSection.fromState(licenceDefaultState).questionPageAnswers
    )
    expect(application.tasks.destination.questionPageAnswers).toEqual(
      DestinationSection.fromState(destinationDefaultState).questionPageAnswers
    )
    expect(application.tasks.biosecurity.questionPageAnswers).toEqual(
      BiosecuritySection.fromState(biosecurityDefaultState).questionPageAnswers
    )
  })
})
