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
  if (licence.fullName) {
    keyFacts.originKeeperName = licence.fullName
  }
  if (licence.yourName && isDestinationKeeperName(origin)) {
    keyFacts.destinationKeeperName = licence.yourName
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
 * @param {Record<string, any>} origin
 */
function determineRequester(origin) {
  const onOffFarm = origin.onOffFarm
  const originType = origin.originType

  if (onOffFarm === 'off') {
    return 'origin'
  }

  if (
    onOffFarm === MOVEMENT_ON &&
    (originType === ORIGIN_TYPE_TB_RESTRICTED_FARM ||
      originType === ORIGIN_TYPE_AFU ||
      originType === 'iso-unit')
  ) {
    return 'destination'
  }

  return 'origin'
}

/**
 * @param {Record<string, any>} origin
 */
function isDestinationKeeperName(origin) {
  const onOffFarm = origin.onOffFarm
  const originType = origin.originType

  const specialOriginTypes = [ORIGIN_TYPE_AFU, 'iso-unit']
  const isSpecialOrigin = specialOriginTypes.includes(originType)
  const isTbRestrictedFarm = originType === ORIGIN_TYPE_TB_RESTRICTED_FARM

  const isOnFarmFromSpecialOrRestricted =
    onOffFarm === MOVEMENT_ON && (isTbRestrictedFarm || isSpecialOrigin)
  const isOffFarmFromSpecial = onOffFarm === 'off' && isSpecialOrigin

  return isOnFarmFromSpecialOrRestricted || isOffFarmFromSpecial
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
 * @param {RawApplicationState} state
 */
export function transformToKeyFacts(state) {
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

/**
 * @param {Record<string, any>} origin
 * @param {Record<string, any>} destination
 * @param {string} originType
 * @param {string} destinationType
 */
function buildBasicKeyFacts(origin, destination, originType, destinationType) {
  return {
    licenceType: determineLicenceType(originType, destinationType),
    requester: determineRequester(origin),
    movementDirection: origin.onOffFarm,
    additionalInformation: destination.additionalInfo ?? '',
    ...(destination.howManyAnimals && {
      numberOfCattle: Number.parseInt(destination.howManyAnimals, 10)
    })
  }
}
