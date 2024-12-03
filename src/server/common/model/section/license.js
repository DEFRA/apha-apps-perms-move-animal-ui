import Joi from 'joi'
import { SectionModel } from './section-model.js'
import { validateAgainstSchema } from '../../helpers/validation/validation.js'
import { EmailAddress } from '../answer/email-address.js'

const validationSchema = Joi.object()
  .custom((license, helpers) => {
    const invalid = Object.values(license).some((item) => {
      return !item.validate().isValid
    })

    if (invalid) {
      return helpers.error('any.invalid')
    }
    return license
  })
  .label('license')
/**
 * export @typedef {{
 * emailAddress: EmailAddressData | undefined;
 * }} LicenseData
 * @import {EmailAddressData} from '../answer/email-address.js'
 */

export class License extends SectionModel {
  validate() {
    return validateAgainstSchema(validationSchema, this._data)
  }

  /**
   * @param {LicenseData | undefined} state
   * @returns {License}
   */
  static fromState(state) {
    return new License({
      emailAddress: EmailAddress.fromState(state?.emailAddress)
    })
  }
}
