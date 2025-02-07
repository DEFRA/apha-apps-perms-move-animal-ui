import { DestinationSection } from '../section/destination/destination.js'
import { LicenceSection } from '../section/licence/licence.js'
import { OriginSection } from '../section/origin/origin.js'
import { BiosecuritySection } from '../section/biosecurity/biosecurity.js'
import { validateApplication } from './validation.js'
import mapValues from 'lodash/mapValues.js'

/** @import { Request } from '@hapi/hapi' */
/** @import {SectionContext, SectionModel} from '../section/section-model/section-model.js' */

/** @typedef {Record<string, SectionModel>} ApplicationData */
/** @typedef {Record<string, SectionContext>} ApplicationContext */

// This is a list of all the sections that are implemented in the application.
// The order in this array drives the order in which the sections are displayed.
const implementedSections = [
  OriginSection,
  DestinationSection,
  LicenceSection,
  BiosecuritySection
]

export class ApplicationModel {
  /** @type {ApplicationData} */
  _data

  /** @param {ApplicationData} data */
  constructor(data) {
    this._data = data
    Object.seal(this)
  }

  validate() {
    return validateApplication(this._data)
  }

  /** @returns {ApplicationContext} */
  get context() {
    return mapValues(
      this._data,
      (/** @type {SectionModel} */ section) => section.context
    )
  }

  /**
   * Getter for tasks.
   * @returns {Array | object} The data associated with each and every task in the application
   */
  get tasks() {
    return this._data
  }

  static get visibleSections() {
    return implementedSections.filter((section) => {
      return section.config.isVisible
    })
  }

  /**
   * @param {Request} req
   * @returns {ApplicationModel}
   */
  static fromState(req) {
    return new ApplicationModel(
      Object.fromEntries(
        this.visibleSections.map((section) => [
          section.config.key,
          section.fromState(req.yar.get(section.config.key))
        ])
      )
    )
  }
}
