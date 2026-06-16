/** @import { TbApplicationModel } from './application.js' */
/** @import { SectionModelV1 } from '../common/model/section/section-model/section-model-v1.js' */

// Constants
const MOVEMENT_ON = 'on'
const MOVEMENT_OFF = 'off'
const ORIGIN_TYPE_TB_RESTRICTED_FARM = 'tb-restricted-farm'
const ORIGIN_TYPE_AFU = 'afu'
const DESTINATION_TYPE_SLAUGHTER = 'slaughter'

const TB_RESTRICTED_TYPES = new Set([ORIGIN_TYPE_TB_RESTRICTED_FARM, 'other'])

const UNRESTRICTED_ORIGIN_TYPES = new Set(['market', 'unrestricted-farm'])

const SALE_DESTINATION_TYPES = new Set([
  'dedicated-sale',
  ORIGIN_TYPE_AFU,
  'afu-or-market'
])

/**
 * @param {Record<string, any>} keyFacts
 * @param {SectionModelV1} section
 * @param {string} keyFactFieldName
 * @param {string} sourceFieldName
 * @returns {void}
 */
function addOptionalField(
  keyFacts,
  section,
  keyFactFieldName,
  sourceFieldName
) {
  const value = section.getSectionAnswer(sourceFieldName)?.data?.value
  if (value) {
    keyFacts[keyFactFieldName] = value
  } else {
    delete keyFacts[keyFactFieldName]
  }
}

/**
 * @param {Record<string, any>} keyFacts
 * @param {SectionModelV1} origin
 * @param {SectionModelV1} licence
 */
function addOptionalKeeperNames(keyFacts, origin, licence) {
  const onOffFarm = origin.getSectionAnswer('onOffFarm')?.data?.value
  const originType = origin.getSectionAnswer('originType')?.data?.value
  const isOnFarm = onOffFarm === MOVEMENT_ON
  const isOffFarm = onOffFarm === MOVEMENT_OFF
  const isOriginRestricted = isTbRestricted(originType)
  const fullName = licence.getSectionAnswer('fullName')?.data?.value
  const yourName = licence.getSectionAnswer('yourName')?.data?.value

  // Origin keeper name: set for OFF farm OR (ON farm AND origin restricted)
  if (fullName && (isOffFarm || (isOnFarm && isOriginRestricted))) {
    keyFacts.originKeeperName = fullName
  }

  // Destination keeper name: only for ON farm movements
  if (isOnFarm) {
    const nameToUse = isOriginRestricted ? yourName : fullName
    if (nameToUse) {
      keyFacts.destinationKeeperName = nameToUse
    }
  }
}

/**
 * @param {Record<string, any>} keyFacts
 * @param {SectionModelV1} origin
 */
function addRequesterCph(keyFacts, origin) {
  const isOnFarm =
    origin.getSectionAnswer('onOffFarm')?.data?.value === MOVEMENT_ON

  if (isOnFarm && keyFacts.destinationCph) {
    keyFacts.requesterCph = keyFacts.destinationCph
  }

  if (!isOnFarm && keyFacts.originCph) {
    keyFacts.requesterCph = keyFacts.originCph
  }
}

/**
 * @param {Record<string, any>} keyFacts
 * @param {SectionModelV1} biosecurityMap
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
 * @param {SectionModelV1} origin
 */
function determineRequester(origin) {
  const onOffFarm = origin.getSectionAnswer('onOffFarm')?.data?.value
  return onOffFarm === MOVEMENT_ON ? 'destination' : 'origin'
}

/**
 * @param {SectionModelV1} biosecurityMap
 */
function extractBiosecurityMaps(biosecurityMap) {
  const maps = []

  const uploadPlan = biosecurityMap.getSectionAnswer('upload-plan')?.data?.value
  const path = uploadPlan?.path
  const skipped = uploadPlan?.skipped

  if (path && !skipped) {
    maps.push(path)
  }

  return maps
}

/**
 * @param {SectionModelV1} origin
 * @param {SectionModelV1} destination
 */
function buildBasicKeyFacts(origin, destination) {
  const originType = origin.getSectionAnswer('originType')?.data?.value
  const destinationType =
    destination.getSectionAnswer('destinationType')?.data?.value

  const animalCount =
    destination.getSectionAnswer('howManyAnimals')?.data?.value ??
    destination.getSectionAnswer('howManyAnimalsMaximum')?.data?.value ??
    null

  return {
    licenceType: determineLicenceType(originType, destinationType),
    requester: determineRequester(origin),
    movementDirection: origin.getSectionAnswer('onOffFarm')?.data?.value,
    additionalInformation:
      destination.getSectionAnswer('additionalInfo')?.data?.value ?? '',
    ...(animalCount && {
      numberOfCattle: Number.parseInt(animalCount, 10)
    })
  }
}

/**
 * Generates TB key facts from the raw application state.
 * @param {TbApplicationModel} application
 */
export function tbKeyFacts(application) {
  const origin = /** @type {SectionModelV1} */ (
    application.getSection('origin')
  )
  const destination = /** @type {SectionModelV1} */ (
    application.getSection('destination')
  )
  const licence = /** @type {SectionModelV1} */ (
    application.getSection('licence')
  )
  const biosecurityMap = /** @type {SectionModelV1} */ (
    application.getSection('biosecurity-map')
  )

  if (!origin || !destination || !licence) {
    throw new Error('Missing required section(s) for key facts generation')
  }
  const keyFacts = buildBasicKeyFacts(origin, destination)

  addOptionalField(keyFacts, origin, 'originCph', 'cphNumber')
  addOptionalField(keyFacts, origin, 'originAddress', 'address')
  addOptionalField(
    keyFacts,
    destination,
    'destinationCph',
    'destinationFarmCph'
  )
  addOptionalField(
    keyFacts,
    destination,
    'destinationAddress',
    'destinationFarmAddress'
  )

  addOptionalKeeperNames(keyFacts, origin, licence)
  addRequesterCph(keyFacts, origin)

  if (biosecurityMap) {
    addBiosecurityMaps(keyFacts, biosecurityMap)
  }

  return keyFacts
}
