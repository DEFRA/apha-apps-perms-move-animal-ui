/** @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js' */

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

  const requester = determineRequester(origin)

  const keyFacts = {}

  keyFacts.licenceType = determineLicenceType(originType, destinationType)
  keyFacts.requester = requester
  keyFacts.movementDirection = origin.onOffFarm
  keyFacts.additionalInformation = destination.additionalInfo ?? ''

  if (destination.howManyAnimals) {
    keyFacts.numberOfCattle = parseInt(destination.howManyAnimals, 10)
  }

  if (origin.cphNumber) {
    keyFacts.originCph = origin.cphNumber
  }

  if (destination.destinationFarmCph) {
    keyFacts.destinationCph = destination.destinationFarmCph
  }

  if (origin.address) {
    keyFacts.originAddress = origin.address
  }

  if (destination.destinationFarmAddress) {
    keyFacts.destinationAddress = destination.destinationFarmAddress
  }

  if (licence.fullName) {
    keyFacts.originKeeperName = licence.fullName
  }

  if (licence.yourName && isDestinationKeeperName(origin)) {
    keyFacts.destinationKeeperName = licence.yourName
  }

  const isOnFarm = origin.onOffFarm === 'on'
  if (isOnFarm && keyFacts.destinationCph) {
    keyFacts.requesterCph = keyFacts.destinationCph
  } else if (!isOnFarm && keyFacts.originCph) {
    keyFacts.requesterCph = keyFacts.originCph
  }

  const biosecurityMaps = extractBiosecurityMaps(biosecurityMap)
  if (biosecurityMaps.length > 0) {
    keyFacts.biosecurityMaps = biosecurityMaps
  }

  return keyFacts
}

/**
 * @param {string} originType - The origin type
 * @param {string} destinationType - The destination type
 */
function determineLicenceType(originType, destinationType) {
  const isTbRestricted = (type) =>
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

  return (
    (onOffFarm === 'on' &&
      (originType === 'tb-restricted-farm' ||
        originType === 'afu' ||
        originType === 'iso-unit')) ||
    (onOffFarm === 'off' && (originType === 'afu' || originType === 'iso-unit'))
  )
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
