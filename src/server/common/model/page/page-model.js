export class Page {
  /** @type {string} */
  urlPath

  /** @type {boolean} */
  isFinal = false

  /** @param {unknown} answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(answer) {
    throw new Error('Not implemented')
  }
}
