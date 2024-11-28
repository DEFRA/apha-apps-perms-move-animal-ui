import Joi from 'joi'
import {
  SectionModel,
  validateAgainstSchema
} from '../section/section-model.js'
import { OnOffFarm } from '../answer/on-off-farm.js'
import { CphNumber } from '../answer/cph-number.js'
import { Address } from '../answer/address.js'

const validationSchema = Joi.object()
  .custom((origin, helpers) => {
    const invalid = Object.values(origin).some((item) => {
      return !item.validate().isValid
    })

    if (invalid) {
      return helpers.error('any.invalid')
    }
    return origin
  })
  .label('origin')

/**
 * export @typedef {{
 *  onOffFarm: OnOffFarmData | undefined;
 *  cphNumber: CphNumberData | undefined;
 *  address: AddressData | undefined;
 * }} OriginData
 *
 * @import {OnOffFarmData} from '../answer/on-off-farm.js'
 * @import {CphNumberData} from '../answer/cph-number.js'
 * @import {AddressData} from '../answer/address.js'
 */

export class Origin extends SectionModel {
  validate() {
    return validateAgainstSchema(validationSchema, this._data)
  }

  /**
   * @param {OriginData | undefined} state
   * @returns {Origin}
   */
  static fromState(state) {
    return new Origin({
      onOffFarm: OnOffFarm.fromState(state?.onOffFarm),
      cphNumber: CphNumber.fromState(state?.cphNumber),
      address: Address.fromState(state?.address)
    })
  }
}
