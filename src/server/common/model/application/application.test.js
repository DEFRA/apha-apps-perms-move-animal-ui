import { ApplicationModel } from './application.js'
import { LicenceSection } from '../section/licence/licence.js'
import { OriginSection } from '../section/origin/origin.js'
import { DestinationSection } from '../section/destination/destination.js'
import { BiosecuritySection } from '../section/biosecurity/biosecurity.js'
import { IdentificationSection } from '../section/identification/identification.js'

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

const licenceDefaultState = {
  emailAddress: 'name@example.com'
}

const destinationDefaultState = {
  destinationType: 'dedicated-sale'
}

const identificationDefaultState = {
  earTags: 'some-ear-tags'
}

const biosecurityDefaultState = {
  keptSeparately: 'yes',
  grazing: 'yes',
  lastGrazed: 'yesterday',
  manureAndSlurry: 'yes',
  grazingFieldHowSeparated: 'some details',
  roadsAndTracks: 'yes',
  buildingsAnyShared: 'yes',
  buildingsHowMinimiseContamination: 'somehow',
  peopleDisinfection: 'ppe',
  disinfectant: 'some disinfectant',
  dilutionRate: '15',
  badgers: ['some measures']
}

const applicationState = {
  origin: originDefaultState,
  licence: licenceDefaultState,
  destination: destinationDefaultState,
  identification: identificationDefaultState,
  biosecurity: biosecurityDefaultState
}

describe('Application.fromState', () => {
  it('should create an Application instance from a valid state', () => {
    const application = ApplicationModel.fromState(applicationState)

    expect(application).toBeInstanceOf(ApplicationModel)

    expect(application.tasks.origin).toBeInstanceOf(OriginSection)
    expect(application.tasks.licence).toBeInstanceOf(LicenceSection)
    expect(application.tasks.identification).toBeInstanceOf(
      IdentificationSection
    )
    expect(application.tasks.destination).toBeInstanceOf(DestinationSection)
    expect(application.tasks.biosecurity).toBeInstanceOf(BiosecuritySection)

    expect(application.tasks.origin.questionPageAnswers).toEqual(
      OriginSection.fromState(applicationState).questionPageAnswers
    )
    expect(application.tasks.licence.questionPageAnswers).toEqual(
      LicenceSection.fromState(applicationState).questionPageAnswers
    )
    expect(application.tasks.identification.questionPageAnswers).toEqual(
      IdentificationSection.fromState(applicationState).questionPageAnswers
    )
    expect(application.tasks.destination.questionPageAnswers).toEqual(
      DestinationSection.fromState(applicationState).questionPageAnswers
    )
    expect(application.tasks.biosecurity.questionPageAnswers).toEqual(
      BiosecuritySection.fromState(applicationState).questionPageAnswers
    )
  })
})
