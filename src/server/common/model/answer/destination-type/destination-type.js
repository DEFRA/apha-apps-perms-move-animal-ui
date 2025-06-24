import { RadioButtonAnswer } from '../radio-button/radio-button.js'
/** @import {RadioButtonConfigFactory, RadioOption} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'tb-restricted-farm' | 'slaughter' | 'dedicated-sale' | 'afu' | 'zoo' | 'lab' | 'iso-unit' | 'other'} DestinationTypeData
 * @typedef {{ destinationType: DestinationTypeData }} DestinationTypePayload
 */

const isOnToTheFarm = (app) => app.origin?.onOffFarm === 'on'

const tbRestrictedOption = { label: 'TB restricted farm' }
const afuOption = {
  label: 'Approved finishing unit (AFU)',
  hint: 'Including enhanced with grazing (AFUE)'
}
const otherOption = { label: 'Another destination with TB restrictions' }
const dedicatedSaleOption = { label: 'Dedicated sale for TB (orange market)' }
const slaughterOption = { label: 'Slaughter' }

const isTbRestricted = (app) => {
  const originType = app.origin?.originType
  return ['tb-restricted-farm', 'other'].includes(originType)
}

/** @returns {Record<string, RadioOption>} */
const getDestinationOptions = (app) => {
  const isOntoFarm = isOnToTheFarm(app)
  const isOffFarm = !isOntoFarm

  const isOriginTbResticted = isTbRestricted(app)

  if (isOntoFarm && app.origin?.originType !== 'afu') {
    return {
      'tb-restricted-farm': tbRestrictedOption,
      afu: afuOption,
      other: otherOption
    }
  }

  if (isOntoFarm && app.origin?.originType === 'afu') {
    return {
      afu: afuOption,
      other: otherOption
    }
  }

  if (isOffFarm && isOriginTbResticted) {
    return {
      slaughter: slaughterOption,
      'dedicated-sale': dedicatedSaleOption,
      afu: afuOption,
      'tb-restricted-farm': tbRestrictedOption,
      'iso-unit': { label: 'TB isolation unit' },
      other: otherOption
    }
  }

  if (isOffFarm && app.origin?.originType === 'iso-unit') {
    return {
      slaughter: slaughterOption,
      afu: afuOption
    }
  }

  if (isOffFarm && app.origin?.originType === 'afu') {
    return {
      slaughter: slaughterOption,
      afu: afuOption,
      other: otherOption
    }
  }

  return {}
}

/** @augments {RadioButtonAnswer<DestinationTypePayload>} */
export class DestinationTypeAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfigFactory} */
  static config = (app) => ({
    payloadKey: 'destinationType',
    options: getDestinationOptions(app),
    errors: {
      emptyOptionText: 'Select where the animals are going'
    }
  })

  /** @returns {boolean} */
  static isTbRestricted(type) {
    return ['tb-restricted-farm', 'other'].includes(type ?? '')
  }
}
