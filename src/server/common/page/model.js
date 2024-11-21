/**
 * @template Payload
 * @template Data
 * @typedef {{
 *   clean: (payload: Payload) => Data,
 *   validate: (data: Data) => ValidationResult
 * }} Model<Payload, Data>
 */

/** @import {ValidationResult} from './validation.js' */
