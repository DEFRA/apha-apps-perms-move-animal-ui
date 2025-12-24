/** @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js' */

// Constants
const MOVEMENT_ON = 'on'

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
 * @param {string} originType
 * @param {string} destinationType
 */
function determineLicenceType(originType, destinationType) {
  const isTbRestricted = (/** @type {string} */ type) =>
    ['tb-restricted-farm', 'zoo', 'lab', 'other'].includes(type)

  const isOriginRestricted = isTbRestricted(originType)
  const isOriginUnrestricted = [
    'market',
    'unrestricted-farm',
    'after-import-location'
  ].includes(originType)
  const isDestinationRestricted = isTbRestricted(destinationType)

  if (isOriginUnrestricted && isDestinationRestricted) {
    return 'TB15'
  }

  if (isOriginRestricted && isDestinationRestricted) {
    return 'TB16'
  }

  const saleDestinationTypes = ['dedicated-sale', 'afu', 'market-afu']
  const isDestinationSale = saleDestinationTypes.includes(destinationType)
  const isAfuToSpecialDestination =
    originType === 'afu' &&
    ['slaughter', ...saleDestinationTypes].includes(destinationType)

  if ((isOriginRestricted && isDestinationSale) || isAfuToSpecialDestination) {
    return 'TB16e'
  }

  if (isOriginRestricted && destinationType === 'slaughter') {
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
    onOffFarm === 'on' &&
    (originType === 'tb-restricted-farm' ||
      originType === 'afu' ||
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

  const specialOriginTypes = ['afu', 'iso-unit']
  const isSpecialOrigin = specialOriginTypes.includes(originType)
  const isTbRestrictedFarm = originType === 'tb-restricted-farm'

  const isOnFarmFromSpecialOrRestricted =
    onOffFarm === 'on' && (isTbRestrictedFarm || isSpecialOrigin)
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
      numberOfCattle: parseInt(destination.howManyAnimals, 10)
    })
  }
}
