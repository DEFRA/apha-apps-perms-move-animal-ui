import { browser, $ } from '@wdio/globals'
import * as page from '../helpers/page.js'

class Page {
  get pageHeading() {
    return $('h1')
  }

  get feedbackLink() {
    return $('[data-testid="feedback-link"]')
  }

  get privateBetaBanner() {
    return $('.govuk-phase-banner__content__tag')
  }

  get backLink() {
    return $('.govuk-back-link')
  }

  get continueButton() {
    return $('#continue-button')
  }

  get errorSummary() {
    return $('.govuk-error-summary')
  }

  async getPageTitle() {
    return await browser.getTitle()
  }

  getInputField(id) {
    return $(`#${id}`)
  }

  // Function to generate error element selectors
  getErrorElement(id) {
    return $(`#${id}-error`)
  }

  // Function to generate error link selectors
  getErrorLink(id) {
    return $(`[href="#${id}"]`)
  }

  async verifyFeedbackLink(text) {
    await page.validateElementVisibleAndText(this.feedbackLink, text)
  }

  async verifyPrivateBetaBanner(
    feedbackText = 'feedback',
    bannerText = 'Private beta'
  ) {
    // await page.validateElementVisibleAndText(this.feedbackLink, feedbackText)
    await page.validateElementVisibleAndText(this.privateBetaBanner, bannerText)
  }

  async verifyPageHeading(headingText) {
    await page.validateElementVisibleAndText(this.pageHeading, headingText)
  }

  async selectBackLink() {
    await page.selectElement(this.backLink)
  }

  async selectContinue() {
    await page.selectElement(this.continueButton)
  }

  async verifyRadioIsSelected(element) {
    try {
      await expect(element).toBeSelected()
    } catch (error) {
      throw new Error(
        `Failed to verify radio button selection for element - ${await element.selector}: ${error}`
      )
    }
  }

  async verifyErrorsOnPage(element, errorMessage) {
    await page.validateElementVisibleAndText(element, errorMessage)
    await page.validateElementVisibleAndText(this.errorSummary, errorMessage)
    await expect(await browser.getTitle()).toMatch(/^Error:/)
  }

  async verifySummaryErrorLink(linkElement, fieldElement) {
    await page.selectElement(linkElement)
    await fieldElement.isFocused()
  }

  async verifyErrorsNotVisible(errorElements = []) {
    const visibleErrors = []

    for (const errorElement of errorElements) {
      if (errorElement && (await errorElement.isDisplayed())) {
        visibleErrors.push(await errorElement.getText())
      }
    }

    if (visibleErrors.length > 0) {
      throw new Error(
        `The following errors are visible: ${visibleErrors.join(', ')}`
      )
    }
  }

  async open(path) {
    await browser.url(path)
  }
}

export { Page }
