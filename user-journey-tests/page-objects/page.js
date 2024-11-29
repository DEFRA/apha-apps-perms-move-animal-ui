import { browser, $ } from '@wdio/globals'
import * as page from '../helpers/page.js'

class Page {
  get pagePath() {
    throw new Error('Page path not provided')
  }

  get pageHeading() {
    throw new Error('Page heading not provided')
  }

  get pageTitle() {
    throw new Error('Page title not provided')
  }

  getPageHeading() {
    return $('h1')
  }

  getFeedbackLink() {
    return $('[data-testid="feedback-link"]')
  }

  getPrivateBetaBanner() {
    return $('.govuk-phase-banner__content__tag')
  }

  getBackLink() {
    return $('.govuk-back-link')
  }

  getContinueButton() {
    return $('#continue-button')
  }

  getErrorSummary() {
    return $('.govuk-error-summary')
  }

  getPageTitle() {
    return browser.getTitle()
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
    await page.validateElementVisibleAndText(this.getFeedbackLink(), text)
  }

  async verifyPrivateBetaBanner(
    feedbackText = 'feedback',
    bannerText = 'Private beta'
  ) {
    // await page.validateElementVisibleAndText(this.feedbackLink, feedbackText)
    await page.validateElementVisibleAndText(
      this.getPrivateBetaBanner(),
      bannerText
    )
  }

  async verifyPageHeadingAndTitle() {
    await page.validateElementVisibleAndText(
      this.getPageHeading(),
      this.pageHeading
    )
    await page.verifyPageTitle(this.pageTitle)
  }

  async selectBackLink() {
    await page.selectElement(this.getBackLink())
  }

  async selectContinue() {
    await page.selectElement(this.getContinueButton())
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
    await page.validateElementVisibleAndText(
      this.getErrorSummary(),
      errorMessage
    )
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
