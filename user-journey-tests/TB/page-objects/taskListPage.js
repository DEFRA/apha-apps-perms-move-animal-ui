import { $ } from '@wdio/globals'

import { Page } from './page.js'
import * as page from '../helpers/page.js'
import { secureDeviceArray } from '../helpers/constants.js'

const pageHeadingAndTitle =
  'Your Bovine Tuberculosis (TB) movement licence application'

class TaskListPage extends Page {
  pagePath = 'task-list'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get movementOriginLink() {
    return $('aria/Movement origin')
  }

  get receivingTheLicenceLink() {
    return $('aria/Receiving the licence')
  }

  get movementDestinationLink() {
    return $('aria/Movement destination')
  }

  get animalIdentifiersLink() {
    return $('aria/Animal identification')
  }

  get biosecurityLink() {
    return $('aria/Biosecurity details')
  }

  get biosecurityMapLink() {
    return $('aria/Biosecurity map')
  }

  get reviewLink() {
    return $('aria/Review and submit')
  }

  async getTaskToCompleteCount() {
    const element = await $('[data="test-id-task-to-complete-count"]')
    return element.getText()
  }

  async selectMovementOrigin(nextPage) {
    await page.selectElement(this.movementOriginLink)
    await page.waitForPagePath(nextPage.pagePath)
  }

  async selectReceiveTheLicence(nextPage) {
    await page.selectElement(this.receivingTheLicenceLink)
    await page.waitForPagePath(nextPage.pagePath)
  }

  async selectMovementDestination(nextPage) {
    await page.selectElement(this.movementDestinationLink)
    await page.waitForPagePath(nextPage.pagePath)
  }

  async selectAnimalIdentificationLink(nextPage) {
    await page.selectElement(this.animalIdentifiersLink)
    await page.waitForPagePath(nextPage.pagePath)
  }

  async selectBiosecurityLink(nextPage) {
    await page.selectElement(this.biosecurityLink)
    await page.waitForPagePath(nextPage.pagePath)
  }

  async selectBiosecurityMapLink(nextPage) {
    await page.selectElement(this.biosecurityMapLink)
    await page.waitForPagePath(nextPage.pagePath)
  }

  async verifyStatus({ position, taskTitle, expectedStatus }) {
    const task = (await $$('.govuk-task-list__item'))[position - 1]
    const status = await task.$(`#task-list-${position}-status`)

    expect(await task.getText()).toContain(taskTitle)
    expect(await status.getText()).toContain(expectedStatus)
  }

  async verifyAllStatus(statusArray) {
    for (const { position, taskTitle, expectedStatus } of statusArray) {
      await this.verifyStatus({ position, taskTitle, expectedStatus })
    }
  }

  async selectReview() {
    await page.selectElement(this.reviewLink)
    if (secureDeviceArray.includes(browser.capabilities?.deviceName)) {
      await page.checkForSecurityPopUpAndResolve()
    }
  }
}

export default new TaskListPage()
