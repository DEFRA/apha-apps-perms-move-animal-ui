import { RadioButtonAnswer } from '../radio-button/radio-button.js'
/** @import {RadioButtonConfigFactory, RadioOption} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'tb-restricted-farm' | 'slaughter' | 'dedicated-sale' | 'afu' | 'iso-unit' | 'other' | 'afu-or-market'} DestinationTypeData
 * @typedef {{ destinationType: DestinationTypeData }} DestinationTypePayload
 */

const afuOption = {
  label: 'Approved finishing unit (AFU)',
  hint: 'Including enhanced with grazing (AFUE)',
  labelI18nKey: 'tb.destination.destinationType.options.afu.label',
  hintI18nKey: 'tb.destination.destinationType.options.afu.hint'
}
const AfuOrMarketOption = {
  label: 'Approved finishing units and TB sales at orange markets',
  hint: 'The licence covers either or both destinations',
  labelI18nKey: 'tb.destination.destinationType.options.afu-or-market.label',
  hintI18nKey: 'tb.destination.destinationType.options.afu-or-market.hint'
}

const tbRestrictedOption = {
  label: 'TB restricted farm',
  labelI18nKey:
    'tb.destination.destinationType.options.tb-restricted-farm.label'
}
const otherOption = {
  label: 'Another destination with TB restrictions',
  labelI18nKey: 'tb.destination.destinationType.options.other.label'
}
const dedicatedSaleOption = {
  label: 'Dedicated sale for TB (orange market)',
  labelI18nKey: 'tb.destination.destinationType.options.dedicated-sale.label'
}
const slaughterOption = {
  label: 'Slaughter',
  labelI18nKey: 'tb.destination.destinationType.options.slaughter.label'
}
const isoUnitOption = {
  label: 'TB isolation unit',
  labelI18nKey: 'tb.destination.destinationType.options.iso-unit.label'
}

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
        'afu-or-market': AfuOrMarketOption,
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
      'afu-or-market': AfuOrMarketOption,
      'tb-restricted-farm': tbRestrictedOption,
      'iso-unit': isoUnitOption,
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
      'afu-or-market': AfuOrMarketOption,
      other: otherOption
    }
  }

  return {
    slaughter: slaughterOption,
    'dedicated-sale': dedicatedSaleOption,
    'afu-or-market': AfuOrMarketOption,
    'tb-restricted-farm': tbRestrictedOption,
    'iso-unit': isoUnitOption,
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
