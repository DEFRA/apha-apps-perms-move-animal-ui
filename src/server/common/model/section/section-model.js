/**
 *
 * @typedef {{text: string}} ValidationError
 * @typedef {{
 *   isValid: boolean,
 *   errors: {[key:string]: ValidationError}
 * }} ValidationResult
 */

/**
 * @param {Schema} schema
 * @param {object} value
 * @returns {ValidationResult}
 */
export const validateAgainstSchema = (schema, value) => {
  const { error } = schema.validate(value, {
    abortEarly: false,
    allowUnknown: true
  })

  if (error === undefined) {
    return { isValid: true, errors: {} }
  } else {
    const errors = error.details?.map((x) => [
      x.context?.label ?? '',
      { text: x.message }
    ])

    return {
      isValid: false,
      errors: Object.fromEntries(errors ?? [])
    }
  }
}

class NotImplementedError extends Error {
  constructor() {
    super('Not implemented')
  }
}

export class SectionModel {
  /** @type {SectionPayload | undefined} */
  _data

  constructor(data) {
    this._data = data
    Object.seal(this)
  }

  validate() {
    throw new NotImplementedError()
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */

  /**
   * @param {unknown} _data
   * @returns {unknown}
   */
  static fromState(_data) {
    throw new NotImplementedError()
  }

  /* eslint-enable @typescript-eslint/no-unused-vars */
}

/**
 * @typedef {{[key:string]: object | undefined}} SectionPayload
 */

/** @import { Schema } from 'joi' */
