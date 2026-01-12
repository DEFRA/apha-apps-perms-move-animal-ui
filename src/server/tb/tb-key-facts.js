/** @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js' */

// Constants
const MOVEMENT_ON = 'on'
const ORIGIN_TYPE_TB_RESTRICTED_FARM = 'tb-restricted-farm'
const ORIGIN_TYPE_AFU = 'afu'
const DESTINATION_TYPE_SLAUGHTER = 'slaughter'

const TB_RESTRICTED_TYPES = new Set([
  ORIGIN_TYPE_TB_RESTRICTED_FARM,
  'zoo',
  'lab',
  'other'
])

const UNRESTRICTED_ORIGIN_TYPES = new Set([
  'market',
  'unrestricted-farm',
  'after-import-location'
])

const SALE_DESTINATION_TYPES = new Set([
  'dedicated-sale',
  ORIGIN_TYPE_AFU,
  'market-afu'
])

/**
 * @param {Record<string, any>} keyFacts
 * @param {Record<string, any>} origin
 * @param {Record<string, any>} destination
 */
function addOptionalCphNumbers(keyFacts, origin, destination) {
  if (origin.cphNumber) {
    keyFacts.originCph = origin.cphNumber
  }
  if (destination.destinationFarmCph) {
    keyFacts.destinationCph = destination.destinationFarmCph
  }
}

/**
 * @param {Record<string, any>} keyFacts
 * @param {Record<string, any>} origin
 * @param {Record<string, any>} destination
 */
function addOptionalAddresses(keyFacts, origin, destination) {
  if (origin.address) {
    keyFacts.originAddress = origin.address
  }
  if (destination.destinationFarmAddress) {
    keyFacts.destinationAddress = destination.destinationFarmAddress
  }
}

/**
 * @param {Record<string, any>} keyFacts
 * @param {Record<string, any>} origin
 * @param {Record<string, any>} licence
 */
function addOptionalKeeperNames(keyFacts, origin, licence) {
  const { onOffFarm, originType } = origin
  const isOnFarm = onOffFarm === MOVEMENT_ON
  const isOffFarm = onOffFarm === 'off'
  const isOriginRestricted = isTbRestricted(originType)

  // Origin keeper name: set for OFF farm OR (ON farm AND origin restricted)
  if (licence.fullName && (isOffFarm || (isOnFarm && isOriginRestricted))) {
    keyFacts.originKeeperName = licence.fullName
  }

  // Destination keeper name: only for ON farm movements
  if (isOnFarm) {
    const nameToUse =
      isOriginRestricted && licence.yourName
        ? licence.yourName
        : licence.fullName
    if (nameToUse) {
      keyFacts.destinationKeeperName = nameToUse
    }
  }
}

/**
 * @param {Record<string, any>} keyFacts
 * @param {Record<string, any>} origin
 */
function addRequesterCph(keyFacts, origin) {
  const isOnFarm = origin.onOffFarm === MOVEMENT_ON

  if (isOnFarm && keyFacts.destinationCph) {
    keyFacts.requesterCph = keyFacts.destinationCph
  }

  if (!isOnFarm && keyFacts.originCph) {
    keyFacts.requesterCph = keyFacts.originCph
  }
}

/**
 * @param {Record<string, any>} keyFacts
 * @param {Record<string, any>} biosecurityMap
 */
function addBiosecurityMaps(keyFacts, biosecurityMap) {
  const biosecurityMaps = extractBiosecurityMaps(biosecurityMap)
  if (biosecurityMaps.length > 0) {
    keyFacts.biosecurityMaps = biosecurityMaps
  }
}

/**
 * @param {string} type
 * @returns {boolean}
 */
function isTbRestricted(type) {
  return TB_RESTRICTED_TYPES.has(type)
}

/**
 * @param {string} originType
 * @returns {boolean}
 */
function isOriginUnrestricted(originType) {
  return UNRESTRICTED_ORIGIN_TYPES.has(originType)
}

/**
 * @param {string} destinationType
 * @returns {boolean}
 */
function isDestinationSale(destinationType) {
  return SALE_DESTINATION_TYPES.has(destinationType)
}

/**
 * @param {string} originType
 * @param {string} destinationType
 * @returns {boolean}
 */
function isAfuToSpecialDestination(originType, destinationType) {
  return (
    originType === ORIGIN_TYPE_AFU &&
    (destinationType === DESTINATION_TYPE_SLAUGHTER ||
      isDestinationSale(destinationType))
  )
}

/**
 * @param {string} originType
 * @param {string} destinationType
 */
function determineLicenceType(originType, destinationType) {
  const isOriginRestricted = isTbRestricted(originType)
  const isDestinationRestricted = isTbRestricted(destinationType)

  if (isOriginUnrestricted(originType) && isDestinationRestricted) {
    return 'TB15'
  }

  if (isOriginRestricted && isDestinationRestricted) {
    return 'TB16'
  }

  if (
    (isOriginRestricted && isDestinationSale(destinationType)) ||
    isAfuToSpecialDestination(originType, destinationType)
  ) {
    return 'TB16e'
  }

  if (isOriginRestricted && destinationType === DESTINATION_TYPE_SLAUGHTER) {
    return 'TB24c'
  }

  return ''
}

/**
 * Determines the requester based on movement direction.
 * @param {Record<string, any>} origin
 */
function determineRequester(origin) {
  const { onOffFarm } = origin
  return onOffFarm === MOVEMENT_ON ? 'destination' : 'origin'
}

/**
 * @param {Record<string, any>} biosecurityMapSection
 */
function extractBiosecurityMaps(biosecurityMapSection) {
  const maps = []

  const uploadPlan = biosecurityMapSection?.['upload-plan']
  const s3Key = uploadPlan?.status?.form?.file?.s3Key
  const uploadStatus = uploadPlan?.status?.uploadStatus

  if (s3Key && uploadStatus !== 'skipped') {
    maps.push(s3Key)
  }

  return maps
}

/**
 * @param {Record<string, any>} origin
 * @param {Record<string, any>} destination
 * @param {string} originType
 * @param {string} destinationType
 */
function buildBasicKeyFacts(origin, destination, originType, destinationType) {
  const animalCount =
    destination.howManyAnimals ?? destination.howManyAnimalsMaximum

  return {
    licenceType: determineLicenceType(originType, destinationType),
    requester: determineRequester(origin),
    movementDirection: origin.onOffFarm,
    additionalInformation: destination.additionalInfo ?? '',
    ...(animalCount && {
      numberOfCattle: Number.parseInt(animalCount, 10)
    })
  }
}

/**
 * Generates TB key facts from the raw application state.
 * @param {RawApplicationState} state
 */
export function tbKeyFacts(state) {
  const origin = state.origin ?? {}
  const destination = state.destination ?? {}
  const licence = state.licence ?? {}
  const biosecurityMap = state['biosecurity-map'] ?? {}

  const originType = origin.originType ?? ''
  const destinationType = destination.destinationType ?? ''

  const keyFacts = buildBasicKeyFacts(
    origin,
    destination,
    originType,
    destinationType
  )
  addOptionalCphNumbers(keyFacts, origin, destination)
  addOptionalAddresses(keyFacts, origin, destination)
  addOptionalKeeperNames(keyFacts, origin, licence)
  addRequesterCph(keyFacts, origin)
  addBiosecurityMaps(keyFacts, biosecurityMap)

  return keyFacts
}
