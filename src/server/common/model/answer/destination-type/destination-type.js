import { RadioButtonAnswer } from '../radio-button/radio-button.js'
/** @import {RadioButtonConfigFactory, RadioOption} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'tb-restricted-farm' | 'slaughter' | 'dedicated-sale' | 'afu' | 'iso-unit' | 'other' | 'market-afu'} DestinationTypeData
 * @typedef {{ destinationType: DestinationTypeData }} DestinationTypePayload
 */

const marketOrAfuOption = {
  label: 'TB sales at orange markets and approved finishing units (AFU)',
  hint: 'Including enhanced with grazing (AFUE)'
}
const tbRestrictedOption = { label: 'TB restricted farm' }
const afuOption = {
  label: 'Approved finishing unit (AFU)',
  hint: 'Including enhanced with grazing (AFUE)'
}
const otherOption = { label: 'Another destination with TB restrictions' }
const dedicatedSaleOption = { label: 'Dedicated sale for TB (orange market)' }
const slaughterOption = { label: 'Slaughter' }

const isOnToTheFarm = (app) => app.origin?.onOffFarm === 'on'
const isOriginAfu = (app) => app.origin?.originType === 'afu'
const isOriginIsoUnit = (app) => app.origin?.originType === 'iso-unit'

/** @returns {Record<string, RadioOption>} */
const getDestinationOptions = (app) => {
  const originType = app.origin?.originType
  const isOriginTbRestricted = ['tb-restricted-farm', 'other'].includes(
    originType
  )

  if (isOnToTheFarm(app)) {
    if (isOriginAfu(app)) {
      return {
        afu: afuOption,
        other: otherOption
      }
    }
    return {
      'tb-restricted-farm': tbRestrictedOption,
      afu: afuOption,
      other: otherOption
    }
  }

  if (isOriginTbRestricted) {
    return {
      slaughter: slaughterOption,
      'market-afu': marketOrAfuOption,
      'tb-restricted-farm': tbRestrictedOption,
      'iso-unit': { label: 'TB isolation unit' },
      other: otherOption
    }
  }

  if (isOriginIsoUnit(app)) {
    return {
      slaughter: slaughterOption,
      afu: afuOption
    }
  }

  if (isOriginAfu(app)) {
    return {
      slaughter: slaughterOption,
      afu: afuOption,
      other: otherOption
    }
  }

  return {
    slaughter: slaughterOption,
    'dedicated-sale': dedicatedSaleOption,
    afu: afuOption,
    'tb-restricted-farm': tbRestrictedOption,
    'iso-unit': { label: 'TB isolation unit' },
    other: otherOption
  }
}

/** @augments {RadioButtonAnswer<DestinationTypePayload>} */
export class DestinationTypeAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfigFactory} */
  static config = (app) => ({
    payloadKey: 'destinationType',
    options: getDestinationOptions(app),
    validation: {
      empty: 'Select where the animals are going'
    }
  })

  /** @returns {boolean} */
  static isTbRestricted(type) {
    return ['tb-restricted-farm', 'other'].includes(type ?? '')
  }
}
