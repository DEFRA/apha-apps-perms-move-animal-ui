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
