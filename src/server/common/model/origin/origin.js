import Joi from 'joi'
import { Model, validateAgainstSchema } from '../model.js'
import { OnOffFarm } from './on-off-farm.js'
import { CphNumber } from './cph-number.js'
import { Address } from './address.js'

const validationSchema = Joi.object().custom((value, helpers) => {
  const invalid = Object.values(value).some((item) => {
    return !item.validate().isValid
  })

  if (invalid) {
    return helpers.error('any.invalid')
  }
  return value
})

/**
 * export @typedef {{
 *  onOffFarm: OnOffFarmData | undefined;
 *  cphNumber: CphNumberData | undefined;
 *  address: AddressData | undefined;
 * }} OriginData
 *
 * export @typedef {{
 *  onOffFarm?: OnOffFarm;
 *  cphNumber: CphNumber;
 *  address?: Address;
 * }} OriginDataObjects
 *
 * @import {OnOffFarmData} from './on-off-farm.js'
 * @import {CphNumberData} from './cph-number.js'
 * @import {AddressData} from './address.js'
 * @import {RawPayload} from '../model.js'
 */

export class Origin extends Model {
  /**
   * @returns {RawPayload | undefined}
   */
  get value() {
    return this._data
  }

  /**
   *
   * @returns {RawPayload | undefined}
   */
  toState() {
    return this.value
  }

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
