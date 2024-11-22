import { browser, $ } from '@wdio/globals'

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

  // Reusable wait function
  async waitForElement(element, options = { timeout: 10000, visible: true }) {
    await element.waitForExist({ timeout: options.timeout })
    if (options.visible) {
      await element.waitForDisplayed({ timeout: options.timeout })
    }
  }

  async validateElementVisibleAndText(element, text) {
    try {
      await this.waitForElement(element, { visible: true })
      await expect(element).toHaveTextContaining(text)
    } catch (error) {
      throw new Error(
        `Failed to validate text for element - ${await element.selector}: ${error}`
      )
    }
  }

  async selectElement(element, hidden = false) {
    try {
      await this.waitForElement(element, { visible: !hidden })
      await element.click()
    } catch (error) {
      throw new Error(
        `Failed to click element - ${await element.selector}: ${error}`
      )
    }
  }

  async typeIntoElement(element, text) {
    try {
      await this.waitForElement(element)
      await element.setValue(text)
    } catch (error) {
      throw new Error(
        `Failed type command on element - ${await element.selector}: ${error}`
      )
    }
  }

  async verifyFeedbackLink(text) {
    await this.validateElementVisibleAndText(this.feedbackLink, text)
  }

  async verifyPrivateBetaBanner(bannerText = 'Private beta') {
    // await this.validateElementVisibleAndText(this.feedbackLink, feedbackText)
    await this.validateElementVisibleAndText(this.privateBetaBanner, bannerText)
  }

  async verifyPageHeading(headingText) {
    await this.validateElementVisibleAndText(this.pageHeading, headingText)
  }

  async selectBackLink() {
    await this.selectElement(this.backLink)
  }

  async selectContinue() {
    await this.selectElement(this.continueButton)
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
    await this.validateElementVisibleAndText(element, errorMessage)
    await this.validateElementVisibleAndText(this.errorSummary, errorMessage)
    expect(await browser.getTitle()).toMatch(/^Error:/)
  }

  async verifySummaryErrorLink(linkElement, fieldElement) {
    await this.selectElement(linkElement)
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
