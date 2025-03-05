/** @import { OnOffFarmData } from '~/src/server/common/model/answer/on-off-farm/on-off-farm.js' */
/** @import { DestinationTypeData } from '~/src/server/common/model/answer/destination-type/destination-type.js' */
/** @import { ReasonForMovementData } from '~/src/server/common/model/answer/reason-for-movement/reason-for-movement.js' */
/** @import { QuantityOptionsData } from '~/src/server/common/model/answer/quantity-options/quantity-options.js' */
/** @import { QuantityHalfHerdData } from '~/src/server/common/model/answer/quantity-half-herd/quantity-half-herd.js' */

const validCphNumber = '12/345/6789'
const validOriginType = 'afu'
/** @type {OnOffFarmData} */
const validOnOffFarm = 'off'
const validAddress = {
  addressLine1: 'Starfleet Headquarters',
  addressTown: 'San Francisco',
  addressPostcode: 'RG24 8RR'
}

export const validOriginSectionState = {
  onOffFarm: validOnOffFarm,
  originType: validOriginType,
  cphNumber: validCphNumber,
  address: validAddress
}

/** @type {DestinationTypeData} */
const testDestinationType = 'slaughter'

export const validDestinationSectionState = {
  destinationType: testDestinationType,
  destinationFarmCph: validCphNumber,
  destinationFarmAddress: validAddress,
  maxNumberOfAnimals: '1',
  /** @type {ReasonForMovementData} */
  reasonForMovement: 'routineRestocking',
  /** @type {QuantityOptionsData} */
  movingMoreThan75Animals: 'no',
  /** @type {QuantityHalfHerdData} */
  movingMoreThanHalfExistingHerd: 'yes'
}

export const validIdentificationSectionState = {
  earTags: 'some-ear-tags'
}

export const validBiosecuritySectionState = {
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
  badgers: 'some text'
}

export const validBiosecurityMapSectionState = {
  'upload-plan': {
    metadata: {
      uploadId: '41572cf8-2e37-495e-9ad2-0b0f23f1b277',
      uploadUrl:
        'http://localhost:7337/upload-and-scan/41572cf8-2e37-495e-9ad2-0b0f23f1b277',
      statusUrl:
        'http://localhost:7337/status/41572cf8-2e37-495e-9ad2-0b0f23f1b277'
    },
    status: {
      uploadStatus: 'ready',
      metadata: {},
      form: {
        crumb: 'QVJdAVFWpx90BqITFf6tFf7CpwJFNn2jGN-8CyKwlO9',
        nextPage: '',
        file: {
          fileId: '3d3c2a09-2888-4199-9bd6-ac7eda3125f0',
          filename: '34998B77-FB3E-44DB-BC0E-05154D6549E0.jpeg',
          contentType: 'image/jpeg',
          fileStatus: 'complete',
          contentLength: 374478,
          checksumSha256: '3etoXNlR16WpgCiwylqccFxLVg3OrZvpGUqmigmrhcU=',
          detectedContentType: 'image/jpeg',
          s3Key:
            'biosecurity-map/41572cf8-2e37-495e-9ad2-0b0f23f1b277/3d3c2a09-2888-4199-9bd6-ac7eda3125f0',
          s3Bucket: 'apha'
        }
      },
      numberOfRejectedFiles: 0
    }
  }
}

export const validLicenceSectionState = {
  fullName: {
    firstName: 'Kathryn',
    lastName: 'Janeway'
  },
  receiveMethod: 'email',
  emailAddress: 'kathryn@starfleet.com'
}

export const validApplicationStateWithBioSecurity = {
  origin: {
    ...validOriginSectionState,
    onOffFarm: 'on',
    originType: 'market'
  },
  destination: {
    ...validDestinationSectionState,
    destinationType: 'tb-restricted-farm'
  },
  identification: validIdentificationSectionState,
  licence: validLicenceSectionState,
  biosecurity: validBiosecuritySectionState,
  'biosecurity-map': validBiosecurityMapSectionState
}
