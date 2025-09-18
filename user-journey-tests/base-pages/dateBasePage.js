/* eslint-disable lines-between-class-members */
import { Page } from '../TB/page-objects/page.js'
import * as page from '../TB/helpers/page.js'

class DateBasePage extends Page {
  constructor({ pageId = 'date', errors = {} }) {
    super()
    this.pageId = pageId

    const defaultErrors = {
      noInputError: 'Enter a date',
      noDayError: 'must include a day',
      noMonthError: 'must include a month',
      noYearError: 'must include a year'
    }

    Object.assign(this, { ...defaultErrors, ...errors })
  }

  getDayInput() {
    return super.getInputField(`${this.pageId}-day`)
  }
  getMonthInput() {
    return super.getInputField(`${this.pageId}-month`)
  }
  getYearInput() {
    return super.getInputField(`${this.pageId}-year`)
  }

  inputFieldError() {
    return super.getErrorElement(this.pageId)
  }
  errorLink(id) {
    return super.getErrorLink(id)
  }

  async #typeIfPresent(el, value) {
    if (value !== undefined && value !== null && `${value}` !== '') {
      await page.typeIntoElement(el, `${value}`)
    }
  }

  async enterDateAndContinue(
    { day = '', month = '', year = '' } = {},
    nextPage
  ) {
    await this.#typeIfPresent(this.getDayInput(), day)
    await this.#typeIfPresent(this.getMonthInput(), month)
    await this.#typeIfPresent(this.getYearInput(), year)
    await super.selectContinue()
    if (nextPage && nextPage.pagePath) {
      await page.waitForPagePath(nextPage.pagePath)
    }
  }

  async dateErrorTest(parts = {}, errorSubstring, focus = 'day') {
    await this.enterDateAndContinue(parts)

    const text = await this.inputFieldError().getText()
    await expect(text).toContain(errorSubstring)

    const focusInput =
      focus === 'month'
        ? this.getMonthInput()
        : focus === 'year'
          ? this.getYearInput()
          : this.getDayInput()

    await super.verifySummaryErrorLink(
      this.errorLink(`${this.pageId}-${focus}`),
      focusInput
    )
  }
}

export { DateBasePage }
